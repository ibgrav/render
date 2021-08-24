import { Component } from "./Component";

export class Page extends Component {
  render(state: Record<string, any>) {
    this.react({ id: "page-root", name: "simple" });

    return this.html`
      <div>Hi</div>
      <div id="page-root"></div>
      <pre>${JSON.stringify(state, null, 2)}</pre>
    `;
  }
}
