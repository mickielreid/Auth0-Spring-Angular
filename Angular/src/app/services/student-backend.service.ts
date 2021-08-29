import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../classes/student';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentBackendService {

  readonly url = environment.backendUrl;


  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student>{

    let students = this.http.get<Student>("http://localhost:8080/api/v1/student")

    
    students.pipe(user => {

      console.log("retuned user")
      console.log(user)
      return user;

    });

    return students
  }

  deleteStudent(id:number){
    // verify the api endpoint
    //and what it returns 
   let res = this.http.delete(`${this.url}?id=${id}`, {observe: 'response'})
      .pipe(map(response => {
        console.log("http res")
        console.log(response.status)

        if(response.status == 200){
          return true;
        }else{
          return false;
        }

      }));

    return res;  


    
  }


  updateStudent(student:Student){
  
    // ,{headers : head}
    let response= this.http.patch(this.url,student)

    return response
  }

  createStudent(student:Student){
    return this.http.post(this.url, student);
  }


}
