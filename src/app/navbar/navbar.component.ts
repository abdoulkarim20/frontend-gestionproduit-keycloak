import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public securityService: SecurityService) { }

  ngOnInit(): void {
    console.log("L'utilisateur connecter:");
  }

  /*Login*/
  async login() {
    await this.securityService.keycloakService.login({
      redirectUri: window.location.origin
    })
  }

  /*Se deconnecter*/
  onLogout() {
    this.securityService.keycloakService.logout(window.location.origin);
  }

}
