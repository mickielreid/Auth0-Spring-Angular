import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService  } from '@auth0/auth0-angular';
import { StudentBackendService } from '../services/student-backend.service';

@Component({
  selector: 'app-choose-dashboard',
  templateUrl: './choose-dashboard.component.html',
  styleUrls: ['./choose-dashboard.component.css']
})
export class ChooseDashboardComponent implements OnInit {

  constructor(private authService: AuthService,private backend: StudentBackendService,private router :Router) { }

  ngOnInit(): void {
    console.log("in the choose the dashboad compont")

  
  }

 

}
