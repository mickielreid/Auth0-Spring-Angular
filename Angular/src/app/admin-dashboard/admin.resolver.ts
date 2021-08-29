import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../classes/student';
import { StudentBackendService } from '../services/student-backend.service';

@Injectable()
export class AdminResolver implements Resolve<object>{

  constructor(private studentBackend:StudentBackendService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): object | Observable<object> | Promise<object> {
    console.log("in resolver")

    let testData:Student[] = [

      new Student("micahel", "scott" , "ny", "false"),
      new Student("michael", "reid" , "pelaton", "active"),
      new Student("jake", "pendy" , "real city", "active"),
      new Student("some", "guy" , "from", "false"),

    ]

    console.log(testData)
    // this.studentBackend.getAllStudents().subscribe(stu => {
    //   console.log("service student dat")
    //   console.log(stu)
    // })

    // 
    return this.studentBackend.getAllStudents();
  }
}
