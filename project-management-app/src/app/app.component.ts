import { ChangeDetectorRef, Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { AuthService } from './login/services/auth.service';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import * as UserAction from './core/store/actions/user.action';
import { tap } from 'rxjs';
import { LoaderService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent implements OnInit, AfterViewInit {
  title: string = 'project-management-app';

  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private store: Store,
    private loaderService: LoaderService,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.store.dispatch(UserAction.FetchUser());
    }
  }

  ngAfterViewInit() {
    this.loaderService
      .httpProgress()
      .pipe(
        tap((status: boolean) => {
          if (status) {
            this.loading = true;
            this.cd.detectChanges();
            this.renderer.addClass(document.body, 'cursor-loader');
          }
        }),
        delay(200),
        tap((status: boolean) => {
          if (!status) {
            this.loading = false;
            this.renderer.removeClass(document.body, 'cursor-loader');
          }
        }),
      )
      .subscribe();
  }
}
