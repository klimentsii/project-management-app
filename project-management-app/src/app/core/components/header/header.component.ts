import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthModel } from '../../../login/models/auth.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUser from '../../store/reducers/user.reducer';
import * as UserAction from '../../store/actions/user.action';
import { AuthService } from '../../../login/services/auth.service';
import { ChangeLanguage } from '../../store/actions/core.action';
import { Languages } from '../../store/store.model';
import { NavigatorService } from '../../services/navigator.service';
import { BrowserStorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent {
  constructor(
    private store: Store,
    private authService: AuthService,
    private navigator: NavigatorService,
    private storage: BrowserStorageService,
  ) {}

  userLogged$: Observable<AuthModel | null> = this.store.select(fromUser.selectCurrentUser);

  logOut() {
    this.store.dispatch(UserAction.LogoutUser());
    return this.navigator.goToTheWelcome();
  }

  changeLang(lang: Languages) {
    this.store.dispatch(ChangeLanguage({ lang }));
    this.storage.set('lang', lang);
  }
}
