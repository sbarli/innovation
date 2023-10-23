// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfig = require('./base');

module.exports = {
  ...defaultConfig,
  extends: ['turbo', 'next', 'prettier'],
  plugins: ['prettier'],
  rules: {
    ...defaultConfig.rules,
    'import/no-default-export': 'off',
  },
};
