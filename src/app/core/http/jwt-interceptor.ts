import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '../authentication/credentials.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private credentialsService: CredentialsService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = this.credentialsService.credentials?.jwt;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    if (!request.headers.has('Content-Type') && !request.headers.has('File-Upload')) {
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    }

    if (request.headers.has('File-Upload')) {
      request = request.clone({headers: request.headers.delete('File-Upload')});
    }

    return next.handle(request);
  }
}
