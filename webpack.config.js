const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      "react/jsx-runtime": require.resolve("jsx-runtime"),
      assert: require.resolve("assert"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      // stream: false,
      http: require.resolve("stream-http"),
      // http: false,
      https: require.resolve("https-browserify"),
      // https: false,
      os: require.resolve("os-browserify/browser"),
      // os: false,
      buffer: require.resolve("buffer"),
      util: require.resolve("util"),
      console: require.resolve("console-browserify"),
      url: require.resolve("url"),
    },
  },
  //   externals: {
  //     react: { commonjs: "react" },
  //     "react-dom": { commonjs: "react-doms" },
  //   },
  devServer: {
    static: {
      directory: path.join(__dirname, "/dist"),
    },
    open: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "build", "index.html"),
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
