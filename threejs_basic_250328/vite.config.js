import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
 
export default defineConfig({
  // 1. プロジェクトのルートディレクトリ
  root: 'src',
  // 2. ベースURL
  base: '/subdir/',
  // 3. 画像などの静的コンテンツのフォルダ
  publicDir: "../public",
  // 4. プラグインの追加
  plugins: [
    react()
  ],
  // 5. モジュールパスのエイリアス
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 6. 開発サーバーの設定
  server: {
    port: 3002,
  },
  // 7. ビルド設定
  build: {
    // 8. ビルドファイルの出力先ディレクトリ
    outDir: 'build',
    rollupOptions: {
      // 9. ビルドファイルのエントリーポイント
      input: {
        index: 'src/index.html',
        main: 'src/main.js'
      }
    }
  },
});