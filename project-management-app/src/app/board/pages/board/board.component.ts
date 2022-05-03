import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

export interface Idb {
  value: string;
  deleteButton: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  newBoardState: boolean = true;

  db: Array<Idb> = [
    {
      value: 'Shiba Inu',
      deleteButton: false,
    },
  ];

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.createBoard$('gg');
    let eve = this.apiService.getBoards$().subscribe(data => console.log(data));
    // console.log(eve);

  }

  changeState(): void {
    this.newBoardState = !this.newBoardState;
  }

  createNewBoard(): void {
    if (this.newBoardForm.controls['title'].status === 'VALID' && !this.db.includes(this.newBoardForm.value.title)) {
      this.db.push({
        value: this.newBoardForm.value.title,
        deleteButton: false,
      });
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
    this.db.map((e, i) => {
      if (e.value === item) currentItemNumber = i
    });

    if (this.db[currentItemNumber].deleteButton === true) {
      this.db.splice(currentItemNumber, 1);
      this.changeDeleteBoardState(item);
    } else {
      this.db[currentItemNumber].deleteButton = true;
    }
  }

  changeDeleteBoardState(item: string) {
    let currentItemNumber = -1;
    this.db.map((e, i) => {
      if (e.value === item) currentItemNumber = i
    });
    if (this.db[currentItemNumber]) {
      this.db[currentItemNumber].deleteButton = false;
    }
  }
}
