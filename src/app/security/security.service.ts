import { Injectable } from '@angular/core';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public profile?: KeycloakProfile

  constructor(public keycloakService: KeycloakService) {
    this.init()
  }
  /*Recuperer le user connecter et ses renseignements et lui affecte a la variable profile*/
  init() {
    this.keycloakService.keycloakEvents$.subscribe({
      next: (event) => {
        if (event.type == KeycloakEventType.OnAuthSuccess) {
          this.keycloakService.loadUserProfile().then(profile => {
            this.profile = profile
            //console.log(profile);
          })
        }
      }
    })
  }

  /*Recupere les roles des users*/
  public hasRoleIn(roles: string[]) {
    let userRoles = this.keycloakService.getUserRoles();
    for (let role of roles) {
      if (userRoles.includes(role)) return true;
    }
    return false;
  }

}
