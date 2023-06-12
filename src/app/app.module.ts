import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
/*Cette fonction permet de demarer keycloak au demarage*/
export function kcFactory(kycloakService: KeycloakService) {
  /*Return une promesse*/
  return () => {
    kycloakService.init({
      config: {
        realm: "wallet-realm",
        clientId: "wallet-client",
        url: "http://localhost:8080"
      },
      initOptions: {
        onLoad: "login-required",
        checkLoginIframe: true
      }
    }
    )
  }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    deps: [KeycloakService],
    useFactory: kcFactory,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
