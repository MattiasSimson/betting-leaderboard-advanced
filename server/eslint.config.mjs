import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ['src/**/*.{js,mjs,cjs,ts}']},
    {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    { rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-trailing-spaces': 'error'
    }}
];