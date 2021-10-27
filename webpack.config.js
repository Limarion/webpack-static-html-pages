const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')

const isProduction = process.env.NODE_ENV === 'production'

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader'

const config = {
  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    main: './src/js/main.js',
    index: './src/page-index/main.js',
    about: './src/page-about/main.js',
    contacts: './src/page-contacts/main.js'
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        // https://webpack.js.org/loaders/babel-loader/#root
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader']
      },
      {
        // https://webpack.js.org/guides/asset-modules/#resource-assets
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        // https://webpack.js.org/loaders/html-loader/#usage
        resourceQuery: /template/,
        loader: 'html-loader'
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page-index/tmpl.html',
      inject: true,
      chunks: ['main', 'index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-about/tmpl.html',
      inject: true,
      chunks: ['main', 'about'],
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-contacts/tmpl.html',
      inject: true,
      chunks: ['main', 'contacts'],
      filename: 'contacts.html'
    })
  ]
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
    config.devtool = 'source-map'
    // how to write the compiled files to disk
    // https://webpack.js.org/concepts/output/
    config.output = {
      filename: '[name].[contenthash].js',
      path: buildPath,
      clean: true
    }
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css'
      })
    )
    // https://webpack.js.org/configuration/optimization/
    config.optimization = {
      minimize: true,
      minimizer: [
        // https://webpack.js.org/plugins/terser-webpack-plugin/
        new TerserPlugin({
          parallel: true
        }),
        // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
        new CssMinimizerPlugin()
      ]
    }
  } else {
    config.mode = 'development'
    config.devtool = 'eval-cheap-module-source-map'
    // https://webpack.js.org/configuration/dev-server/
    config.devServer = {
      port: 8080,
      writeToDisk: false, // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
      host: 'localhost'
    }
  }
  return config
}
