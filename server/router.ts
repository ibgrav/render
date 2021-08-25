import { FastifyInstance } from "fastify";
import { Page } from "./components/page";

export async function router(server: FastifyInstance) {
  server.get("/*", async (req, reply) => {
    const page = new Page();

    reply.type("text/html");

    const initialState = { url: req.url, test: true };
    return await page.sendPage(initialState);
  });
}
