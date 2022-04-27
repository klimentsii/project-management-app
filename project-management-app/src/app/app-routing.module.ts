import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () => import('./board/board-routing.module').then(m => m.BoardRoutingModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome-routing.module').then(m => m.WelcomeRoutingModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account-routing.module').then(m => m.AccountRoutingModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login-routing.module').then(m => m.LoginRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
