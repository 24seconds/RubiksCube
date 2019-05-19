const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project Demo',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: './src/index.html',
    }),
    new ExtractTextPlugin('./src/style.css'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      }, {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules)|(dist)/,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        }],
      }],
  },
  devServer: {
    port: 8000,
    inline: true,
    overlay: true,
  },
};
