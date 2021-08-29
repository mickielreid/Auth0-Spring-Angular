import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetailsService } from '../services/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  private userRole: string = '';
  constructor(private router: Router, private userDetailsService: UserDetailsService) { }

  // a admin and a student user can use the Student dashboard
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // getting the user role
    this.userRole = this.userDetailsService.getUserRole();
    console.log("In the Student Guard, role is")
    console.log(this.userDetailsService.getUserRole())
    if (this.userRole != '' || this.userRole != undefined) {

      if (this.userRole === "student-admin") {
        console.log("/admin")

        return true;
      } else if (this.userRole === "student-clerk-user") {
        console.log("/student")

        return true;
      } else {
        return false;
        
      }

    } else {
      this.router.navigate(['/fail']);
    }






  }


}
