import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainPageComponent from './core/pages/main-page/main-page.component';
import ProjectsPageComponent from './core/pages/projects-page/projects-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'projects', component: ProjectsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule { }
