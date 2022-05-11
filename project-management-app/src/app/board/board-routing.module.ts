import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.components';
import BoardComponent from './pages/board/board.component';

const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'b/:id', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
