import { FastifyInstance, RegisterOptions, DoneFuncWithErrOrRes } from "fastify";
import { Page } from "./components/page";

export function router(server: FastifyInstance, _opts: RegisterOptions, done: DoneFuncWithErrOrRes) {
  server.get("/*", async (req, reply) => {
    const page = new Page();

    reply.type("text/html");

    const initialState = { url: req.url, test: true };
    return await page.sendPage(initialState);
  });

  done();
}
