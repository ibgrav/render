import fastify from "fastify";
import { getEnv } from "./library/getEnv";

export async function createServer(env = getEnv()) {
  const server = fastify({ logger: true });

  return { env, server };
}
