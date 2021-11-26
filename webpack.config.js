const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "btrz-map.js",
    library: {
      name: "btrzMap",
      type: "umd"
    }
  },
  externals: {
    leaflet: {
      commonjs: "leaflet",
      commonjs2: "leaflet",
      amd: "leaflet",
      root: "L",
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
};
