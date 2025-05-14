import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: prettierPlugin
        }
    },
    {
        ignores: ['node_modules', 'dist', 'eslint.config.js', 'coverage'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2020
            },
            parserOptions: {
                project: ['tsconfig.json'],
                projectService: true,
            }
        }
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            ...prettierPlugin.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            'prefer-const': 'error',
            'semi': ['error', 'never'],
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
        },
    }
) 