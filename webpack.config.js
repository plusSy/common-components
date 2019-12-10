const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const path = require('path');

const config = {
  mode: 'production',
  entry: {
    main: './components/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs/_media/')
  },
  resolve: {
    extensions: ['.js', '.vue','.json'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: ['>1%', 'last 2 versions']
                  },
                  corejs: '3',
                  useBuiltIns: 'entry'
                }
              ]
            ],
            plugins:['transform-vue-jsx']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: ExtractCssChunks.loader,
          //   options: {
          //     hot: true,
          //     reloadAll: true
          //   }
          // },
          {
            loader: 'css-loader',
            options: {
              url: true,
              modules: false
            }
          }
        ]
        // loader: ExtractCssChunks.loader,
      },
      {
        test: /\.scss$/,
        use: [
          // ExtractCssChunks.loader,
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          } // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      }
    ]
  },
  externals: {
    'vue-router': 'VueRouter',
    'vue': 'Vue',
    'element-ui': 'element-ui'
  },
  plugins: [
    new ExtractCssChunks({
      filename: '[name].css',
      orderWarning: false // Disable to remove warnings about conflicting order between imports
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    }),
    new VueLoaderPlugin(),
    new SpriteLoaderPlugin()
  ]
}

module.exports = config
