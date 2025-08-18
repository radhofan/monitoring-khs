import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  {
    ignores: ['node_modules/**', '.next/**', 'src/generated/**'],
  },

  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended'
  ),

  {
    rules: {
      semi: ['error', 'always'],
      'no-unused-vars': 'warn',
      quotes: ['error', 'single'],
    },
  },
];

export default config;
