var ZipWebpackPlugin = require("../dist/index.cjs.js");
module.exports = {
  mode:'production',
  entry: "./index.js",
  output: {
    filename: "bundle.js",
  },
  plugins: [new ZipWebpackPlugin()],
};
