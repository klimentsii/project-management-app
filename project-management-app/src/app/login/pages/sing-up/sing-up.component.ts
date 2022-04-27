import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
