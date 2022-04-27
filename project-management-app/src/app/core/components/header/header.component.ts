import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <div class="container">
        <div class="header-inner">
          <div class='header-nav'>
            <button mat-raised-button color="primary" routerLink="/"><mat-icon>assessment</mat-icon></button>
            <button mat-raised-button color="primary" routerLink="">Boards</button>

            <mat-button-toggle-group>
              <mat-button-toggle value="en">en</mat-button-toggle>
              <mat-button-toggle value="ru">ru</mat-button-toggle>
            </mat-button-toggle-group>
          </div>

          <div class='header-nav'>
            <button mat-raised-button routerLink="" *ngIf="true" color="primary">Sign in</button>
            <button mat-raised-button routerLink="" color="primary">Sign up</button>
            <button mat-raised-button routerLink="" *ngIf="false" color="primary"><mat-icon>account_circle</mat-icon></button>
            <button mat-raised-button routerLink="" *ngIf="false" color="primary"><mat-icon>exit_to_app</mat-icon></button>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent {

}
