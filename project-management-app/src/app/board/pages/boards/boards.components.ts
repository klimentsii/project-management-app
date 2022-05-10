import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import * as BoardsAction from 'src/app/core/store/actions/boards.action';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  ReplaySubject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import * as fromBoards from '../../../core/store/reducers/boards.reducer';
import { BoardUsersModel } from '../../../core/models/boards';
import { Store } from '@ngrx/store';
import * as BoardsActions from '../../../core/store/actions/boards.action';
import { AuthService } from '../../../login/services/auth.service';
import { TitleErrorMessages } from 'src/app/shared/validationMessages.enum';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  boards$: Observable<BoardUsersModel[]> = this.store.select(fromBoards.selectBoards);

  newBoardState: boolean = true;

  newBoardForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  changeState(): void {
    this.newBoardState = !this.newBoardState;
  }

  createNewBoard(): void {
    const title = this.newBoardForm.value.title;
    this.store.dispatch(BoardsActions.CreateBoard({ title }));
    this.changeState();
  }

  chooseTitleError(): string {
    for (let item in this.newBoardForm.controls['title'].errors) {
      return Object.entries(TitleErrorMessages)[Object.keys(TitleErrorMessages).indexOf(item)][1];
    }
    return '';
  }

  deleteBoard(id: UUIDType): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      height: '150px',
      width: '300px',
      data: id,
    });

    dialog
      .afterClosed()
      .pipe(
        tap(() => {
          if (id) this.store.dispatch(BoardsActions.DeleteBoard({ boardId: id }));
        }),
      )
      .subscribe();
  }

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  delayed$ = new BehaviorSubject(false);

  private typingSubscription!: Subscription;

  ngOnInit(): void {
    this.store.dispatch(BoardsAction.FetchBoards());
    this.typingSubscription = this.newBoardForm.valueChanges
      .pipe(
        tap(() => {
          this.delayed$.next(false);
        }),
        takeUntil(this.destroyed$),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.delayed$.next(true);
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
