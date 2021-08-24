import { getEnv } from "../library/getEnv";

interface VueApp {
  id: string;
  name: string;
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
      <script type="module" src="http://localhost:3000/client/main.js"></script>
    `;

    const vueProdScripts = async () => {
      //@ts-ignore
      const manifest = await import("../../dist/manifest.json");
      return /*html*/ `
        <script type="module" src="/${manifest?.["client/main.js"]?.file}"></script>
      `;
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
          ${body}
        </body>
      </html>
    `;
  }
}
