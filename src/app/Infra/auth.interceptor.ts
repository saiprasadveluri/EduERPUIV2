import { HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ShowDialogService } from './show-dialog.service';
import {errorModel} from './error-model';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var accessToken=localStorage.getItem("AccessToken");
  var authToken=localStorage.getItem("AuthToken");
  const dlgSrv = inject(ShowDialogService);
  if(accessToken!=undefined)
  {
    console.log('From Iterceptor....Before');
    dlgSrv.ShowSnackWithDismissal("In Progress...");
    var ClonedReq=req.clone({headers:new HttpHeaders().append("Authorization","Bearer "+accessToken)});
    return next(ClonedReq).pipe(tap({
      next:(evt)=>{
        if(evt instanceof HttpResponse)
        {
          console.log(evt);
          dlgSrv.ShowSnackAutoClose("Success In Operation",4000);
        }
      },
      error:(err)=>{
        if(err instanceof HttpErrorResponse)
        {
          if(err.status==0)
          {
            dlgSrv.ShowSnackAutoClose("Error In Connection..."+err.message,4000);
          }
          else if(err.error.Message!=undefined)
          {
            console.log('Server processing error');
            dlgSrv.ShowSnackAutoClose("Error In Operation..."+err.error.Message,4000);
          }
          else
            dlgSrv.ShowSnackAutoClose("Error In Operation..."+err.error.title,4000);
        }
      },
      complete:()=>{
        //dlgSrv.DismissSnack();
      }
    }));    
  }
  else if(authToken!=undefined)
  {
    var ClonedReq=req.clone({headers:new HttpHeaders().append("Authorization","Bearer "+authToken)});
    return next(ClonedReq);
  }
  else
    return next(req);
};
