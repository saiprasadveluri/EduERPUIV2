import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-pdf-document',
  templateUrl: './show-pdf-document.component.html',
  styleUrls: ['./show-pdf-document.component.css']
})
export class ShowPdfDocumentComponent {
QuestionPaperUrl:any;
constructor(public dialogRef: MatDialogRef<ShowPdfDocumentComponent>,private sanitizer: DomSanitizer)
{
 
   let str=sessionStorage.getItem('QPAPER');
   console.log(str)
   if(str!=null)
   this.QuestionPaperUrl= this.sanitizer.bypassSecurityTrustResourceUrl(str);
      
}
OnClose()
{
 this.dialogRef.close();
}
}
