import { Component } from "./Component";

export class Page extends Component {
  render(state: Record<string, any>) {
    return this.html`
      <h2>This is SSR html. Change 2</h2>
      <pre>${JSON.stringify(state, null, 2)}</pre>
      ${this.vue({ id: "one", name: "one", props: { message: "hi 1" } })}
      ${this.vue({ id: "two", name: "two", props: { message: "hi 2" } })}
      ${this.vue({ id: "three", name: "three", props: { message: "hi another" } })}
    `;
  }
}
