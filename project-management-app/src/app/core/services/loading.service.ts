import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private httpLoading$ = new ReplaySubject<boolean>(1);

  constructor() {}

  httpProgress(): Observable<boolean> {
    return this.httpLoading$.asObservable();
  }

  setHttpProgressStatus(inProgress: boolean) {
    this.httpLoading$.next(inProgress);
  }
}
