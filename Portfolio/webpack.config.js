// webpack.config.js
module.exports = {
  // ... other configurations ...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
};
