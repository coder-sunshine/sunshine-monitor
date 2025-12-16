import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import importSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

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

export default defineConfig([
  // 忽略文件
  { ignores: ['**/node_modules/**', '**/dist/**'] },
  // js 推荐配置
  js.configs.recommended,
  // ts 推荐配置
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,mts}'],
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
    },
  },
])
