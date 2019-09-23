// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展
const webpack = require('atool-build/lib/webpack');

module.exports = function(webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);
  webpackConfig.entry = {
    index: './src/index.jsx',
  }
  // webpackConfig.externals = { // 外部文件引入：script替换import引入；文件中还是import引入
    // 'react':'react',
    // 'react-dom':"react-dom",
    // 'react-router':'react-router',
  // }
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
          'DEBUG': true,
          'NODE_ENV': JSON.stringify('production')
      }
    }),
  )
  // webpackConfig.plugins.push(
  //   new webpack.optimize.CommonsChunkPlugin({ // 入口中共同部分提取
  //     name: 'common2',
  //     chunks: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], // 要提取的文件
  //     filename: '[name].js',
  //   })
  // )
  // webpackConfig.plugins.push(
  //   new webpack.optimize.CommonsChunkPlugin({ // 入口中共同部分提取
  //     name: 'common3',
  //     chunks: ['common2', 'index'], // 要提取的文件
  //     filename: '[name].js',
  //   })
  // )
  // webpackConfig.plugins.push(
  //   new webpack.optimize.CommonsChunkPlugin({ // 入口中共同部分提取
  //     name: 'common',
  //     chunks: ['common2', 'c'], // 要提取的文件
  //     filename: '[name].js',
  //   })
  // )
  return webpackConfig;
};

