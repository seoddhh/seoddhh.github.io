// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkDirective from 'remark-directive';
import remarkChatTurns from './src/lib/remark-chat-turns.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://seoddhh.github.io',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    // Astro 7 기본 처리기(Sätteri) 대신 remark 플러그인을 쓰기 위해 unified 사용
    processor: unified({
      remarkPlugins: [remarkDirective, remarkChatTurns],
    }),
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
