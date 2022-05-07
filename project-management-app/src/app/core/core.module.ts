import {NgModule} from '@angular/core';
import {environment} from "../../environments/environment";
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiInterceptor} from './interceptors/api.interceptor';
import BoardComponent from '../board/pages/board/board.component';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ConfirmationModalComponent} from './components/confirmation-modal/confirmation-modal.component';
import {StoreModule} from "@ngrx/store";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import * as fromUser from './store/reducers/user.reducer'
import * as fromBoards from './store/reducers/boards.reducer'
import {UserEffects} from "./store/effects/user.effects";
import {BoardsEffects} from "./store/effects/boards.effects";
import {ErrorInterceptor} from "./interceptors/error.interceptor";


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
    StoreModule.forRoot({auth: fromUser.reducer, boards: fromBoards.reducer}, {}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([UserEffects, BoardsEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor,  multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,  multi: true}
  ],
})
export class CoreModule {
}
