import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import { BoardModule } from './board/board.module';
import CoreModule from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CoreModule, SharedModule, BoardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
