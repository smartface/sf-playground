import PgFileIODesign from 'generated/pages/pgFileIO';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import FileStream from '@smartface/native/io/filestream';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';

export default class PgFileIO extends withDismissAndBackButton(PgFileIODesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  createFile(path: string): void {
    let file: File = new File({ path });
    file.createFile(false)
  }

  writeFile(path: string, content: string): void {
    let file: File = new File({ path });
    let fileStream: FileStream = file.openStream(
        FileStream.StreamType.APPEND,
        FileStream.ContentMode.TEXT
    );
    fileStream.write(content);
    fileStream.close();
  }

  readFile(path: string): string {
    let file: File = new File({ path });
    let content = null;
    if (file.exists) {
        let fileStream: FileStream = file.openStream(
        FileStream.StreamType.READ,
        FileStream.ContentMode.TEXT
        );
        console.log('FileStream path test: ', fileStream.path);
        console.log('FileStream name test: ', fileStream.name);
        console.log('FileStream isWritable test: ', fileStream.isWritable);
        console.log('FileStream isReadable test: ', fileStream.isReadable);
        console.log('FileStream contentMode test: ', fileStream.contentMode);
        console.log('FileStream mode test: ', fileStream.mode);

        content = fileStream.readToEnd();
        fileStream.close();
    }
    return content;
  }

  createDirectory(path: string) {
    let file: File = new File({ path });
    file.createDirectory(false)
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
        absolutePath: fetchedFile.getAbsolutePath(),
    })
  }

  initPathTest() {
      console.log('Path Test ', {
          dataDirectory: Path.DataDirectory,
          assets: Path.AssetsUriScheme,
          separator: Path.Separator,
          images: Path.ImagesUriScheme,
          storages: Path.android.storages

      })
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    const filePath = Path.DataDirectory + "/test/io-test.txt";
    const directoryPath = Path.DataDirectory + "/test";

    let content: string = this.readFile(filePath);
    if (!content) {
      // First time creation
      this.createFile(filePath);
    } else {
      // File has already been created
      console.log(content);
    }
    this.writeFile(filePath, 'The text is for testing purposes\n');
    this.getFiles(directoryPath);
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    const directoryPath = Path.DataDirectory + "/test";
    this.createDirectory(directoryPath);
    this.initPathTest();
  }
}
