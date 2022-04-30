import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from "../../login/services/auth.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.isUserLoggedIn()
      ? next.handle(request.clone({
        url: `${environment.API.url}${request.url}`,
        setHeaders: {
          accept: `application/json`,
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }))
      : next.handle(request.clone({
        url: `${environment.API.url}${request.url}`,
        setHeaders: {
          accept: `application/json`
        }
      }))
  }
}
