import { inject, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SelectCourseDetailDialogComponent } from '../Dialogs/select-course-detail-dialog/select-course-detail-dialog.component';
import { SelectStudentsDialogComponent } from '../Dialogs/select-students-dialog/select-students-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ShowDialogService {
  private matSnackBarRef=Inject(MatSnackBarRef<ShowDialogService>);
  private _snackBar:MatSnackBar = inject(MatSnackBar);
  dialogConfig:MatDialogConfig|undefined;
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) private data: any) {
    
   }
  ShowSnackAutoClose(msg:string,duration:number)
  {
    this._snackBar.open(msg,undefined,{duration:duration,verticalPosition: 'top',
      horizontalPosition: 'right',});
  }
  ShowSnackWithDismissal(msg:string)
  {
    console.log('About to show Snack');
   this.matSnackBarRef= this._snackBar.open(msg,void 0,{verticalPosition:'top',
    horizontalPosition: 'right'});
  }
  DismissSnack()
  {
    if(this.matSnackBarRef!=null)
    {
      this.matSnackBarRef.dismiss();
      this.matSnackBarRef=null;
    }
  }

  ShowSelectCourseDialog(callbackFn:any)
  {
    let ShowSelectCourseDialogRef = this.dialog.open(SelectCourseDetailDialogComponent, {
      width: '1250px'      
    });
    ShowSelectCourseDialogRef.afterClosed().subscribe((result:any) => {
      callbackFn(result);
    });
  }

  ShowSelectStudentsDialog(acdYearId:string,showMode:number,callbackFn:any)
  {
    let ShowSelectCourseDialogRef = this.dialog.open(SelectStudentsDialogComponent, {
      width: '1250px',
      data:{selAcdYearId:acdYearId,ShowMode:showMode}      
    });
    ShowSelectCourseDialogRef.afterClosed().subscribe((result:any) => {
      callbackFn(result);
    });
  }
  /*ShowDeleteConfirmDialog(message:string,callBackfn:any)
  {
    var res:boolean=false;
   let deleteConfirmDialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '350px',
      data: { displayMessage: message}
    });
    deleteConfirmDialogRef.afterClosed().subscribe((result:any) => {
    if(result==true)
        callBackfn();
    });
  }

  ShowViewPostDialog(identifier:string)
  { 
   let deleteConfirmDialogRef = this.dialog.open(AdminViewPostDialogComponent, {
      width: '1250px',
      data: { id: identifier}
    });
    deleteConfirmDialogRef.afterClosed().subscribe((result:any) => {
    
    });
  }

  ShowPostCommentDialog(callBackfn:any)
  {
    let postCommentDialogRef = this.dialog.open(AddPostCommentDialogComponent, {
      width: '1250px'
    });
    postCommentDialogRef.afterClosed().subscribe((result: any) => {
      callBackfn(result);
    });
  }

  ShowViewCertificateDialog(identifier:string)
  { 
    this.dialogConfig=new MatDialogConfig();
    // Configure the dialog options
    this.dialogConfig.disableClose = false; // Prevents closing the dialog by clicking outside
    this.dialogConfig.autoFocus = false;   // Disable autofocus to manually control focus
    this.dialogConfig.width = '80vw';
    this.dialogConfig.maxWidth='80vw';    
    this.dialogConfig.maxHeight='70vw';
    this.dialogConfig.data={ id: identifier}       // Set the width of the dialog
   let deleteConfirmDialogRef = this.dialog.open(ViewCertDetailsDialogComponentComponent, this.dialogConfig);
    
    deleteConfirmDialogRef.afterClosed().subscribe((result: any) => {
    
    });
  }*/
}
