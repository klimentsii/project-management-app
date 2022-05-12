import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardsComponent } from './pages/boards/boards.components';
import { SharedModule } from '../shared/shared.module';
import { CreateItemModalComponent } from './pages/board/modals/create-item-modal/create-item-modal.component';
import BoardComponent from './pages/board/board.component';

@NgModule({
  declarations: [BoardsComponent, CreateItemModalComponent, BoardComponent],
  imports: [CommonModule, BoardRoutingModule, SharedModule],
})
export class BoardModule {}
