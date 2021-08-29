import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetailsService } from '../services/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGurard implements CanActivate{
  private userRole: string = '';

  constructor(private router :Router,  private userDetailsService: UserDetailsService) { }
  //only a admin can use the admin dash board
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
   // getting the user role
   this.userRole = this.userDetailsService.getUserRole();
   console.log("In the Admin Guard, role is")
   console.log(this.userDetailsService.getUserRole())

   

   if (this.userRole != '' || this.userRole != undefined) {

     if (this.userRole === "student-admin") {
       console.log("/admin")

       return true;
     } else if (this.userRole === "student-clerk-user") {
       console.log("/student")
       this.router.navigate(['/student']);
      
     } else {
       return false;
       
     }

   } else {
     this.router.navigate(['/fail']);
   }

  }
}
