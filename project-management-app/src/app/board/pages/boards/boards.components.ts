import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import * as BoardsAction from 'src/app/core/store/actions/boards.action';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';
import { Observable, ReplaySubject, tap } from 'rxjs';
import * as fromBoards from '../../../core/store/reducers/boards.reducer';
import { BoardUsersModel } from '../../../core/models/boards';
import { Store } from '@ngrx/store';
import * as BoardsActions from '../../../core/store/actions/boards.action';
import { AuthService } from '../../../login/services/auth.service';
import {
  DescriptionErrorMessages,
  TitleErrorMessages,
} from 'src/app/shared/validationMessages.enum';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private store: Store,
    private apiService: ApiService,

    private dialog: MatDialog,
  ) {}

  auth = this.authService.getAuthInfo();
  id = this.auth?.id;

  boards$: Observable<BoardUsersModel[]> = this.store.select(fromBoards.selectBoards);

  editBoardId: string = '';

  newBoardState: boolean = true;

  public pipeValue: string = '';

  newBoardForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [Validators.required]),
  });

  editBoardForm!: FormGroup;

  enterEditMode(e: Event, boardId: string, title: string, desc: string): void {
    e.stopPropagation();
    this.editBoardId = boardId;
    this.editBoardForm = new FormGroup({
      title: new FormControl(title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl(desc, [Validators.required]),
    });
    console.log(boardId);
  }

  exitEditMode(e: Event): void {
    e.stopPropagation();
    this.editBoardId = '';
  }

  changeState(): void {
    this.newBoardState = !this.newBoardState;
  }

  updateBoard(): void {
    const title = this.editBoardForm.value.title;
    const description = this.editBoardForm.value.description;
    this.store.dispatch(BoardsActions.UpdateBoard({ id: this.editBoardId, title, description }));
    this.editBoardId = '';
  }

  createNewBoard(): void {
    const title = this.newBoardForm.value.title;
    const description = this.newBoardForm.value.description;
    this.store.dispatch(BoardsActions.CreateBoard({ title, description }));
    this.changeState();
  }

  chooseTitleError(boardType: string): string {
    switch (boardType) {
      case 'newBoard':
        for (let item in this.newBoardForm.controls['title'].errors) {
          return Object.entries(TitleErrorMessages)[
            Object.keys(TitleErrorMessages).indexOf(item)
          ][1];
        }
        return '';
      case 'editBoard':
        for (let item in this.editBoardForm.controls['title'].errors) {
          return Object.entries(TitleErrorMessages)[
            Object.keys(TitleErrorMessages).indexOf(item)
          ][1];
        }
        return '';
      default:
        return '';
    }
  }

  chooseDescriptionError(boardType: string): string {
    switch (boardType) {
      case 'newBoard':
        for (let item in this.newBoardForm.controls['description'].errors) {
          return Object.entries(DescriptionErrorMessages)[
            Object.keys(DescriptionErrorMessages).indexOf(item)
          ][1];
        }
        return '';
      case 'editBoard':
        for (let item in this.editBoardForm.controls['description'].errors) {
          return Object.entries(DescriptionErrorMessages)[
            Object.keys(DescriptionErrorMessages).indexOf(item)
          ][1];
        }
        return '';
      default:
        return '';
    }
  };

  deleteBoard(e: Event, id: UUIDType): void {
    e.stopPropagation();
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      height: '150px',
      width: '300px',
      data: id,
    });

    dialog
      .afterClosed()
      .pipe(
        tap(nextId => {
          if (nextId) this.store.dispatch(BoardsActions.DeleteBoard({ boardId: nextId }));
        }),
      )
      .subscribe();
  }

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  ngOnInit(): void {
    this.store.dispatch(BoardsAction.FetchBoards());
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
