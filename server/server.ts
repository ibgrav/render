import path from "path";
import fastify from "fastify";
import fastifyStatic from "fastify-static";
import { getEnv } from "./library/getEnv";
import { router } from "./router";

export async function createServer(env = getEnv()) {
  const server = fastify({ logger: true });

  if (!env.IS_DEV) {
    server.register(fastifyStatic, {
      root: path.join(process.cwd(), "dist/assets"),
      prefix: "/assets/",
    });
  }

  await server.register(router);

  return { env, server };
}
