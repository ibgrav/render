import { createServer } from "./server";

createServer().then(({ env, server }) => {
  server.listen(env.PORT, "0.0.0.0", () => {
    console.log(`http://localhost:${env.PORT}/`);
  });
});
