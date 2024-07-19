import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { SpinnerLoaderService } from './spinner-loader.service';

@Injectable({
  providedIn: 'root'
})

// implement HttpInterceptor interface to intercept http calls
export class RequestRouteInterceptorService implements HttpInterceptor {

  constructor (
    public spinnerLoaderService: SpinnerLoaderService // Inject Loader Service
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerLoaderService.isLoading.next(true); // set isLoading of spinnerLoader to true
    
    // DEBUGGING (PLEASE DELETE)
    console.log(this.spinnerLoaderService.isLoading.getValue());
    console.log("spinner activated");
    
    return next.handle(req).pipe( // handle the rest of the http call
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
