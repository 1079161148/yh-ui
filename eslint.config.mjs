import vue from 'eslint-plugin-vue'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import unusedImports from 'eslint-plugin-unused-imports'

const unusedVarsRule = [
  'warn',
  {
    vars: 'all',
    varsIgnorePattern: '^_',
    args: 'after-used',
    argsIgnorePattern: '^_'
  }
]

const commonTypeScriptRules = {
  ...tsPlugin.configs.recommended.rules,
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': unusedVarsRule,
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/no-empty-object-type': 'off'
}

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/.github/**',
      '**/.codex-temp/**',
      '**/docs/.vitepress/dist/**',
      '**/docs/.vitepress/cache/**',
      '**/docs/.vitepress/.temp/**',
      '**/docs/public/**',
      '**/packages/*/dist/**',
      '**/playground-nuxt/.nuxt/**',
      '**/playground-nuxt/.output/**',
      '**/playground-nuxt/--host/**',
      'eslint_error.json',
      'eslint_full_error.txt',
      'eslint_unix_error.txt',
      'lint_output.txt',
      'lint_single.txt',
      'vitest_output.txt',
      '**/*.d.ts'
    ]
  },

  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports
    },
    rules: commonTypeScriptRules
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports
    },
    rules: {
      ...commonTypeScriptRules,
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/attributes-order': 'off',
      'vue/no-unused-vars': 'error'
    }
  },

  {
    files: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'vue/one-component-per-file': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-vars': 'off'
    }
  }
]
