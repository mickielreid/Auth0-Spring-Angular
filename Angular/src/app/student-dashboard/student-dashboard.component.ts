import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortEvent , compare } from '../shared/SortingTypesHolder';
import { Student } from '../classes/student';
import { SortableHeaderDirective } from '../shared/sortable-header.directive';
// import { HeaderComponent } from './header/header.component';

// import { HeaderComponent } from './resuable/header/header/header.component';


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  students: Student[];

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.data.subscribe((students:Student[] ) =>{
      console.log("in the student dashboard")
    
      console.log(students['data'])
      this.students =  students['data'];

    });



  }

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

}
