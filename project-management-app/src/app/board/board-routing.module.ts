import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import ProjectsPageComponent from './pages/projects-page/projects-page.component';

const routes: Routes = [
  { path: '', component: BoardComponent },
  { path: ':id', component: ProjectsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
