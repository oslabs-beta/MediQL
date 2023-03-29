const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  target: 'web',
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    hot: true,
    liveReload: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

// const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: 'development',
//   devtool: 'inline-source-map',
//   entry: './index.js',
//   //allows 'import dashboard from ./dashboard' instead of 'import dashboard from ./dashboard.jsx, etc.'
//   resolve: {
//     extensions: [
//       '.js',
//       '.jsx',
//       '.png',
//       '.jpg',
//       '.jpeg',
//       '.gif',
//       '.css',
//       '.scss',
//     ],
//   },
//   output: {
//     path: path.join(__dirname, '/dist'),
//     filename: 'bundle.js',
//   },
//   plugins: [
//     new HTMLWebpackPlugin({
//       template: './index.html',
//       filename: 'webpack.html',
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/i,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//           },
//         },
//       },
//       {
//         test: /\.s?css/,
//         use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
//       },
//       {
//         test: /\.(jpg|png)$/,
//         use: {
//           loader: 'url-loader',
//         },
//       },
//     ],
//   },

//   devServer: {
//     port: 8050,
//     hot: true,
//     host: 'localhost',
//     historyApiFallback: true,
//     proxy: {
//       // /** is any characters after the intial root route
//       '/**': {
//         target: 'http://localhost:3000',
//         secure: false,
//         // changeOrigin: true
//       },
//       // '/users': {
//       //   target: 'http://localhost:3005',
//       // },
//     },
//   },
// };
