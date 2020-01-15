import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    localStorage.setItem('username', this.loginForm.value.username);
    this.appService.setUsername(this.loginForm.value.username);
    this.subscription = this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        this.router.navigate(['/members']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
