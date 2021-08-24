import { getEnv } from "../library/getEnv";

interface ReactApp {
  id: string;
  name: string;
  props?: Record<string, any>;
}

export class Component {
  env = getEnv();
  reactApps: ReactApp[] = [];

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

  react(options: ReactApp, rootTag = "div") {
    this.reactApps.push(options);
    return `<${rootTag} id="${options.id}"></${rootTag}>`;
  }

  async sendPage(initialState: Record<string, any>) {
    const body = await this.render(initialState);

    const reactDevScripts = () => /*html*/ `
      <script type="module">
        import RefreshRuntime from 'http://localhost:3000/@react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      </script>
      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/client/main.jsx"></script>
    `;

    const reactProdScripts = async () => {
      //@ts-ignore
      const manifest = await import("../../dist/manifest.json");
      return /*html*/ `
        <script type="module" src="/${manifest?.["client/main.jsx"]?.file}"></script>
      `;
    };

    const reactScripts = async () => /*html*/ `
      <script>
        window.SS_REACT_APPS = ${JSON.stringify(this.reactApps)}
      </script>
      ${this.env.IS_DEV ? reactDevScripts() : await reactProdScripts()}
    `;

    return /*html*/ `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>Render</title>
          ${this.reactApps.length > 0 ? await reactScripts() : ""}
        </head>
        <body>
          ${body}
        </body>
      </html>
    `;
  }
}
