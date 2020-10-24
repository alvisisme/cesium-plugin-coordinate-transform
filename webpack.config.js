const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cesium.plugin.coordinate.transform.min.js',
    library: 'CoorTrans',
    libraryTarget: 'window'
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  externals: {
    cesium: 'Cesium'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.devServer = {
      contentBase: './dist'
    }
    console.log('...development mode')
  }

  if (argv.mode === 'production') {
    //...
    console.log('...production mode')
  }
  return config;
};
