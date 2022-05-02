import { Injectable } from '@angular/core';
import { EMPTY, mergeMap, Observable, tap } from 'rxjs';
import { Token } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services/api.service';
import { BrowserStorageService } from '../../core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private localStorageService: BrowserStorageService, private API: ApiService) {}

  isUserLoggedIn(): boolean {
    return !!this.localStorageService.get('auth');
  }

  getToken(): string | null {
    return this.localStorageService.get('auth');
  }

  setToken(value: Token): void {
    return this.localStorageService.set('auth', value.token);
  }

  signUp$(name: string, login: string, password: string): Observable<Token> {
    return this.API.signUp$(name, login, password).pipe(
      mergeMap(user => {
        if (user) {
          return this.signIn$(user.login, user.name);
        }
        return EMPTY;
      }),
      tap(() => console.log('User created')),
    );
  }

  signIn$(login: string, password: string): Observable<Token> {
    return this.API.signIn$(login, password).pipe(
      tap(token => this.setToken(token)),
      tap(() => console.log('Token taken')),
    );
  }
}
