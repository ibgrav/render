import { Component } from "./Component";

export class Page extends Component {
  render(state: Record<string, any>) {
    return this.html`
      ${this.react({ id: "simple-one", name: "simple", props: { message: "hi 1" } })}
      <div>Hi</div>
      ${this.react({ id: "simple-two", name: "simple", props: { message: "hi 2" } })}
      <pre>${JSON.stringify(state, null, 2)}</pre>
      ${this.react({ id: "another-three", name: "another", props: { message: "hi another" } })}
    `;
  }
}
