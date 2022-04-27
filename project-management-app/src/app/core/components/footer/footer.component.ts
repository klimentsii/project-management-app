import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div class="container">
        <div class="footer-inner">
          <div class="footer-nav">
            <a href="https://rs.school/angular/"><button mat-raised-button color="primary"><img src="/assets/rs-logo.png" alt="" style='border-radius: 0;'></button></a>
            2022
          </div>
          <div class="footer-nav">
            <a href="https://github.com/klimentsii"><button mat-raised-button color="primary"><img src="https://avatars.githubusercontent.com/u/59070287?v=4" alt="">klimentsii</button></a>
            <a href="https://github.com/Yurichprololz"><button mat-raised-button color="primary"><img src="https://avatars.githubusercontent.com/u/84023042?s=64&v=4" alt="">Yurichprololz</button></a>
            <a href="https://github.com/alex--sokolov"><button mat-raised-button color="primary"><img src="https://avatars.githubusercontent.com/u/8338821?v=4" alt="">Alex Sokolov</button></a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FooterComponent { }
