import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Student } from '../classes/student';
import { SessionService } from '../services/session.service';
import { StudentBackendService } from '../services/student-backend.service';
import { SortableHeaderDirective } from '../shared/sortable-header.directive';
import { compare, SortEvent } from '../shared/SortingTypesHolder';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  // these two work with updating the lazy status
  private update_subject = new Subject<string>();
  updateMessage = '';


  students;

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  // the alert
  @ViewChild('updateAlert', {static: false}) updateAlert: NgbAlert;

  // time out for the success message
  timeoutLimit= 6000;


  constructor(private bService: StudentBackendService, private sessionService:SessionService,private router:Router, private activeRoute:ActivatedRoute ) { }

  ngOnInit(): void {

    this.activeRoute.data.subscribe((students:Student[] ) =>{
      console.log("in the admin dashboard")
      console.log(students['data'])
      this.students =  students['data'];

    });

    // this.fetchAllStudents();


    console.log(this.students)

    // this is for the update messages
    this.update_subject.subscribe(message => this.updateMessage = message);

    this.update_subject.pipe(debounceTime(this.timeoutLimit)).subscribe(() => {
      if (this.updateAlert) {
        this.updateAlert.close();
      }
    });
  }

  

  // for sorting the table rows
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      // inatilize here 
      
    } else {
      this.students = [...this.students].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }

  }

  deleteStudent(id){

    console.log(id)

    if(id != null){
      console.log("in if")
      this.bService.deleteStudent(id).subscribe(data =>{
        console.log("delete data " + data)
        if(data){
          this.update_subject.next("Student Successfully Deleted");
          // reload after delete completes
          setTimeout(() =>{
            this.fetchAllStudents();
          }, this.timeoutLimit);

        }else{
          this.update_subject.next("Sorry could not delete the student please again later ");
        }
      },
      (error :HttpErrorResponse) =>{

        this.update_subject.next("Sorry we could not Delete at this momoent please try again later");
        console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
      }
      
      
      
      );
    }else{

      // yes i know this is lazy
      alert("Sorry could not delete please again later because user info is bad")
    }

    
    
  }

  updateStudentHelper(student){
    // setting the payload to update before routing
    this.sessionService.setStudentToUpdate(student);

    // now routing
    this.router.navigate(['/student-helper']);
  }


  fetchAllStudents(){
    this.bService.getAllStudents().subscribe((students ) =>{
      console.log("reload refresh")
      console.log(students)


      this.students =  students;

    });
  }

  onCreatestudent(){
    this.sessionService.setStudentToUpdate(new Student());

    this.router.navigate(['/student-helper']);
  }



}
