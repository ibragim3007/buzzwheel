import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            '**/node_modules',
            '**/react-native.config.js',
            '**/metro.config.js',
            '**/babel.config.js',
            'node_modules',
            'babel.config.js',
            'metro.config.js',
            'tsconfig.json',
            '.prettierrc.js',
        ],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
            'plugin:react/recommended',
            'prettier',
            'plugin:prettier/recommended',
            'plugin:react-hooks/recommended',
        ),
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            'react-hooks': fixupPluginRules(reactHooks),
            react: fixupPluginRules(react),
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 2020, // или "latest"
            sourceType: 'module',

            parserOptions: {
                project: './tsconfig.json', // можно и ["./tsconfig.json"]
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            'import/resolver': {
                typescript: {},

                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    paths: ['src'],
                },
            },

            react: {
                version: 'detect',
            },
        },

        rules: {
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-misused-promises': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            '@typescript-eslint/no-unsafe-enum-comparison': 'warn',

            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                },
            ],

            semi: 2,

            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                },
            ],

            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/member-delimiter-style': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/ban-ts-ignore': 'off',
            'react/jsx-key': 2,
            'react/display-name': 'off',
            'react/prop-types': 'off',
            'react/jsx-uses-vars': 'error',

            'react/self-closing-comp': [
                'error',
                {
                    component: true,
                    html: true,
                },
            ],
        },
    },
];
