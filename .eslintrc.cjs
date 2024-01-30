module.exports = {
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  ignorePatterns: ['**/_routes_tsoa.ts','.eslintrc.*', 'node_modules/', 'dist/', 'coverage/'],
  rules: {
    "@typescript-eslint/consistent-type-exports": 0,
    "@typescript-eslint/consistent-type-imports": [2,{
      "prefer": "no-type-imports"
    }],
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-unsafe-argument": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
  }
};
