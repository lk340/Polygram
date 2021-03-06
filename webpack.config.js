const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// let plugins = []; // if using any plugins for both dev and production
// let devPlugins = []; // if using any plugins for development

// let prodPlugins = [
//   new webpack.DefinePlugin({
//     'process.env': {
//       'NODE_ENV': JSON.stringify('production')
//     }
//   }),
//   new webpack.optimize.UglifyJsPlugin.minimize({
//     compress: {
//       warnings: true
//     }
//   })
// ];

// plugins = plugins.concat(
//   process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
// );

module.exports = {
  context: __dirname,
  entry: "./frontend/polygram_entry.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", 'javascripts'),
    filename: "bundle.js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
              comments: false
          },
          minify: {},
          compress: {
              booleans: true,
              //...
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
