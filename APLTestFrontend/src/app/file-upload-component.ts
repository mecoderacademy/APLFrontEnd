import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FileExportService } from './fileUploadSubscriperService';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.html',
  styleUrls: ['./app.component.css']
})
export class FileUpload implements OnInit{
  ngOnInit(): void {
   
  }
  private _fileExportService:FileExportService | undefined;
  constructor(fileUploadService:FileExportService){
   this._fileExportService=fileUploadService
  }

  public file:File | undefined;
  uploadFile(file:Array<File>):void
  {
    if(file.length>0){
      this.file=file[0];
      if(this.file.type && (this.file.type=="image/jpeg" || this.file.type=="image/png")){
        this._fileExportService?.upload(this.file);
      }
    }
    
  }
}
