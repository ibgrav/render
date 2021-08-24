interface ReactApp {
  id: string;
  name: string;
  state?: Record<string, any>;
}

export class Component {
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

  react(options: ReactApp) {
    this.reactApps.push(options);
  }

  async sendPage(initialState: Record<string, any>) {
    const body = await this.render(initialState);

    const reactScripts = () => /*html*/ `
      <script>
        window.SS_REACT_APPS = ${JSON.stringify(this.reactApps)}
      </script>
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

    return /*html*/ `
      <!DOCTYPE html>
      <html>
        <head>
          <title></title>
          ${this.reactApps.length > 0 ? reactScripts() : ""}
        </head>
        <body>
          ${body}
        </body>
      </html>
    `;
  }
}
