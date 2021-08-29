import { Injectable } from '@angular/core';
import { Student } from '../classes/student';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  studentToUpdate:Student;

  constructor() { }

  setStudentToUpdate(student :Student){
    this.studentToUpdate = student;
  } 

  getSetStudentToUpdatet():Student{
  
    if(this.studentToUpdate == undefined){
      return new Student();
    }
    return this.studentToUpdate;
  }
}
