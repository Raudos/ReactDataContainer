
module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    library: 'react-data-container',
    libraryTarget: 'umd',
    path: __dirname + "/dist",
    filename: "index.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
