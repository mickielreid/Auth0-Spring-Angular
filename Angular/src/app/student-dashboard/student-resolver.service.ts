import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../classes/student';
import { StudentBackendService } from '../services/student-backend.service';

@Injectable()
export class StudentResolverService implements Resolve<Student>{

  constructor(private studentBackend : StudentBackendService, private authService: AuthService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): object | Observable<Student> | Promise<Student>  {
    console.log("in Strudent resolver")

    let testData:Student[] = [

      new Student("michael", "reid" , "pelaton", "active"),
      new Student("jake", "pendy" , "real city", "active"),
      new Student("some", "guy" , "from", "false"),

    ]
    console.log(testData)

    // return testData;
    return this.studentBackend.getAllStudents();
  }
}
