const path = require('path');


const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    publicPath: '/', 
    path: path.join(__dirname, 'build'),
    filename: 'index.[contenthash].js',
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html')}),
  ],
  devServer: {
    publicPath: '/', 
    contentBase: path.join(__dirname, 'src'),
    watchFiles: path.join(__dirname, 'src'),
    port: 3000,
  },
  module: {
    rules: [
      // babel loader
      {
        test: /\.(js|jsx)$/i,
        use: { 
          loader: 'babel-loader',
        options: {
        presets: [
          ['@babel/preset-react', { 
            runtime: 'automatic' }
          ]
            ],
            },
            },
        exclude: /(node_modules)/,
        resolve: { extensions: ['.js', '.jsx'] },
    },
    // scss to css loader
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
         test: /\.svg$/,
         type: 'asset/resource',
         generator: {
           filename: path.join('icons', '[name].[contenthash][ext]'),
         },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
   optimization: {
    minimize: true,
    emitOnErrors: true,
    concatenateModules: true,
    moduleIds: 'size',
    mergeDuplicateChunks: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
    },
      },
     minimizer: [
       new ImageMinimizerPlugin({
         minimizer: {
           implementation: ImageMinimizerPlugin.imageminMinify,
           options: {
             plugins: [
               ['gifsicle', { interlaced: true }],
               ['jpegtran', { progressive: true }],
               ['optipng', { optimizationLevel: 5 }],
               ['svgo', { name: 'preset-default' }],
             ],
           },
         },
       }),
     ],
   },
};
