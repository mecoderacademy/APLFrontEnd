
import { RouterTestingModule } from '@angular/router/testing';
import { FileUpload } from './file-upload-component';
import { FileExportService } from './fileUploadSubscriperService';


describe('AppComponent', () => {
  let fileUpload : FileUpload;
 let fileExportService:FileExportService
  beforeEach(async () => {
     fileExportService = new FileExportService();
    fileUpload = new FileUpload( fileExportService);
  });

  it(' fileUpload should create the app', () => {
    expect(fileUpload).not.toBeNull();
  });

  it('fileUpload.uploadFile upload null file', () => {
    fileUpload.uploadFile(new Array<File>());
    expect(fileUpload).not.toBeNull();
    expect(fileUpload?.file).toBeUndefined();
  });

  it('fileUpload.uploadFile upload not null file', () => {

    
    let type="text/csv";
    let fileName = "filename.jpg";
    let content = "Hello Zip";
    let data = new Blob([content], { type: type });
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let fileNameFromEmitter="";
    let arrayOfFile = new Array<File>();
    let file = new File(arrayOfBlob,fileName,{"type":type});
    arrayOfFile.push(file);

    fileExportService.fileUploaded.subscribe((file)=>{
      fileNameFromEmitter=file.name;
      console.log(fileNameFromEmitter);
    })

    fileUpload.uploadFile(arrayOfFile);

    expect(fileUpload).not.toBeNull();
    expect(fileUpload.file).not.toBeNull();
    expect(fileUpload.file?.name).toBe(fileName);
    expect(fileUpload.file?.type).toBe(type);
  });
})