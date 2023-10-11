import { Component, OnInit } from '@angular/core';
import { FileExportService } from './fileUploadSubscriperService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _fileExportService: FileExportService | undefined;
  private http: HttpClient;
  public file: File = null;
  public validation: string = "";
  public files: Array<File> = null;
  public uploadedImageSrc:string = "";

  constructor(fileUploadService: FileExportService, http: HttpClient) {
    this._fileExportService = fileUploadService;
    this._fileExportService.fileUploaded.subscribe(this.onFileUploaded)
    this.http = http;
  }
  ngOnInit(): void {
  }

  title = 'APLFrontend';
  isLoading: boolean = false;

   onFileUploaded(fileToUpload: File): File {
    return fileToUpload;
  }
  async onSave() {
    this.validation = "";
    this.isLoading = true;
    this.file=this._fileExportService.file;

    // Check if a file is selected
    if (!this.file) {
      this.validation = 'No file selected for upload.';
      this.isLoading = false;
      return;
    }

    const img = new Image();

    let formData: FormData = new FormData();
    this.file = this._fileExportService.file;
    const url = URL.createObjectURL(this.file);
    img.src = url;
    img.onload = () => {
      const maxWidth = 1024;
      const maxHeight = 1024;

      if (img.width <= maxWidth && img.height <= maxHeight) {
        // Valid image
        formData.append('fileToUpload', this.file, this.file.name);

        this.http.post('https://localhost:7074/FileUpload', formData)
          .subscribe(
            (res: any) => {
              this.uploadedImageSrc = res.location;
              this.isLoading = false;
            },
            (error) => {
              this.validation = 'An error occurred while uploading the file.';
              this.isLoading = false;
            }
          );
      } else {
        // Invalid image
        this.validation = 'Image dimensions exceed the maximum allowed (1024x1024).';
        this.isLoading = false;
      }
    };
  }
}
