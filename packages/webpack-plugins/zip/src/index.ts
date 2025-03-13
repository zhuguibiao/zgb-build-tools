import path from 'path';
import JSZip from 'jszip';
import fs from 'fs';
import type { Compiler } from 'webpack';

const pluginName = 'WebpackDistZip';

interface WebpackDistZipOptions {
  entry?: string;
  output?: string;
}

const defaultOption: WebpackDistZipOptions = {
  entry: 'dist',
  output: `dist-${Date.now()}.zip`,
};

class WebpackDistZip {
  private entry: string;
  private zipName: string;

  constructor(options: WebpackDistZipOptions = {}) {
    const mergeOptions = { ...defaultOption, ...options };
    this.entry = mergeOptions.entry!;
    this.zipName = mergeOptions.output!;
  }

  private zipFile(zipFolder: JSZip, dirPath: string): void {
    const files = fs.readdirSync(dirPath);
    files.forEach((filename) => {
      const filePath = path.join(dirPath, filename);
      const fileStat = fs.statSync(filePath);
      
      if (fileStat.isDirectory()) {
        const subFolder = zipFolder.folder(filename);
        if (subFolder) this.zipFile(subFolder, filePath);
      } else {
        zipFolder.file(filename, fs.readFileSync(filePath));
      }
    });
  }

  apply(compiler: Compiler): void {
    compiler.hooks.done.tapAsync(pluginName, async (stats, callback) => {
      try {
        const zip = new JSZip();
        console.log(123123,this.entry,path)
        const outputPath = path.resolve(this.entry);
        console.log(424124,this.entry)

        const zipPath = path.join(outputPath, '..', this.zipName);

        if (!fs.existsSync(outputPath)) {
          console.warn(`⚠️  输出目录 ${this.entry} 不存在，跳过 ZIP 生成。`);
          callback();
          return;
        }

        this.zipFile(zip, outputPath);
        const content = await zip.generateAsync({
          type: 'nodebuffer',
          compression: 'DEFLATE',
          compressionOptions: { level: 9 },
        });

        fs.writeFileSync(zipPath, content);
        console.log(`✅ ZIP 生成成功: ${zipPath}`);
        callback();
      } catch (err) {
        console.error('❌ 生成 ZIP 失败:', err);
        callback(err as Error);
      }
    });
  }
}

export default WebpackDistZip;