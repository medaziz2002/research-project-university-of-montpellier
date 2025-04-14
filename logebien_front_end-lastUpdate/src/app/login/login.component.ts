import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../models/User.model';
import Swal from 'sweetalert2';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user=new User();
  err=0;
  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute
    ,private tokenService:AuthService,private userService:UserService
   
    ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()!=null) {
      this.router.navigate(['/dashboard']);
    }

  }

  async onLoggedin() {
    if (!this.user.email?.trim() || !this.user.password?.trim()) {
      Swal.fire({
        title: 'Champs requis',
        text: "Veuillez remplir tous les champs (email et mot de passe).",
        icon: 'warning',
        timer: 4000,
        showCancelButton: true,
        showConfirmButton: true
      });
      return;
    }
    
    try {
      console.log("je suis la")
      const data = await this.authService.login(this.user).toPromise();
      const jwToken = data!.headers.get('Authorization')!;
      console.log(jwToken);
      this.tokenService.saveToken(jwToken);
      const email = this.tokenService.decodeJWT(jwToken).sub;
      console.log(email);
  
      const passwordIsValid = await this.userService.checkIfPasswordIsValid(email).toPromise();
      
      if (passwordIsValid) {
        this.authService.setIsPasswordExpired(false);
        await this.authService.setLoggedUser();
        console.log(this.authService.loggedUser);
  
        if (!this.authService.loggedUser.etat) {
          Swal.fire({
            text: "Votre compte est désactivé veuillez contacter un administrateur",
            icon: "error",
            timer: 5000
          });
        } else {

          if (this.authService.loggedUser.role=="SUPERADMIN") {
            this.router.navigate(['/admin/dashboard']);
          }
          else
          {
            this.router.navigate(['/home']);
          }

    
        }
      } else {
        this.authService.setIsPasswordExpired(true);
        Swal.fire({
          title: 'Votre mot de passe est expiré',
          text: "Vous allez être redirigé vers la page de changement de mot de passe",
          icon: 'warning',
          timer: 5000,
          showCancelButton: false,
          showConfirmButton: false
        });
  
        const generatedToken = await this.userService.generateToken(email).toPromise();
  
        localStorage.removeItem('jwt');
        this.router.navigate(['/resetPass'], { queryParams: { token: generatedToken } });
      }
    } catch (error) {
      Swal.fire({
        title: 'Erreur de connexion',
        text: "Email ou mot de passe incorrect.",
        icon: 'error',
        timer: 4000,
        showCancelButton: true,
        showConfirmButton: true
      });
    }
  }
  



  
}

