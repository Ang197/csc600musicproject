const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: { use: (arg0: string, arg1: any) => void; }) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
