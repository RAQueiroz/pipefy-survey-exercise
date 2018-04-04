const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();
app.set("port", PORT);

/* Development options */
if (process.env.NODE_ENV === "development") {
  const webpackConfig = require("../webpack/config.dev");
  const webpackCompiler = require("webpack")(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      logLevel: "silent"
    })
  );

  app.use(require("webpack-hot-middleware")(webpackCompiler));
}

/* Routings */
app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "src/index.html"))
);

console.log(path.join(__dirname, "..", "dist"));

/* Running */
app.listen(app.get("port"), () => {
  console.log(`Running at http://localhost:${app.get("port")}`);
});
