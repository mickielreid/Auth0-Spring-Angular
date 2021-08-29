import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() logout: boolean = true;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    console.log("log out is "+ this.logout)
  }

  onLogout(){
    this.authService.logout();

  }

}
