var webpack = require('webpack');

module.exports = {
    entry: [
      './src/index.js',
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react'],
            },
          },
        ],
      },
    resolve: {
        extensions: ['', '.js', '.jsx'],
      },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
      },
    devServer: {
        contentBase: './dist',
        hot: true,
      },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
  };
