import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CredentialsService } from './credentials.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oidcSecurityService: OidcSecurityService, private credentialsService: CredentialsService) {}

  get isLoggedIn() {
    return this.oidcSecurityService.isAuthenticated$;
  }

  get token() {
    return this.oidcSecurityService.getAccessToken();
  }

  get userData() {
    return this.oidcSecurityService.userData$;
  }

  checkAuth() {
    return this.oidcSecurityService.checkAuth();
  }

  doLogin() {
    return of(this.oidcSecurityService.authorize());
  }

  setCredentials(creds: any) {
    this.credentialsService.setCredentials({ token: creds.accessToken, username: '' });
  }

  signOut() {
    this.oidcSecurityService.logoff();
    this.credentialsService.setCredentials();
  }
}
