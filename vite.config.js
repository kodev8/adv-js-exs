import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.js',
        coverage: {
            reporter: ['text', 'json', 'html'],
            reportsDirectory: 'coverage',
            provider: 'v8'
        },
        exclude: [...configDefaults.exclude, './src/App.jsx', './src/main.jsx', './src/icons.jsx']
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
});
