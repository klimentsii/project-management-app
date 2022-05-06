import {ChangeDetectionStrategy, Component } from '@angular/core';
import {AuthInfoModel} from "../../../login/models/auth.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromUser from '../../store/reducers/user.reducer';
import * as UserAction from "../../store/actions/user.action";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent {
  constructor(private store: Store, private router: Router) {
  }

  userLogged$:Observable<AuthInfoModel | null>= this.store.select(fromUser.getCurrentUser);

  logOut() {
    this.store.dispatch(UserAction.LogoutUser());
    return this.router.navigate(['/welcome']);
  }
}
