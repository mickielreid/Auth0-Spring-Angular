import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class StudentbackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("in the interceoptro")
    let newRequest = request;

    if(request.url == environment.backendUrl){
      // console.log("in the clone request ")
      newRequest = request.clone({
        headers : request.headers.append("Access-Control-Allow-Origin", "http://localhost:4200" )
                                  .append('Access-Control-Allow-Credentials', 'true')
                                  .append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      })
    }

    // look at the logs we stop at the interceptors seams the request is not being made
    // first thing to see if the token for the backend is fetched
  //  console.log( newRequest.headers.keys())
  //  console.log(newRequest.headers.get("Access-Control-Allow-Methods"))

    return next.handle(newRequest);
  }
}
