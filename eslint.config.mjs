import vue from 'eslint-plugin-vue'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  // 忽略列表 - 放在最前面以确保全局生效
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/.github/**',
      '**/docs/.vitepress/dist/**',
      '**/docs/.vitepress/cache/**',
      '**/packages/*/dist/**',
      // Nuxt 自动生成文件
      '**/playground-nuxt/.nuxt/**',
      '**/playground-nuxt/.output/**',
      'eslint_error.json',
      'eslint_full_error.txt',
      'eslint_unix_error.txt',
      'lint_output.txt',
      'lint_single.txt',
      'vitest_output.txt',
      '**/*.d.ts' // 忽略所有声明文件中的未使用变量，通常这些是自动生成的或外部定义的
    ]
  },

  // Vue 基础推荐配置
  ...vue.configs['flat/recommended'],

  // 纯 TypeScript / JavaScript 文件配置
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
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off', // 禁用基础规则
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off' // 允许空对象类型，减少干扰
    }
  },

  // Vue 单文件组件配置
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
      ...tsPlugin.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/attributes-order': 'off',
      'vue/no-unused-vars': 'error', // Vue 模板中的未使用变量视为错误
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off', // 禁用基础规则
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  },

  // 测试文件专用配置
  {
    files: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'vue/one-component-per-file': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-vars': 'off' // 测试文件中常有冗余定义，通常可接受
    }
  }
]
