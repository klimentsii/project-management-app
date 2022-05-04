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
    this.db.title.push(this.newBoardForm.value.title);
    this.db.deleteButton.push(false);
    this.db.users.push(['erb']);
    this.db.id.push((performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,""));
    this.changeState();
    console.log(this.db);
  }

  chooseTitleError(): string {
    for (let item in this.newBoardForm.controls['title'].errors) {
      return Object.entries(this.obj)[Object.keys(this.obj).indexOf(item)][1];
    }
    return '';
  }

  deleteBoard(i: number) {
    if (this.db.deleteButton[i] === true) {
      this.db.title.splice(i, 1);
      this.db.users.splice(i, 1);
      this.db.id.splice(i, 1);
      this.db.deleteButton.splice(i, 1);
      this.changeDeleteBoardState(i);
    } else {
      this.db.deleteButton[i] = true;
    }
  }

  changeDeleteBoardState(i: number) {
    if (this.db.title[i]) {
      this.db.deleteButton[i] = false;
    }
  }
}
