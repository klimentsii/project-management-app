import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';

@NgModule({
  declarations: [
    SingUpComponent,
    SingInComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
  ],
})
export class LoginModule { }
