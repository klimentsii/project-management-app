import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['']);
  }

  goToTheBoards() {
    this.router.navigate(['boards']);
  }

  goToTheWelcome() {
    this.router.navigate(['welcome']);
  }
}
