import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingInComponent {
  loginData: FormGroup;

  constructor() {
    this.loginData = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', []),
    });
  }

  onSubmit() {}
}
