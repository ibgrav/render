import fastify from "fastify";
import { getEnv } from "./library/getEnv";
import { router } from "./router";

export async function createServer(env = getEnv()) {
  const server = fastify({ logger: true });

  await server.register(router);

  return { env, server };
}
