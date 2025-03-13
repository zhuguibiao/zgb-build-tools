import path from 'path';
import JSZip from 'jszip';
import fs from 'fs';
import type { Plugin } from 'vite';

/**
 * Vite 插件：自动打包 dist
 * @param output - 输出目录（默认 dist）
 * @returns Vite 插件
 */
const viteZipPlugin = (output: string = 'dist'): Plugin => {
  return {
    name: 'vite-zip-plugin',
    apply: 'build',
    closeBundle() {
      const zipName: string = `dist-${Date.now()}.zip`;
      const zip: JSZip = new JSZip();
      const outputPath: string = path.resolve(output);
      const zipPath: string = path.join(outputPath, '..', zipName);

      function readDir(zipFolder: JSZip, dirPath: string): void {
        const files: string[] = fs.readdirSync(dirPath);
        files.forEach((filename: string) => {
          const filePath: string = path.join(dirPath, filename);
          const file: fs.Stats = fs.statSync(filePath);

          if (file.isDirectory()) {
            const subFolder: JSZip | null = zipFolder.folder(filename);
            if (subFolder) readDir(subFolder, filePath);
          } else {
            zipFolder.file(filename, fs.readFileSync(filePath));
          }
        });
      }

      function generateZip(): void {
        if (!fs.existsSync(outputPath)) {
          console.warn(`⚠️  输出目录 ${output} 不存在，跳过 ZIP 生成。`);
          return;
        }

        readDir(zip, outputPath);

        zip
          .generateAsync({
            type: 'nodebuffer',
            compression: 'DEFLATE',
            compressionOptions: { level: 9 },
          })
          .then((content: Buffer) => {
            fs.writeFileSync(zipPath, content);
            console.log(`✅ ZIP 生成成功: ${zipPath}`);
          })
          .catch((error: Error) => {
            console.error('❌ 生成 ZIP 失败:', error);
          });
      }

      generateZip();
    },
  };
};

export default viteZipPlugin;
