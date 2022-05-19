import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModel } from 'src/app/core/models/columns';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';

import * as ColumnsActions from '../../../core/store/actions/columns.action';
import * as TasksActions from '../../../core/store/actions/tasks.action';
import * as TasksReducers from "../../../core/store/reducers/tasks.reducer";
import { FileModel } from 'src/app/core/models/files';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CreateItemModalComponent } from '../board/modals/create-item-modal/create-item-modal.component';
import { TaskModelPlus } from 'src/app/core/models/tasks';
import { AuthService } from 'src/app/login/services/auth.service';
import { FilteredTasksPipe } from '../../pipes/filtered-tasks.pipe';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent implements OnInit {
  @Input()
  column!: ColumnModel;
  @Input()
  tasks$!: Observable<TaskModelPlus[]>;
  @Input()
  pipeValue!: string;

  private tasks: TaskModelPlus[] = [];

  public tasksTitles: string[] = []

  changeColumnTitleBoolean: boolean = false;

  private id: UUIDType = '';

  private subscription: Subscription;

  public title: string = '';

  private tasksLength: number = 0;

  public columnIds: string[] = [];

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private activateRoute: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id=params['id']);
  };

  ngOnInit(): void {
    this.getColumnIds();

    this.tasks$.subscribe(data => {
      if (data) {
        this.tasksLength = data.length;
        this.tasks = [...data];
        this.tasksTitles = [...data.map(e => e.title)];
      }
    });
  };

  public changeColumnTitle(): void {
    this.changeColumnTitleBoolean = !this.changeColumnTitleBoolean;
  }

  deleteColumn(): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      height: '150px',
      width: '300px',
      data: this.column.id,
    });

    dialog.afterClosed()
    .pipe(
      tap((id: UUIDType) => {
        if (id) {
          this.store.dispatch(ColumnsActions.DeleteColumn({ boardId: this.id, columnId: this.column.id }));
        };
      }))
    .subscribe();
  }

  public approveChangeTitle(columnId: UUIDType, columnOrder: number): void {
    if (this.changeColumnTitleBoolean && this.title) {
      this.store.dispatch(ColumnsActions.UpdateColumnTitle({
        boardId: this.id,
        columnId: columnId,
        title: this.title,
        order: columnOrder,
      }));
      this.column.title = this.title;
      this.changeColumnTitle();
    };
  };

  dropin(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('first: ', event.container.data);

      this.store.dispatch(TasksActions.ChangeTasksOrder({
        boardId: this.id,
        tasks: this.tasks,
      }));

    } else {

      console.log('second: ', event.previousContainer.data, event.container.data);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public getColumnIds(): void {
    this.apiService.getColumns$(this.id).subscribe(
      data => {
        data.forEach((column: ColumnModel) => {
          this.columnIds.push(column.id);
        });
      }
    );
  };

  public createTask(type: string): void {
    const dialog = this.dialog.open(CreateItemModalComponent, {
      height: '250px',
      width: '300px',
      data: type,
    });

    dialog.afterClosed()
    .pipe(
      tap((string: string) => {
        if (string) {
          const userId = this.authService.getAuthInfo()?.id as string;

          this.store.dispatch(TasksActions.CreateTask({
            task: {
              id: '',
              title: string,
              order: this.tasksLength,
              description: string,
              userId: userId,
              boardId: this.id,
              columnId: this.column.id,
              done: false,
            }
          }));
        };
      }))
    .subscribe();
  }
};
