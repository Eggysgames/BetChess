// webpack.config.js

module.exports = {
  // Other webpack configuration options...

  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
    
  },

  module: {
    rules: [
      // Other module rules...
      {
        test: /\.wasm$/,
        type: "webassembly/async", // Specify module type for .wasm files
      },
    ],
  },
};
