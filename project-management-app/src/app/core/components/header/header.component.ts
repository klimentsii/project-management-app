import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthInfoModel} from "../../../login/models/auth.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromUser from '../../store/reducers/user.reducer';
import * as UserAction from "../../store/actions/user.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent implements OnInit{
  constructor(private store: Store) {
  }

  userLogged$:Observable<AuthInfoModel | null>= this.store.select(fromUser.getCurrentUser);

  ngOnInit() {
    this.store.subscribe((store) => console.log('STORE', store));
  }

  logOut() {
    this.store.dispatch(UserAction.LogoutUser())
  }
}
