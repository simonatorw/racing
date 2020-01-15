import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  isLoggedIn(): boolean {
    if (localStorage.username) {
        this.loggedIn = true;
    } else {
        this.loggedIn = false;
    }

    return this.loggedIn;
  }

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.loggedIn = true)
    );
  }

  logout(): void {
    this.loggedIn = false;
  }
}
