import { getEnv } from "../library/getEnv";
import { vueComponents } from "./vue";

interface VueApp {
  id: string;
  name: keyof typeof vueComponents;
  props?: Record<string, any>;
}

export class Component {
  env = getEnv();
  vueApps: VueApp[] = [];

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

  vue(options: VueApp, rootTag = "div") {
    this.vueApps.push(options);
    return `<${rootTag} id="${options.id}"></${rootTag}>`;
  }

  async sendPage(initialState: Record<string, any>) {
    const body = await this.render(initialState);

    const vueDevScripts = () => /*html*/ `
      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/client/main.ts"></script>
    `;

    const vueProdScripts = async () => {
      //@ts-ignore
      const manifest = await import("../../dist/manifest.json");

      const preload = (href: string) => `<link rel="modulepreload" href="${href}">`;

      if (manifest) {
        const mainFile = manifest?.["client/main.ts"] || {};
        const mainSrc = `/${mainFile.file}`;

        const preloads = [preload(mainSrc)];

        const imports = mainFile.imports?.map((name: string) => preload(`/${manifest[name]?.file}`) || "");
        preloads.push(...imports);

        const appPreloads = this.vueApps.map(({ name }) => {
          const path = vueComponents[name];
          if (path) {
            const key = `client/components/${path}`;
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

      return `<script>console.error("MISSING MANIFEST")</script>`;
    };

    const vueScripts = async () => /*html*/ `
      <script>
        window.SS_VUE_APPS = ${JSON.stringify(this.vueApps)}
      </script>
      ${this.env.IS_DEV ? vueDevScripts() : await vueProdScripts()}
    `;

    return /*html*/ `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>Render</title>
          ${this.vueApps.length > 0 ? await vueScripts() : ""}
        </head>
        <body>
          ${this.vueApps.length > 0 ? '<div id="vue-main"></div>' : ""}
          ${body}
        </body>
      </html>
    `;
  }
}
