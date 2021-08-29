import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.css']
})
export class LoginRedirectComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.loginInReirect();
   }

  ngOnInit(): void {
  }

  loginInReirect(){
    // this.authService.logout();

    this.authService.loginWithRedirect({
      // redirect_uri : "http://localhost:4200/choose-dashboard",
      audience : environment.audience,
      // ask to do all of these actions
      scope: "create:student read:student update:student  delete:student",
      // this makes it stay on the chosen path which is below
      appState: {
        target: '/choose-dashboard'
      }, 
      prompt: "consent"
     
    });
 
    this.authService.error$.subscribe(error => console.error(error));
  }

}
