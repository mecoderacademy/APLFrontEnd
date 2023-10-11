import { Component, OnInit } from '@angular/core';
import { FileExportService } from './fileUploadSubscriperService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void { }
  private _fileExportService: FileExportService | undefined;
  private http: HttpClient;
  public file: File = null;
  public validation: string = "";
  public files: Array<File> = null;
  constructor(fileUploadService: FileExportService, http: HttpClient) {
    this._fileExportService = fileUploadService
    this._fileExportService.fileUploaded.subscribe(this.onFileUploaded)
    this.http = http;
  }

  title = 'Bacs';
  isLoading: boolean = false;
  

 onFileUploaded(fileToUpload: File) :File{
   return fileToUpload;
  }

  async onSave() {
    this.validation="";
    this.isLoading = true;
    let formData: FormData = new FormData();
    this.file=this._fileExportService.file;
    formData.append('fileToUpload', this.file, this.file.name);
    
    setTimeout(() => {
     
      console.log(formData.get("fileToUpload"))
      this.http.post('http://localhost:5530/FileProccessor', formData)
  
        .subscribe(res => {
          this.validation = (res as any).responseMessage.toString();
          this.isLoading = false;
        })
    }, 500);
   
      
  
}}
