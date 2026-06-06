import js from '@eslint/js'
import boundaries from 'eslint-plugin-boundaries'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// FSD-lite layers, ordered low -> high. A layer may only depend on the ones
// below it (plus the infra layers api/store/types). Cross-slice access must go
// through a slice's public index — reaching into another slice's internals is
// forbidden via the `internalPath` selector.
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Architectural boundaries (FSD).
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      // Resolve the `@/*` alias so the plugin can classify aliased imports.
      'import/resolver': {
        typescript: { project: './tsconfig.app.json' },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app', mode: 'folder' },
        { type: 'widgets', pattern: 'src/widgets/*', mode: 'folder', capture: ['slice'] },
        { type: 'features', pattern: 'src/features/*', mode: 'folder', capture: ['slice'] },
        { type: 'entities', pattern: 'src/entities/*', mode: 'folder', capture: ['slice'] },
        // Infra / cross-cutting low-level layers.
        { type: 'store', pattern: 'src/store', mode: 'folder' },
        { type: 'api', pattern: 'src/api', mode: 'folder' },
        { type: 'shared', pattern: 'src/shared', mode: 'folder' },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            // --- Layer hierarchy: who may import whom ---
            { from: { type: 'app' }, allow: { to: { type: ['app', 'widgets', 'features', 'entities', 'store', 'api', 'shared'] } } },
            { from: { type: 'widgets' }, allow: { to: { type: ['widgets', 'features', 'entities', 'store', 'api', 'shared'] } } },
            { from: { type: 'features' }, allow: { to: { type: ['features', 'entities', 'store', 'api', 'shared'] } } },
            { from: { type: 'entities' }, allow: { to: { type: ['entities', 'store', 'api', 'shared'] } } },
            { from: { type: 'store' }, allow: { to: { type: ['store', 'entities', 'shared'] } } },
            { from: { type: 'api' }, allow: { to: { type: ['api', 'entities', 'shared'] } } },
            { from: { type: 'shared' }, allow: { to: { type: 'shared' } } },

            // --- Public API: a slice may only be entered through its index ---
            // Deny reaching into another slice's internals...
            {
              from: { type: ['app', 'widgets', 'features', 'entities'] },
              disallow: { to: { type: ['widgets', 'features', 'entities'], internalPath: '!index.{ts,tsx}' } },
              message: 'Import a slice through its public index, not its internals.',
            },
            // ...but a slice may freely import its own internal files.
            {
              from: { type: 'widgets', captured: { slice: '{{target.slice}}' } },
              allow: { to: { type: 'widgets' } },
            },
            {
              from: { type: 'features', captured: { slice: '{{target.slice}}' } },
              allow: { to: { type: 'features' } },
            },
            {
              from: { type: 'entities', captured: { slice: '{{target.slice}}' } },
              allow: { to: { type: 'entities' } },
            },
          ],
        },
      ],
    },
  },
])
