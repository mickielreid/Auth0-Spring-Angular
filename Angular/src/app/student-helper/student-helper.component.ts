import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../classes/student';
import { SessionService } from '../services/session.service';
import { StudentBackendService } from '../services/student-backend.service';

// this componet does two things update a student or create a new one 
@Component({
  selector: 'app-student-helper',
  templateUrl: './student-helper.component.html',
  styleUrls: ['./student-helper.component.css']
})
export class StudentHelperComponent implements OnInit {

  // if it a update then the title is update elese it is set to 
  headerTitle;
  isUpdate: boolean = false;

  constructor( private sessionService:SessionService, private backendService: StudentBackendService, private router:Router) { }

  studentFormGroup: FormGroup;

  currentSTudent:Student;

  ngOnInit(): void {

    let student = this.sessionService.getSetStudentToUpdatet();
    console.log("studnet statusi 0s" + student.firstName != undefined)
    console.log(student)
    if(student.firstName != undefined){
      this.isUpdate = true;
      this.currentSTudent = student;
      this.headerTitle = "Dunder Mifflin Student Updater";

    }else{
      this.headerTitle = "Dunder Mifflin Student Creation Center";
      // pre caution
      this.isUpdate = false;
    }

    // this build the form Group
    this.populateFormGroup(student);

    console.log("is update " + this.isUpdate)



  }

  populateFormGroup(student?:Student){
    this.studentFormGroup = new FormGroup({
      firstName: new FormControl(student.firstName, [Validators.required]),
      lastName: new FormControl(student.lastName, [Validators.required]),
      homeCity: new FormControl(student.homeCity, [Validators.required]),
      status: new FormControl(student.status, [Validators.required]),
      id: new FormControl(student.id)
    });
  }

  onSubmit(){
    let student = this.studentFormGroup.value

    // to pass back the same id
    if(this.isUpdate){
      student.id = this.currentSTudent.id
    }

   let reBuiltStudent = Object.assign(new Student() , student);
  
    console.log("built Student")
    console.log(reBuiltStudent)


    if(this.isUpdate){
      this.backendService.updateStudent(reBuiltStudent).subscribe(
        (res) => {
          console.log("Got back update Response")
          console.log(res)
          this.router.navigate(['/admin'])
        },
        (error: HttpErrorResponse ) => {
          alert("Sorry we could not update at this momoent please try again later");
          console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
  
        }
  
      )

    }else{
      this.backendService.createStudent(reBuiltStudent).subscribe(
        (res) => {
          console.log("Got back update Response")
          console.log(res)
          this.router.navigate(['/admin'])
        },
        (error: HttpErrorResponse ) => {
          alert("Sorry we could not create your student please try agin later");
          console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
          console.error(error.error)
          console.error(error.url)
  
        }
  
      )
    }

    



  }



}
