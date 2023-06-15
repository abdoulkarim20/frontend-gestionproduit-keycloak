import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ProduitComponent } from './produit/produit.component';
import { CategorieComponent } from './categorie/categorie.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
/*Cette fonction permet de demarer keycloak au demarage*/
export function kcFactory(kycloakService: KeycloakService) {
  /*Return une promesse*/
  return () => {
    kycloakService.init({
      config: {
        realm: "wallet-realm",
        clientId: "wallet-client",
        url: "http://localhost:8180"
      },
      initOptions: {
        onLoad: "check-sso",
        checkLoginIframe: true
      }
    }
    )
  }
}


@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    CategorieComponent,
    NavbarComponent,
    HomeComponent,
    ForbiddenComponent
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
