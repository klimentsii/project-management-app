import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { Iboards, Idb } from '../../models/db.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  // Example: board from server
  boards: Array<Iboards> = [
    {
      id: 'vrq8-9b9r-bbrb-b5bb',
      title: JSON.stringify({title: "Shiba Inu", id: ["26-364-62-34ywny4", "246-62w4ymy-2644"]}),
    },
    {
      id: '5g55-gg33-grbg-g55g',
      title: JSON.stringify({title: "Etherium", id: ["6ttq-364-q62-94", "2qtnq6-6-22464274", "2qtbqnq6-6"]}),
    }
  ]

  newBoardState: boolean = true;

  db: Idb[] = [];

  obj: object = {
    required: 'Title is required',
    minlength: 'Title must be at least 3 characters long',
    maxlength: 'Title must be 20 characters maximum',
  }

  newBoardForm: FormGroup = new FormGroup({
    "title": new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ])
  });

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.boards.map(e => {
      this.db.push({
        title: JSON.parse(e.title).title,
        users: JSON.parse(e.title).id,
        id: e.id,
      })
    });
  }

  ngOnInit(): void {
    // this.apiService.createBoard$('gg');
    // let eve = this.apiService.getBoards$().subscribe(data => console.log(data));
  }

  changeState(): void {
    this.newBoardState = !this.newBoardState;
  }

  createNewBoard(): void {
    this.db.push({
      title: this.newBoardForm.value.title,
      users: ['erb'],
      id: this.createUniqueId(),
    })
    this.changeState();
  }

  createUniqueId(): string {
    return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
  }

  chooseTitleError(): string {
    for (let item in this.newBoardForm.controls['title'].errors) {
      return Object.entries(this.obj)[Object.keys(this.obj).indexOf(item)][1];
    }
    return '';
  }

  deleteBoard(i: number): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      height: '150px',
      width: '300px',
      data: i,
    });

    dialog.afterClosed().subscribe(i => {
      if (i !== undefined) {
        this.db.splice(i, 1);
      }
    });
  }
}
