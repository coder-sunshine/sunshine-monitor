export const loadConfig = () => {
  return {
    port: parseInt(process.env.PORT, 10),
    prefix: process.env.PREFIX,
  }
}
