import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CommonModule } from "@angular/common";
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard.component';
import { ChooseDashboardComponent } from '../choose-dashboard/choose-dashboard.component';
import { AuthGuardDashboard } from '../choose-dashboard/auth.guard-dashbaord';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { StudentHelperComponent } from '../student-helper/student-helper.component';
import { StudentResolverService } from '../student-dashboard/student-resolver.service';
import { AdminResolver } from '../admin-dashboard/admin.resolver';
import { LoginRedirectComponent } from '../login-redirect/login-redirect.component';
import { FailComponent } from '../fail/fail.component';
import { AdminGurard } from '../admin-dashboard/admin.guard';
import { StudentGuard } from '../student-dashboard/student.guard';
import { LogoutSuccessfulComponent } from '../logout-successful/logout-successful.component';


let routes : Routes = [
    {path: '', redirectTo: "/login", pathMatch: "full"},
    {path: "login", component: LoginRedirectComponent},
    {path: "choose-dashboard", component: ChooseDashboardComponent, canActivate: [AuthGuardDashboard]},
    {path: "student", component: StudentDashboardComponent, resolve: {data: StudentResolverService} ,  canActivate: [StudentGuard]  }, 
    {path: "admin", component: AdminDashboardComponent, resolve: {data: AdminResolver} ,  canActivate: [AdminGurard] }, 
    // {path: "header", component: HeaderComponent},
    {path: "student-helper", component: StudentHelperComponent,  canActivate: [AdminGurard] },
    {path: "logout", component: LogoutSuccessfulComponent},
    {path: "fail", component: FailComponent},
    {path: "**", component: FailComponent},

]

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forRoot(routes, {
        //this will scroll to top when move to a new page
        scrollPositionRestoration: 'enabled'
      }),
      CommonModule
    ],
    exports:[RouterModule],
    providers: [StudentResolverService, AdminResolver]
  })
export class RoutingModule { }