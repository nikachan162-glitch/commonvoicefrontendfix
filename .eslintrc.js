module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@next/next/no-img-element': 'warn',
    'react/no-unescaped-entities': ['error', {
      forbid: ['>', '}', '"', '\'']
    }]
  }
};