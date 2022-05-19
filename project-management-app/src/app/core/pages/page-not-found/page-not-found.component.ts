import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigatorService } from '../../services/navigator.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  constructor(private navigator: NavigatorService) {}

  goHome() {
    this.navigator.goHome();
  }

  goBack() {
    this.navigator.goBack();
  }
}
