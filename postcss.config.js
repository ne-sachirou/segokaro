module.exports = {
  plugins: [
    require("postcss-modules")({
      generateScopedName: "[path]___[name]__[local]___[hash:base64:5]"
    }),
    require("postcss-import")()
  ]
};
