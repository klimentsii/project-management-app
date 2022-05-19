import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { GithubComponent } from './components/github/github.component';

@NgModule({
  declarations: [WelcomeComponent, GithubComponent],
  imports: [CommonModule, WelcomeRoutingModule],
})
export class WelcomeModule {}
