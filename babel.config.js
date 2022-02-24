module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json", ".svg", ".jpg"],
          alias: {
            "@": ["./src"],
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
