import { createServer } from "./createServer";

createServer().then(({ env, server }) => {
  server.listen(env.PORT, "0.0.0.0", () => {
    console.log(`http://localhost:${env.PORT}/`);
  });
});
