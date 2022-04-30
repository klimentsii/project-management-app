import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "../core/pages/page-not-found/page-not-found.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path:'',
    component: ProfileComponent
  },
  {
    path:'**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
