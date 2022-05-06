import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptor } from './interceptors/api.interceptor';
import ProjectsPageComponent from '../board/pages/projects-page/projects-page.component';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    ProjectsPageComponent,
    ConfirmationModalComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  exports: [HeaderComponent, FooterComponent, ConfirmationModalComponent],
  imports: [CommonModule, SharedModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
})
export class CoreModule {}
