import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {
  type = "info";
  closed = true;

  loginFormGroup: FormGroup = new FormGroup(
    {
      username: new FormControl("",[Validators.required]),
      password3: new FormControl('',[Validators.required, Validators.minLength(5)])

    }
  );

  constructor(private authService: AuthService) {
    this.loginInReirect();
   }
  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
   
  
  }


  onSubmit(){
   let username = this.loginFormGroup.get("username");
   console.log(username.value)
  }


  loginInReirect(){

    // this.authService.logout();

    this.authService.loginWithRedirect({
      redirect_uri : "http://localhost:4200/choose-dashboard",
      audience : "http://localhost:8080",
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
