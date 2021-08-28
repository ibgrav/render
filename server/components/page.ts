import { Component } from "./Component";

export class Page extends Component {
  render(state: Record<string, any>) {
    return this.html`
      <h2>This is SSR html. Change 2</h2>
      <span class="alpha">This is alpha</span>
      <pre>${JSON.stringify(state, null, 2)}</pre>
      ${this.script({ name: "observer", args: ["this is my message from page"] })}
      ${this.vue({ name: "video", props: { message: "this is my message" } })}
    `;
  }
}
