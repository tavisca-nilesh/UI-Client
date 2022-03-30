import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:7203',
        customParamsCodeRequest: {
          client_secret: 'org-auth-server-secret',
        },
        authWellknownEndpointUrl: 'https://localhost:7203/.well-known/openid-configuration',
        redirectUrl: window.location.origin,
        postLoginRoute: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'org-auth-server',
        scope: 'openid api', // 'openid profile offline_access ' + your scopes
        responseType: 'code',
        logLevel: LogLevel.Error,
        // customParamsEndSessionRequest: {
        //   client_secret: 'org-auth-server-secret',
        // },
        silentRenew: false,
        silentRenewUrl: '${window.location.origin}/silent-renew.html',
        useRefreshToken: false,
        renewTimeBeforeTokenExpiresInSeconds: 30,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
