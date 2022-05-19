import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import { TaskModelPlus } from 'src/app/core/models/tasks';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/login/services/auth.service';

import * as TasksActions from '../../../core/store/actions/tasks.action';
import * as TasksReducers from "../../../core/store/reducers/tasks.reducer";
import * as fromTasks from '../../../core/store/reducers/tasks.reducer';
import { EditTaskModalComponent } from '../board/modals/edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {
  @Input()
  task!: TaskModelPlus;

  // tasks$: Observable<TaskModelPlus[]> = this.store.select(fromTasks.getTasks);

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private cdf: ChangeDetectorRef,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {}

  deleteTask(): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      height: '150px',
      width: '300px',
      data: this.task.id,
    });

    dialog.afterClosed()
    .pipe(
      tap((id: UUIDType) => {
        if (id) {
          this.store.dispatch(TasksActions.DeleteTask({ boardId: this.task.boardId, columnId: this.task.columnId, TaskId: this.task.id }));
        };
      }))
    .subscribe();
  }

  editTask(): void {
    const dialog = this.dialog.open(EditTaskModalComponent, {
      height: '350px',
      width: '300px',
      data: this.task,
    });

    dialog.afterClosed()
    .pipe(
      tap((task: TaskModelPlus) => {
        if (task) {
          this.store.dispatch(TasksActions.EditTask({
            boardId: this.task.boardId,
            columnId: this.task.columnId,
            taskId: this.task.id,
            title: task.title,
            description: task.description,
            done: task.done,
            order: this.task.order,
            userId: this.task.userId,
          }));
          // console.log(this.task);

          // this.apiService.getTaskById$(this.task.boardId, this.task.columnId, this.task.id).subscribe(data => this.task = {...data})
          // console.log(this.task);
        };
      })
    )
    .subscribe();
  }
}
