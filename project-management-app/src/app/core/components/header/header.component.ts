import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthModel } from '../../../login/models/auth.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUser from '../../store/reducers/user.reducer';
import * as UserAction from '../../store/actions/user.action';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/services/auth.service';
import { Languages } from '../../store/store.model';
import { ChangeLanguage } from '../../store/actions/core.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent {
  constructor(private store: Store, private router: Router, private authService: AuthService) {}

  userLogged$: Observable<AuthModel | null> = this.store.select(fromUser.selectCurrentUser);

  logOut() {
    this.store.dispatch(UserAction.LogoutUser());
    return this.router.navigate(['/welcome']);
  }

  changeLang(lang: Languages) {
    this.store.dispatch(ChangeLanguage({ lang }));
  }
}
