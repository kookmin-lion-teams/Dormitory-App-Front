const { getDefaultConfig } = require("@expo/metro-config");
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const path = require('path');

module.exports = ( () => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };
  config.resolver.assetExts.push("otf"); // 'otf' 확장자 추가

  return withStorybook(config, { // 두 개의 module.exports를 합침
    enabled: true,
    configPath: path.resolve(__dirname, './.storybook'),
  });
})();
