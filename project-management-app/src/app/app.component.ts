import {Component, OnInit} from '@angular/core';
import {AuthService} from "./login/services/auth.service";
import {Store} from "@ngrx/store";

import * as UserAction from './core/store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent implements OnInit {
  title: string = 'project-management-app';

  constructor(private authService: AuthService, private store: Store) {
  }

  ngOnInit() {
    console.log('Store', this.store)
    if (this.authService.isUserLoggedIn()){
      console.log('Logged in')
      this.store.dispatch(UserAction.FetchUser())
    }
  }
}
