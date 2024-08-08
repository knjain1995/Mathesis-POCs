import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, of, throwError } from 'rxjs';
import { SpinnerLoaderService } from './spinner-loader.service';
import { Router } from '@angular/router';
import { SignUpService } from './sign-up.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})

// implement HttpInterceptor interface to intercept http calls
export class RequestRouteInterceptorService implements HttpInterceptor {

  constructor (
    public spinnerLoaderService: SpinnerLoaderService, // Inject Loader Service
    // private router: Router,
    private signUpService: SignUpService,
    private utilityService: UtilityService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerLoaderService.isLoading.next(true); // set isLoading of spinnerLoader to true
    
    // DEBUGGING (PLEASE DELETE)
    console.log(this.spinnerLoaderService.isLoading.getValue());
    console.log("spinner activated");

    // Add token in the header for further communication
    let jwt = localStorage.getItem("access_token"); 
    if(jwt) {
      console.log("setting token");
      console.log("Type: "+typeof(jwt.slice(1,-1)));
      
      let tokenHeader = "Bearer "+jwt.slice(1,-1);
      console.log("token header: "+tokenHeader);
                
      req = req.clone({
        setHeaders: {
          Authorization: tokenHeader 
        }
      });
      console.log("req: "+JSON.stringify(req));
    } 
    
    return next.handle(req).pipe( // handle the rest of the http call
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.signUpService.logout();
            console.log("401 Error: "+err.error);
            
            this.utilityService.showWarningMessage(err.error);
          }
        }
        return of();
      }),
      finalize( // after completing the call set isLoading to false irrespective of other issues or errors
        () => {
          this.spinnerLoaderService.isLoading.next(false);
          
          // DEBUGGING (PLEASE DELETE)
          console.log(this.spinnerLoaderService.isLoading.getValue())
          console.log("spinner deactivated");
        }
      )
    );
  }

}
