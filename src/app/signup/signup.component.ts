import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserAccount} from "./userAccount.model";
import {FirebaseAuthService} from "../authentication/firebase-auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  protected userAccount: UserAccount = { } as UserAccount;
  constructor(private authService: FirebaseAuthService) { }
  onSubmit() {
    console.log(this.userAccount);
    if (this.userAccount.password !== this.userAccount.confirmPassword) {
      alert('Las contraseñas no coinciden.');
    } else {
      this.authService.register(this.userAccount.email, this.userAccount.password, this.userAccount.role).then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido registrada correctamente.',
          confirmButtonText: 'OK'
        }).then((result) => {
          // Handle the OK button click if needed
        });
    }).catch((error) => {
      // Handle registration errors if needed
      console.error('Error registering user:', error);
    });
    }
  }
}
