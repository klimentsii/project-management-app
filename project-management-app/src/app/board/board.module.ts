import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardsComponent } from './pages/boards/boards.components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BoardsComponent],
  imports: [CommonModule, BoardRoutingModule, SharedModule],
})
export class BoardModule {}
