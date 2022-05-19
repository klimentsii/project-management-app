import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubComponent {
  @Input() githubName!: string;
}
