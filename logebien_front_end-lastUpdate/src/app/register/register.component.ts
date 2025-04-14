import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  user=new User();
  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router :Router) {}

  ngOnInit(): void {
    // Initialize the form with FormBuilder
    this.registrationForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register(): void {
    if (this.registrationForm.valid) {
        this.user = this.registrationForm.value;

      this.authService.register(this.user).subscribe(
        (response) => {
          console.log('Registration successful', response);
          Swal.fire({
            icon: 'success',
            title: 'Inscription avec succés',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
          if (error.error.error=="email exist") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "un compte avec cet email existe déja",
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'veuillez verifier vos informations',
            });
          }
        }
      );
    }
  }

  google(): void {
    console.log('google');
    this.authService.getgoogle();
  }
}