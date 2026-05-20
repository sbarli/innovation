module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@tamagui/babel-plugin', { components: ['tamagui'], config: './tamagui.config.ts' }],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@inno/constants': '../../packages/constants/src',
            '@inno/api-contracts': '../../packages/api-contracts/src',
            '@inno/ui': '../../packages/ui/src',
            '@inno/utils': '../../packages/utils/src',
          },
        },
      ],
    ],
  };
};
