// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'next/core-web-vitals',
  ],
  ignorePatterns: [
    '.next/',
    '.eslintrc.js',
    '.eslintrc.cjs',
    'postcss.config.mjs',
    'postcss.config.js',
    'tailwind.config.js',
    'prisma.config.js',
    'next.config.mjs',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['import', 'import-newlines', 'prettier', '@typescript-eslint'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    camelcase: 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],
    'react/no-unescaped-entities': 'off',

    'object-curly-spacing': ['error', 'always'],

    // imports
    'import/no-duplicates': 'error',
    'import/no-useless-path-segments': 'error',
    'import/prefer-default-export': 'off',
    'import/no-anonymous-default-export': 'warn',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'error',
    'import/no-unused-modules': 'off',
    'import/no-deprecated': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      // ... TypeScript-specific rules ...
    },
    {
      files: ['postcss.config.mjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
  ],
};
