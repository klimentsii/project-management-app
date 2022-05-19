import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  private history: string[] = [];

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  goHome() {
    this.router.navigate(['']);
  }

  goToTheBoards() {
    this.router.navigate(['boards']);
  }

  goToTheWelcome() {
    this.router.navigate(['welcome']);
  }

  goBack() {
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
    this.history.pop();
  }
}
