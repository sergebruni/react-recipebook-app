const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    resolve(__dirname, 'src', 'app.js'),
  ],
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?sourceMap'
        ]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html')
    })
  ]
}