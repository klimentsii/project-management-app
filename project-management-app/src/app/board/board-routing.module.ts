import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainPageComponent from './pages/main-page/main-page.component';
import ProjectsPageComponent from './pages/projects-page/projects-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: ':id', component: ProjectsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
