import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from './authentication.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  isAuthenticated = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    // this.authService.isLoggedIn.subscribe(res => {
    //   console.log('auth login', res);
    // });
    this.authService.isLoggedIn.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  login() {
    this.authService.doLogin();
    // this.isLoading = true;
    // const login$ = this.authenticationService.login(this.loginForm.value);
    // login$.pipe(
    //   finalize(() => {
    //     this.loginForm.markAsPristine();
    //     this.isLoading = false;
    //   }),
    //   untilDestroyed(this)
    // ).subscribe(credentials => {
    //   log.debug(`${credentials.username} successfully logged in`);
    //   this.router.navigate([ this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
    // }, error => {
    //   log.debug(`Login error: ${error}`);
    //   this.error = error;
    // });
  }

  logout() {
    // this.url = '/login';
    // this.authService.signOut(this.url);
    log.debug('logout');
    this.authService.signOut();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
