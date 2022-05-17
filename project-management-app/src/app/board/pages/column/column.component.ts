import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModel } from 'src/app/core/models/columns';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import { Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';

import * as ColumnsActions from '../../../core/store/actions/columns.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComponent implements OnInit {
  @Input()
  column!: ColumnModel;

  changeColumnTitleBoolean: boolean = false;

  private id: UUIDType = '';

  private subscription: Subscription;

  public title: string = '';

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private activateRoute: ActivatedRoute,
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id=params['id']);
  }

  ngOnInit(): void {}

  public changeColumnTitle(): void {
    this.changeColumnTitleBoolean = !this.changeColumnTitleBoolean;
  }

  deleteColumn(): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      height: '150px',
      width: '300px',
      data: this.column.id,
    });

    console.log(this.column.id);
    console.log(this.id);



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
}
