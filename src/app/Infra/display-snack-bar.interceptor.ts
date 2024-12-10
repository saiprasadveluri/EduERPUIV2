import { HttpErrorResponse, HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar'
import { Inject, inject, NgZone } from '@angular/core';
import { ShowDialogService } from './show-dialog.service';

export const displaySnackBarInterceptor: HttpInterceptorFn = (req, next) => {  
  console.log('from Inter')
  const dialogSrv=inject(ShowDialogService);
  dialogSrv.ShowSnackWithDismissal("Operation In Progress...");
 return next(req).pipe(map(res=>{
  if(res.type===HttpEventType.Response)
  {
  dialogSrv.DismissSnack();
  }
  return res;
 }
 ),
  catchError((error: HttpErrorResponse)=>{
    dialogSrv.ShowSnackAutoClose("Error In Operation..."+error.status,3000);
    return throwError(()=>error);
  }))
 };
 
