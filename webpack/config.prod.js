const merge = require("webpack-merge");
const common = require("./config.common");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCss = new ExtractTextPlugin("bundle.css");

module.exports = merge(common, {
  mode: "production",
  entry: ["./src/index.js"],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCss.extract("css-loader")
      }
    ]
  },
  plugins: [extractCss]
});
