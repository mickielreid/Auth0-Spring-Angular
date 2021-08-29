import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
// this service is used to store imformation about the logged in user 
export class UserDetailsService {
  private userRole:string ;

  constructor(private authService:AuthService,private router :Router) { }

  public populateUserDetails(user):void{   
    this.userRole = user["https://student-api.example.com/roles"][0];
  }

  public getUserRole():string{
    console.log("ROLE IS " +  this.userRole)
    // if the roles were not set from the choose dashboard then we try to populate it again
    if(this.userRole === '' || this.userRole === undefined){
      this.fetchAndPopulateVarables();
    }

    return this.userRole;
  }

  fetchAndPopulateVarables():void {

    this.authService.getAccessTokenSilently().subscribe(token =>{
      console.log("token")
      console.log(token)
    });

    this.authService.idTokenClaims$.subscribe(idtoken =>{
      console.log("id token")
      console.log(idtoken)
    })



    this.authService.isAuthenticated$.subscribe(isAuth =>{
      console.log("Is auth in User Details Service" + isAuth)
      if(isAuth){
        this.authService.user$.subscribe(user =>{
          if(user !== null || user !== undefined)
            this.populateUserDetails(user);
          else
            this.router.navigate(['/fail']);
        });
      }
    })
    
  }

}
