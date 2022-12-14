const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(
      __dirname,
      'dist'
    ),
    filename: 'main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '北极星',
      template: './index.html',
    }),
  ],
  mode: 'development',
  // 开发服务器
  devServer: {
    static: './dist',
    host: 'localhost',
    port: '3000',
    open: true,
    hot: true,
  },
  devtool: 'cheap-module-source-map',
}