import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, retry, switchMap, tap } from 'rxjs';
import { Token, UserNoIdModel } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services/api.service';
import { BrowserStorageService } from '../../core/services/storage.service';
import { AuthModel } from '../models/auth.model';
import * as UserAction from '../../core/store/actions/user.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorageService: BrowserStorageService,
    private API: ApiService,
    private store: Store,
    private router: Router,
  ) {}

  isUserLoggedIn(): boolean {
    return !!this.localStorageService.get('auth');
  }

  IsJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  getToken(): string | null {
    const auth = this.localStorageService.get('auth');
    return auth ? (this.IsJsonString(auth) ? JSON.parse(auth).token : auth) : null;
  }

  setToken(value: Token): void {
    return this.localStorageService.set('auth', value.token);
  }

  setAuthInfo(value: AuthModel): void {
    return this.localStorageService.set('auth', JSON.stringify(value));
  }

  getAuthInfo(): AuthModel | null {
    const auth = this.localStorageService.get('auth');
    return auth ? JSON.parse(auth) : null;
  }

  clearStorage(): void {
    this.localStorageService.clear();
  }

  logout() {
    this.store.dispatch(UserAction.LogoutUser());
    return this.router.navigate(['/auth/sign-in']);
  }

  signIn$(login: string, password: string): Observable<UserNoIdModel[]> {
    return this.API.signIn$(login, password).pipe(
      retry(4),
      tap(token => {
        this.setToken(token);
        console.log('Token is set');
      }),
      switchMap(token => {
        return this.API.getUsers$().pipe(
          tap(users => {
            const currentUser = users.filter(user => user.login === login);
            const auth = { ...token, ...currentUser[0] };
            this.setAuthInfo(auth);
            this.store.dispatch(UserAction.FetchUserSuccess({ user: auth }));
            console.log('User registered');
          }),
        );
      }),
      catchError(() => EMPTY),
    );
  }

  signUp$(name: string, login: string, password: string): Observable<UserNoIdModel[]> {
    return this.API.signUp$(name, login, password).pipe(
      retry(4),
      switchMap(user => (user ? this.signIn$(user.login, password) : EMPTY)),
      catchError(() => EMPTY),
      tap(() => console.log('User created')),
    );
  }
}
