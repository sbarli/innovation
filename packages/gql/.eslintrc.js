module.exports = {
  root: true,
  extends: ["custom/base"],
  ignorePatterns: [
    './generated/**',
    './generated/*.ts*',
    './generated/graphql.tsx',
  ],
  rules: {
    'prettier/prettier': 0
  }
}