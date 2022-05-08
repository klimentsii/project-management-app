import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {LoaderService} from "../services/loading.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.count === 0) {
      this.loaderService.setHttpProgressStatus(true);
    }
    this.count++;
    return next.handle(request).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.loaderService.setHttpProgressStatus(false);
        }
      }),
    );
  }
}
