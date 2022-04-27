import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule { }
