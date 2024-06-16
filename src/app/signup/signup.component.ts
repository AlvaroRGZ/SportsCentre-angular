import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserAccount} from "./userAccount.model";
import {FirebaseAuthService} from "../authentication/firebase-auth.service";
import Swal from 'sweetalert2';
import {RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgClass,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  emailExists: boolean = false;

  constructor(private fb: FormBuilder, private authService: FirebaseAuthService) {
    this.signupForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onEmailChange() {
    const emailControl = this.signupForm.get('email');
    if (emailControl?.valid) {
      this.authService.checkEmailExists(emailControl.value).subscribe(exists => {
        this.emailExists = exists;
        if (exists) {
          emailControl.setErrors({ emailExists: true });
        } else {
          emailControl.setErrors(null);
        }
      });
    }
  }

  onSubmit() {
    if (this.signupForm.invalid || this.emailExists) {
      return;
    }

    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.authService.register(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.role).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido registrada correctamente.',
        confirmButtonText: 'OK'
      });
    }).catch((error) => {
      console.error('Error registering user:', error);
      alert('Error registrando el usuario.');
    });
  }
}
