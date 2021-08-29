import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { AuthGuard } from '@auth0/auth0-angular';
import { first, map } from 'rxjs/operators';
import { UserDetailsService } from '../services/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardDashboard implements CanActivate {

  constructor(private router: Router, private guard: AuthGuard, private authService: AuthService, private userDetailsService: UserDetailsService) { }

  //THIS IS custom becuase we want to be able to choose the right dashboard
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


    //  it will never need to get here 
    //I took all the extra steps here because if this fails the app will fail
    this.authService.isLoading$.subscribe(isLoading => {

      if (isLoading == false) {

        console.log("LOADING FINISHED " + isLoading)

        this.authService.isAuthenticated$.subscribe(isAuth => {
          if (isAuth) {
            this.authService.user$.subscribe(LoggedInUser => {
              let userRole: string;
              console.log("user loggin is")
              // console.log(LoggedInUser)

              if (LoggedInUser != null) {
                // populate the user details 
                this.userDetailsService.populateUserDetails(LoggedInUser);
                userRole = this.userDetailsService.getUserRole();

                // make sure its not empty
                if (userRole != "") {
                  // then chose the right dashboard
                  if (userRole === "student-clerk-user") {
                    console.log("/student")
                    this.router.navigate(['/student']);
                  } else if (userRole === "student-admin") {
                    console.log("/admin")
                    this.router.navigate(['/admin']);
                  }else {
                    console.log("/fail")
                    // if we have no dash borad then re route the user to a failed board
                    this.router.navigate(['/fail']);
                  }
                }else {
                  this.router.navigate(['/fail']);
                }


              }

            });
          } else {
            console.log("USER IS NOT AUTH " + isAuth)
          }
        })

      }

    });


    // it will not get here 
    return true;
  }
}
