export function getEnv() {
  return {
    IS_DEV: process.env.NODE_ENV === "development",
    PORT: process.env.PORT || 4040,
  };
}
