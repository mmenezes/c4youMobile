const PRODUCTION = process.env.NODE_ENV === 'production';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDirectory = 'dist';
const documentRoot = '';

const plugins = [
  new CleanWebpackPlugin([outputDirectory]),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico'
  })
];

if (PRODUCTION) {
  const CompressionPlugin = require('compression-webpack-plugin');
  plugins.push.apply(plugins,
    [
      new CopyWebpackPlugin([
        { from: './src/pwa/' },
      ]),
      new UglifyJsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  );
} else {
  plugins.push.apply(plugins,
    [
      new CopyWebpackPlugin([
        { from: './src/pwa/' }
      ])
    ]
  );
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|__tests__|pwa)/,
        use: {
          loader: 'babel-loader',
          query: {
            'plugins': ['recharts']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|jpg|jpeg|png|mp4)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  devServer: {
    port: 3003,
    open: true,
    historyApiFallback: true,
    openPage: documentRoot
  },
  plugins: plugins
};
