import PgFileDesign from 'generated/pages/pgFile';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import FileStream from '@smartface/native/io/filestream';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';

const filePath = Path.DataDirectory + '/test/io-test.txt';
const copyFilePath = Path.DataDirectory + '/test/io-test-copy.txt';
const directoryPath = Path.DataDirectory + '/test';

export default class PgFile extends withDismissAndBackButton(PgFileDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnCreateFile.on('press', () => this.checkFileExistsIfNotCreate());
    this.btnWriteFile.on('press', () => this.writeFile());
    this.btnReadFile.on('press', () => this.readFile());
    this.btnGetFiles.on('press', () => this.getFiles(directoryPath));
    this.btnCopy.on('press', () => this.copyFile());
    this.btnMove.on('press', () => this.moveFile());
    this.btnDelete.on('press', () => this.deleteFile());
  }

  deleteFile(file: File = new File({ path: filePath })) {
    console.log('deleteFile', file.path);
    file.remove(true);
  }

  moveFile() {
    const file = new File({ path: filePath });
    file.move(copyFilePath);
    let fileStream: FileStream = file.openStream(FileStream.StreamType.READ, FileStream.ContentMode.TEXT);
    let content = null || fileStream.readToEnd();
    fileStream.close();
    console.info('moveFile', content);
    this.deleteFile(file);
  }

  copyFile() {
    const file = new File({ path: filePath });
    file.copy(copyFilePath);
    const copied = new File({ path: copyFilePath });
    let fileStream: FileStream = file.openStream(FileStream.StreamType.READ, FileStream.ContentMode.TEXT);
    let content = null || fileStream.readToEnd();
    fileStream.close();
    console.info('copyFile', content);
    this.deleteFile(copied);
  }

  checkFileExistsIfNotCreate() {
    let content: string = this.readFile();
    if (!content) {
      console.info('file not found, creating...');
      this.createFile(filePath);
    } else {
      console.log('file found', content);
    }
  }

  createFile(path: string): void {
    let file: File = new File({ path });
    file.createFile(false);
  }

  writeFile(): void {
    try {
      const content = 'The text is for testing purposes\n' + new Date();
      let file: File = new File({ path: filePath });
      let fileStream: FileStream = file.openStream(FileStream.StreamType.APPEND, FileStream.ContentMode.TEXT);
      fileStream.write(content);
      fileStream.close();
      console.info('file writed: ', content);
    } catch (error) {
      console.error(error.message, { stack: error.stack });
    }
  }

  readFile(): string {
    try {
      let file: File = new File({ path: filePath });
      let content = null;
      if (file.exists) {
        let fileStream: FileStream = file.openStream(FileStream.StreamType.READ, FileStream.ContentMode.TEXT);
        console.log('FileStream path test: ', fileStream.path);
        console.log('FileStream name test: ', fileStream.name);
        console.log('FileStream isWritable test: ', fileStream.isWritable);
        console.log('FileStream isReadable test: ', fileStream.isReadable);
        console.log('FileStream contentMode test: ', fileStream.contentMode);
        console.log('FileStream mode test: ', fileStream.mode);

        console.log('calling readToEnd');
        content = fileStream.readToEnd();
        console.log('calling close');
        fileStream.close();
      }
      this.lblFileContent.text = content;
      return content;
    } catch (error) {
      console.error(error.message, { stack: error.stack });
    }
  }

  createDirectory(path: string) {
    let file: File = new File({ path });
    file.createDirectory(false);
  }

  getFiles(path: string) {
    let file: File = new File({ path });
    const [fetchedFile] = file.getFiles();

    console.log('File Properties Test: ', {
      creationDate: fetchedFile.creationDate,
      exist: fetchedFile.exists,
      extension: fetchedFile.extension,
      isDirectory: fetchedFile.isDirectory,
      isFile: fetchedFile.isFile,
      modifiedDate: fetchedFile.modifiedDate,
      name: fetchedFile.name,
      path: fetchedFile.path,
      size: fetchedFile.size,
      writable: fetchedFile.writable,
      // resolvedPath: fetchedFile.resolvedPath, //These two variables should be private.
      // drawableResourceId: fetchedFile.drawableResourceId,
      fullPath: fetchedFile.fullPath,
      type: fetchedFile.type,
      absolutePath: fetchedFile.getAbsolutePath()
    });
  }

  initPathTest() {
    console.log('Path Test ', {
      dataDirectory: Path.DataDirectory,
      assets: Path.AssetsUriScheme,
      separator: Path.Separator,
      images: Path.ImagesUriScheme,
      storages: Path.android.storages
    });
    this.lblPathDetails.text = `
        dataDirectory: ${Path.DataDirectory}
        assets: ${Path.AssetsUriScheme}
        separator: ${Path.Separator}
        images: ${Path.ImagesUriScheme}
        storages: ${Path.android.storages}
    `;
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
    this.createDirectory(directoryPath);
    this.initPathTest();
  }
}
