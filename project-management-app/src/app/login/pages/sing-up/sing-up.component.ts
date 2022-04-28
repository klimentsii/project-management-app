import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingUpComponent {
  signUpData: FormGroup;

  constructor() {
    this.signUpData = new FormGroup({
      email: new FormControl('', []),
      userName: new FormControl('', []),
      password: new FormControl('', []),
      repeatedPassword: new FormControl('', []),
    });
  }

  onSubmit() {}
}
