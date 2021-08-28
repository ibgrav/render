import { getEnv } from "../library/getEnv";
import { scriptComponents } from "./scripts";
import { vueComponents } from "./vue";

export class Component {
  env = getEnv();
  vueApps: HBS.VueApp[] = [];
  appScrips: HBS.AppScript[] = [];

  constructor() {
    return this;
  }

  async html(strings: TemplateStringsArray, ...args: any[]) {
    const result = strings.map((string, i) => {
      if (args[i]) return string + args[i];
      return string;
    });
    return result.join("");
  }

  render(..._args: any[]) {
    return this.html``;
  }

  script(options: HBS.AppScript) {
    this.appScrips.push(options);
  }

  vue(options: HBS.VueApp, rootTag = "div") {
    if (!options.id) options.id = `vue-${options.name}-${Math.floor(Math.random() * 100000) + 1}`;
    this.vueApps.push(options);
    return `<${rootTag} id="${options.id}"></${rootTag}>`;
  }

  async sendPage(initialState: Record<string, any>) {
    const body = await this.render(initialState);

    const viteDevScript = `<script type="module" src="http://localhost:3000/@vite/client"></script>`;
    const vueDevScripts = `<script type="module" src="http://localhost:3000/client/vue/main.ts"></script>`;
    const scriptsDevScript = `<script type="module" src="http://localhost:3000/client/scripts/main.ts"></script>`;

    const headScripts = async (): Promise<string> => {
      if (this.vueApps.length > 0 || this.appScrips.length > 0) {
        if (this.env.IS_DEV) {
          return viteDevScript + scriptsDevScript + vueDevScripts;
        }

        //@ts-ignore
        const manifest = (await import("../../dist/manifest.json")) as Record<string, any>;

        if (manifest) {
          const srsc: Set<string> = new Set();
          const appPreloads = preloadScripts(srsc, manifest, "client/scripts/", "main.ts", scriptComponents, this.appScrips);
          const vuePreloads = preloadScripts(srsc, manifest, "client/vue/", "main.ts", vueComponents, this.vueApps);

          return appPreloads + vuePreloads;
        }
      }
      return "";
    };

    const windowVueApps = `<script>window.__VUE_APPS__ = ${JSON.stringify(this.vueApps)}</script>`;
    const windowAppScripts = `<script>window.__APP_SCRIPTS__ = ${JSON.stringify(this.appScrips)}</script>`;

    return /*html*/ `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>Render</title>
          <link rel="stylesheet" href="${this.env.IS_DEV ? `http://localhost:3000` : ""}/assets/styles/critical.css">
          ${this.appScrips.length > 0 ? windowAppScripts : ""}
          ${this.vueApps.length > 0 ? windowVueApps : ""}
          ${await headScripts()}
        </head>
        <body>
          ${this.vueApps.length > 0 ? '<div id="vue-main"></div>' : ""}
          ${body}
        </body>
      </html>
    `;
  }
}

function preloadScripts(
  srcs: Set<string>,
  manifest: Record<string, any>,
  componentPath: string,
  entryFileName: string,
  components: Record<string, string>,
  props: HBS.AppScript[] | HBS.VueApp[]
) {
  const entry: { file: string; imports: string[] } = manifest?.[`${componentPath}${entryFileName}`];
  if (!entry) return `<script>console.error("MISSING MANIFEST")</script>`;

  const preload = (href: string) => {
    if (!srcs.has(href)) {
      srcs.add(href);
      return `<link rel="modulepreload" href="${href}">`;
    }
    return "";
  };

  const mainSrc = `/${entry.file}`;
  const preloads = [preload(mainSrc)];

  const imports = entry.imports?.map((name: string) => preload(`/${manifest[name]?.file}`));
  preloads.push(...imports);

  const appPreloads = props.map(({ name }) => {
    const path = components[name];
    if (path) {
      const key = `${componentPath}${path}`;
      const href = manifest?.[key]?.file;
      if (href) return preload(`/${href}`);
      return `<script>console.error("MISSING MANIFEST COMPONENT KEY ${key}")</script>`;
    }
    return `<script>console.error("MISSING VUE COMPONENT NAME ${name}")</script>`;
  });
  preloads.push(...appPreloads);

  return /*html*/ `
    ${preloads.join("\n")}
    <script type="module" src="${mainSrc}"></script>
  `;
}
