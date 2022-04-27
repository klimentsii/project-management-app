import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
