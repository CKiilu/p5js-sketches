const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    sketch: path.join(__dirname, "src/index.js")
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [{
      parser: {
        amd: false,
      }
    },{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: []
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      p5: path.resolve(__dirname, "src/libraries/p5.js")
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    hot: true,
    port: 8000,
    // open: true,
    openPage: ""
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}