const CircularDependencyPlugin = require('circular-dependency-plugin')
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  target: ['web', 'es5'],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "btrz-map.js",
    globalObject: "this",
    library: {
      name: "btrzMap",
      type: "umd",
      umdNamedDefine: true
    },
    umdNamedDefine: true,
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
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // include specific files based on a RegExp
      include: /\.m?js$/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ]
};
