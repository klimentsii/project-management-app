
import { Component, VERSION, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';

import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/login/services/auth.service';

import * as ColumnsActions from '../../../core/store/actions/columns.action';
import * as fromColumns from "../../../core/store/reducers/columns.reductor";
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { CreateItemModalComponent } from './modals/create-item-modal/create-item-modal.component';
import { ColumnModel } from 'src/app/core/models/columns';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardComponent {

  private id: UUIDType = '';

  private subscription: Subscription;

  columns: ColumnModel[] = [];
  columnsLength: number = 0;

  columns$: Observable<ColumnModel[]> = this.store.select(fromColumns.getColumns);

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private apiService: ApiService,
    private authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id=params['id']);

    this.columns$.subscribe(data => {
      this.columns = [...data];
      this.columnsLength = data.length;
    });
  }

  public ngOnInit(): void {
    this.store.dispatch(ColumnsActions.FetchColumns({ payload: this.id }));
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex);
    console.log(event.currentIndex);


    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  dropin(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public createColumn(type: string) {
    const dialog = this.dialog.open(CreateItemModalComponent, {
      height: '250px',
      width: '300px',
      data: type,
    });

    dialog.afterClosed()
    .pipe(
      tap((string: string) => {
        if (string) {
          this.store.dispatch(ColumnsActions.CreateColumn({ boardId: this.id, title: string, columnsCount: this.columnsLength }));
        };
      }))
    .subscribe();
  }
}
