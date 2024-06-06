import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from "@angular/forms";
import { FirebaseAuthService } from "../authentication/firebase-auth.service";
import {UserAccount} from "../signup/userAccount.model";
import { UserCredential } from '@firebase/auth-types';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  protected userAccount: UserAccount = { } as UserAccount;
  constructor(private authService: FirebaseAuthService,
              private router: Router) { }

  onSubmit() {
    this.authService.login(this.userAccount.email, this.userAccount.password).then((user: UserCredential) => {
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Has iniciado sesión correctamente. Eres' + user.user?.displayName,
        confirmButtonText: 'OK'
      }).then((result) => {
        this.router.navigate(['/notices'])
      });
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo iniciar sesión. Por favor, verifica tus credenciales.',
        confirmButtonText: 'OK'
      });
      console.error('Error logging in:', error);
    });
  }
}
