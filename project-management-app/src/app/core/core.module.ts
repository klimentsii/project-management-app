import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptor } from './interceptors/api.interceptor';
import BoardComponent from '../board/pages/board/board.component';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './store/effects/user.effects';
import { BoardsEffects } from './store/effects/boards.effects';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { reducers } from './store/reducers';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ColumnsEffects } from './store/effects/columns.effects';

@NgModule({
  declarations: [
    BoardComponent,
    ConfirmationModalComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  exports: [HeaderComponent, FooterComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([UserEffects, BoardsEffects, ColumnsEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}
