import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
