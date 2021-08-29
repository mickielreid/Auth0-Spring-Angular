import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';


import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { httpInceptorsProviders } from './shared/InceptorsList';
import { HeaderComponent } from './header/header.component';
import {AuthModule, HttpMethod} from "@auth0/auth0-angular";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { SortableHeaderDirective } from './shared/sortable-header.directive';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentHelperComponent } from './student-helper/student-helper.component';
import { LoginRedirectComponent } from './login-redirect/login-redirect.component';
import { FailComponent } from './fail/fail.component';
import { LogoutSuccessfulComponent } from './logout-successful/logout-successful.component';
import { environment } from 'src/environments/environment';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    StudentDashboardComponent,
    SortableHeaderDirective,
    AdminDashboardComponent,
    StudentHelperComponent,
    LoginRedirectComponent,
    FailComponent,
    LogoutSuccessfulComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
 
    NgbModule,
    ReactiveFormsModule,
    // first add you client id and domain
    
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
     
      audience: environment.audience,
       // Request this scope at user authentication time
      scope: 'read:current_user',
      redirectUri: environment.redirectUri,

      httpInterceptor :{
        allowedList:[
          {
            //uri: "http://localhost:8080/api/v1/student"
            uri: environment.backendDomain+environment.backendStudentEndpoint,
            httpMethod: HttpMethod.Get,
            tokenOptions: {
              audience: environment.audience,
              scope: 'read:student',
            },
          },

          {
            //uri: "http://localhost:8080/api/v1/student"
            uri: environment.backendDomain+environment.backendStudentEndpoint,
            httpMethod: HttpMethod.Patch,
            tokenOptions: {
              audience: environment.audience,
              scope: 'update:student ',//note the extra space
            },
          },

          {
            //uri: "http://localhost:8080/api/v1/student"
            uri: environment.backendDomain+environment.backendStudentEndpoint,
            httpMethod: HttpMethod.Delete,
            tokenOptions: {
              audience: environment.audience,
              scope: 'delete:student',
            },
          },

          {
            //uri: "http://localhost:8080/api/v1/student"
            uri: environment.backendDomain+environment.backendStudentEndpoint,
            httpMethod: HttpMethod.Post,
            tokenOptions: {
              audience: environment.audience,
              scope: 'create:student',
            },
          }
        ]
      }

      
    }),
    HttpClientModule,
    RoutingModule
   
  ],
  providers: [httpInceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
