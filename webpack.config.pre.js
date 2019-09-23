var path = require('path');
var webpack = require('webpack');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
   const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
      index: "./src/index.jsx", //
      // library: ['react', 'react-dom', 'react-router'], //第三方库
  },
  output: {
      path: path.join(__dirname, 'public/dist'),
      filename: '[name].js',
  },
  externals: { // 外部文件引入：script替换import引入；文件中还是import引入
      // 'react':'react',
      // 'react-dom':"react-dom",
      // 'react-router':'react-router',
  },
  module: {
    loaders: [{
          test: /\.(js|jsx?)$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/,
      }, {
          test: /\.css$/,
          // loaders: ['style-loader', 'css-loader'],
          use:ExtractTextPlugin.extract({fallback:"style-loader",use:["css-loader"]}),
      },
      {
          test: /\.less$/,
          // loaders: ['style-loader', 'css-loader', 'less-loader'],
          use:ExtractTextPlugin.extract({fallback:"style-loader",use:["css-loader", "less-loader"]}),
      },
      {
          test: /\.(png|jpg|gif)$/,
          loaders: ['url?limit=8192&name=images/[name].[ext]'],
      }
    ]
  },
  resolve:{
      alias: {
          css: path.resolve(__dirname, 'public/dist/css/'),
          img: path.resolve(__dirname, 'public/dist/img/'),
      },
      extensions:['.css','.js','.jsx'] // 补全文件名
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({ // 入口中共同部分提取
    //     name: 'common2',
    //     chunks: ['index', 'library'], // 要提取的文件
    //     filename: '[name].js',
    // }),
    // new webpack.optimize.CommonsChunkPlugin({ // 入口中共同部分提取
    //     name: 'common',
    //     chunks: ['common2'], // 要提取的文件
    //     filename: '[name].js',
    // }),
    // new ExtractTextPlugin("index.css"), // 分离CSS和JS文件
    // new webpack.BannerPlugin('版权所有，翻版必究'),
    // new HtmlWebpackPlugin({
    //     template: __dirname + "/app/index.tmpl.html"
    // }),
    // new webpack.HotModuleReplacementPlugin()//热加载插件

    // 打包时候用
    // new webpack.optimize.OccurrenceOrderPlugin(), // 为组件分配ID
    // new webpack.optimize.UglifyJsPlugin(), // 压缩JS代码
      
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //       compress: {
    //         warnings: false
    //     }
    // }),
    // new webpack.DefinePlugin({
    //     'process.env': {
    //         'DEBUG': true,
    //         'NODE_ENV': JSON.stringify('production')
    //     }
    // }),
        
  ]
};
