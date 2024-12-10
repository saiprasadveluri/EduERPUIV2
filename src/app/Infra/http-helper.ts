import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import {EMPTY, Observable, throwError} from 'rxjs';
import { catchError, retry,map } from "rxjs/operators";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class HttpHelper {
    baseAddress:string;
    constructor(private http:HttpClient)
    {
        //this.baseAddress="https://VSBApi3.bluegreenvsb.in/api/";
        this.baseAddress="https://localhost:7035/API/"
    }

    HttpGet<T>(ctrlName:string,prms?:HttpParams,hdrs?:HttpHeaders):Observable<T>{
         return this.http.get<T>(this.baseAddress+ctrlName,{
            headers:hdrs,
            params:prms,          
        }).pipe(catchError((err) => {
             console.log('from catch error');
             return this.handleError(err);
             }));
        
    }

    HttpPost<T>(ctrlName:string,body:any,hdrs?:HttpHeaders):Observable<any>{
       
        return this.http.post<T>(this.baseAddress+ctrlName,
            body,
            {
            headers:hdrs,                   
            }
        );
    }

    HttpPut<T>(ctrlName:string,body:any,hdrs?:HttpHeaders):Observable<T>{
        
      return this.http.put<T>(this.baseAddress+ctrlName,
          body,
          {
          headers:hdrs,                   
          }
      );
  }

    HttpDelete(ctrlName:string,prms?:HttpParams,hdrs?:HttpHeaders):Observable<any>{
        
      return this.http.delete(`${this.baseAddress}${ctrlName}`,{
        headers:hdrs,
        params:prms,          
    });
          
  }

    HttpRequest<T>(formData:FormData,httpVerb:string,ctrlName:string,hdrs?:HttpHeaders):Observable<HttpEvent<any>>
    {
      const req = new HttpRequest(httpVerb, `${this.baseAddress}${ctrlName}`, formData, 
        {
        reportProgress: true,
        responseType: 'json',
        headers:hdrs
        });
        return this.http.request(req);
    }

  handleError<T>(err:any) {
        let errorMessage = '';
        console.log(err);
        if (err.error instanceof ErrorEvent) {
          // if error is client-side error
          errorMessage = `Clinet Error: ${err.message}`;
          return throwError(()=>new Error(errorMessage));
        } 
        else {
          // if error is server-side error
          //if(err.status!=200)
          {
            errorMessage = `Server Error Code: ${err.status}\nMessage: ${err.message}`;
            return throwError(()=>new Error(errorMessage));
          }                   
        }        
        
      }

      

}
