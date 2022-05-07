import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponents } from './pages/boards/boards.components';
import BoardComponent from './pages/board/board.component';

const routes: Routes = [
  { path: '', component: BoardsComponents },
  { path: ':id', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
