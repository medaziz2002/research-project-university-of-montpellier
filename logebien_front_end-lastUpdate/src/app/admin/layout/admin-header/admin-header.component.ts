import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
 
  loggedUser: User = new User;
  token!:any;
  isloggedIn = false;

  
  
 constructor(public authService:AuthService,private router :Router) {}

 logout() {
  this.loggedUser = undefined!;
 
  this.token= undefined!;
  this.isloggedIn = false;
  localStorage.removeItem('jwt');
  this.router.navigate(['/home']);


  }

  
  async  ngOnInit() {
    await this.authService.setLoggedUser();
    this.loggedUser = this.authService.getLoggedUser();

  }


}
