import js from '@eslint/js'
import { ESLint } from 'eslint'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importSort from 'eslint-plugin-simple-import-sort'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// 获取 defineConfig 参数的类型
type Config = Parameters<typeof defineConfig>[0]

// 全局变量定义 (适配 React/JSX 环境)
const GlobalType = {
  ...globals.browser,
  ...globals.node,
  NodeJS: true,
  // React/JSX 特定的全局变量
  JSX: 'readonly',
  // Canvas API globals
  CanvasTextBaseline: 'readonly',
  CanvasRenderingContext2D: 'readonly',
  HTMLCanvasElement: 'readonly',
  // 自定义全局变量....
}

const ignores = ['**/node_modules/**', '**/dist/**', '**/build/**', 'demos/**', 'apps/backend/monitor-server/src/generated/**']

// 前端配置
const frontendConfig: Config = {
  files: ['apps/frontend/monitor/**/*.{ts,tsx,js,jsx,vue}'],
  ignores: ['apps/frontend/monitor/src/components/ui/**/*'],
  extends: [...eslintPluginVue.configs['flat/recommended']],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    globals: {
      ...globals.browser,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    parser: tseslint.parser,
  },
  plugins: {
    'react-hooks': reactHooks as unknown as ESLint.Plugin,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
  },
}

//后端配置
const backendConfig: Config = {
  files: ['apps/backend/**/*.{ts,js}'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
    parser: tseslint.parser,
  },
}

export default defineConfig([
  // 通用 js 和 ts 配置
  {
    ignores,
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      globals: GlobalType,
    },
    plugins: {
      import: importPlugin,
      'simple-import-sort': importSort,
      prettier: prettier,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prettier/prettier': 'error',
      // 确保所有导入都在文件顶部
      'import/first': 'error',
      // 确保导入语句之间有空行
      'import/newline-after-import': 'error',
      // 确保没有重复的导入
      'import/no-duplicates': 'error',
      '@typescript-eslint/no-explicit-any': 'off',

      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'prefer-const': 'error',
      'no-use-before-define': 'off',
      curly: ['error', 'all'],

      // 启用需要类型信息的 Promise 相关的规则
      // '@typescript-eslint/await-thenable': 'error',
    },
  },
  frontendConfig,
  backendConfig,
])
