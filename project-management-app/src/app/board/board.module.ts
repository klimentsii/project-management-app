import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardsComponent } from './pages/boards/boards.components';
import { SharedModule } from '../shared/shared.module';
import { CreateItemModalComponent } from './pages/board/modals/create-item-modal/create-item-modal.component';
import BoardComponent from './pages/board/board.component';
import { ColumnComponent } from './pages/column/column.component';
import { TaskComponent } from './pages/task/task.component';
import { FilteredTasksPipe } from './pipes/filtered-tasks.pipe';
import { EditTaskModalComponent } from './pages/board/modals/edit-task-modal/edit-task-modal.component';
import { SearchPipe } from './pipes/search.pipe';
import { SearchTaskPipe } from './pipes/search-task.pipe';

@NgModule({
  declarations: [BoardsComponent, CreateItemModalComponent, BoardComponent, ColumnComponent, TaskComponent, FilteredTasksPipe, EditTaskModalComponent, SearchPipe, SearchTaskPipe],
  imports: [CommonModule, BoardRoutingModule, SharedModule],
})
export class BoardModule {}
