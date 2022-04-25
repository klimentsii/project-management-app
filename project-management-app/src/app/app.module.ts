import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import MainPageComponent from './core/pages/main-page/main-page.component';
import ProjectsPageComponent from './core/pages/projects-page/projects-page.component';
import HeaderComponent from './core/components/header/header.component';
import FooterComponent from './core/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProjectsPageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule { }
