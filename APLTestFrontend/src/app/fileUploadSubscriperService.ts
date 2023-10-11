import { Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileExportService{
    @Output() fileUploaded = new EventEmitter<any>();
    public file:File=null;
    public upload(file:File){
        this.fileUploaded.emit(file)
        this.file=file;
    }
}