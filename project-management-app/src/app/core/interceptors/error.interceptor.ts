import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import {catchError, Observable, tap, throwError} from 'rxjs';
import { MessageService } from '../services/message.service';
import {Router} from "@angular/router";
import {AuthService} from "../../login/services/auth.service";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Interceptor2');
    return next.handle(request).pipe(
      tap(() => console.log('Inside Error interceptor')),
      catchError((error: HttpErrorResponse) => {
        console.log('errorMsg');

        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log('MyErrorMessage', errorMsg);

        switch (error.status) {
          case 401: {
            this.authService.logout().then(r => console.log('AFTER 401 handled', r));
          }
        }
        return throwError(() => new Error(errorMsg));
      }),
    );
  }
}
