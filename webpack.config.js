const path = require("path");

module.exports = {
  entry: "./src/index.js",
  target: ['web', 'es5'],
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
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
};
