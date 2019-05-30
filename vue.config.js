// vue.config.js
module.exports = {
  productionSourceMap: process.env.productionSourceMap === "true",

  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 8082,
    setup: function(app) {
      app.get("/account", function(req, res) {
        res.json({ username: "admin", password: "admin" });
      });
    },
    proxy: {
      "/imanager": {
        target: "http://192.168.169.35:8390",
        secure: false,
        localAddress: "0.0.0.0",
        changeOrigin: true
      }
    }
  },

  lintOnSave: undefined,
  transpileDependencies: []
};
