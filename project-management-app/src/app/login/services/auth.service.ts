import { Injectable, SkipSelf } from '@angular/core';
import { BrowserStorageService } from '../../core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@SkipSelf() private localStorageService: BrowserStorageService) {}

  isUserLoggedIn = (): boolean => {
    return !!this.localStorageService.get('auth');
  };

  getToken = (): string | null => {
    return this.localStorageService.get('auth');
  };
}
