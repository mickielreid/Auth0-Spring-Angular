import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { StudentbackendInterceptor } from '../auth/studentbackend.interceptor';


export const httpInceptorsProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: StudentbackendInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
   

    
];