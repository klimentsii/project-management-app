import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

export interface Iboards {
  id: UUIDType;
  title: string;
}

export interface Idb {
  title: Array<string>;
  deleteButton: Array<boolean>;
  users: Array<Array<UUIDType>>;
  id: Array<UUIDType>;
}

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
      title: JSON.stringify({title: "Shiba Inu", id: ["6-364-62-464", "246-624-2644"]}),
    },
    {
      id: '5g55-gg33-grbg-g55g',
      title: JSON.stringify({title: "Etherium", id: ["6-364-62-464", "246-624-2644"]}),
    }
  ]

  newBoardState: boolean = true;

  db: Idb = {
    title: [],
    deleteButton: [],
    users: [],
    id: [],
  };

  errorTitle: string = '';

  myselfError: boolean = false;

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

  constructor(private apiService: ApiService) {
    this.boards.map(e => {
      this.db.title.push(JSON.parse(e.title).title);
      this.db.deleteButton.push(false);
      this.db.users.push(JSON.parse(e.title).id);
      this.db.id.push(e.id);
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
    if (this.newBoardForm.controls['title'].status === 'VALID' && !this.db.title  .includes(this.newBoardForm.value.title)) {
      this.db.title.push(this.newBoardForm.value.title);
      this.db.deleteButton.push(false);
      this.db.users.push(['erb']);
      this.db.id.push('ve4b-b53b-35hh-hhg3');
      this.changeState();
    }
  }

  chooseTitleError(): void {
    this.myselfError = true;
    if (this.newBoardForm.controls['title'].errors) {
      for (let item in this.newBoardForm.controls['title'].errors) {
        this.errorTitle = Object.entries(this.obj)[Object.keys(this.obj).indexOf(item)][1];
      }
    }
    // else if (this.db.includes(this.newBoardForm.value.title)) {
    //   console.log('Same titles');
    //   this.errorTitle = 'You have the same title';
    // }
    else {
      this.myselfError = false;
    }
  }

  deleteBoard(item: string) {
    let currentItemNumber = -1;
    this.db.title.map((e, i) => {
      if (e === item) currentItemNumber = i
    });

    if (this.db.deleteButton[currentItemNumber] === true) {
      this.db.title.splice(currentItemNumber, 1);
      this.db.users.splice(currentItemNumber, 1);
      this.db.id.splice(currentItemNumber, 1);
      this.db.deleteButton.splice(currentItemNumber, 1);
      this.changeDeleteBoardState(item);
    } else {
      this.db.deleteButton[currentItemNumber] = true;
    }
  }

  changeDeleteBoardState(item: string) {
    let currentItemNumber = -1;
    this.db.title.map((e, i) => {
      if (e === item) currentItemNumber = i;
    });
    if (this.db.title[currentItemNumber]) {
      this.db.deleteButton[currentItemNumber] = false;
    }
  }
}
