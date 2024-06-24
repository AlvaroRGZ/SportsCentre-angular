import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from '@angular/fire/auth';
import {firstValueFrom, Observable, of, switchMap, timer} from 'rxjs';
import 'firebase/compat/auth';
import {HttpClient} from "@angular/common/http";
import {UserAccount} from "../signup/userAccount.model";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private static BASE_URL: string = 'http://localhost:8080/users';
  constructor(private afAuth: Auth, private http: HttpClient, private router: Router) { }

  // Register a new user with email and password
  register(email: string, password: string, role: string): Promise<any> {  // Cambiar por UserCredential
    return createUserWithEmailAndPassword(this.afAuth, email, password)
      .then(() => {
        this.login(email, password).then(() => {
          this.getCurrentUser().subscribe((user: User | null) => {
            this.registerNewUserAsA(email, password, role).subscribe((user) => {});
            if (user) {
              updateProfile(user, { displayName: role })
            } else {
              console.log("Error while updating user role");
            }
          });
        })
    })
    .catch(error => {
      console.log("Error while registering new user: " + error)
    });
  }

  // Login with email and password
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.afAuth, email, password).then((result) => {
      this.startLogoutTimer();
      return result;
    });
  }

  private startLogoutTimer() {
    const logoutTime = 150000;
    timer(logoutTime).subscribe(() => {
      this.logout();
    });
  }

  // Logout the current user
  logout(): Promise<void> {
    return signOut(this.afAuth).then(r => {
      this.navigateHomeGivenUserRole();
    });
  }

  getCurrentUser(): Observable<User | null> {
    return authState(this.afAuth);
  }

  getCurrentRole(): Observable<string> {
    return this.getCurrentUser().pipe(
      switchMap(user => {
        if (user && user.displayName) {
          return of(user.displayName);
        } else {
          return of('user');
        }
      })
    );
  }

  registerNewUserAsA(email: string, password: string, role: string): Observable<User> {
    const user: UserAccount= {role: role, email: email, password: password, confirmPassword: password};
    console.log("HAGO LA LLAMADA A LA API");
    return this.http.post<User>(FirebaseAuthService.BASE_URL, user);
  }

  checkEmailExists(email: string) {
    console.log("Pregunto si existe" + email)
    return this.http.get<boolean>(`${FirebaseAuthService.BASE_URL}/existsByEmail?email=${email}`);
  }

  navigateHomeGivenUserRole() {
    this.getCurrentRole().subscribe((role) => {
      switch (role) {
        case 'admin':
          this.router.navigate(['/administration']);
          break;
        case 'client':
          this.router.navigate(['/clients']);
          break;
        default:
          this.router.navigate(['/home']);
          break;
      }
    });
  }

  // Reset password for the specified email
  //resetPassword(email: string): Promise<void> {
  //  return this.afAuth.sendPasswordResetEmail(email);
  //}

  // Update the user's password
  //updatePassword(newPassword: string): Promise<void> {
  //  return this.afAuth.currentUser.then(user => user?.updatePassword(newPassword));
  //}

  // Delete the current user's account
  //deleteAccount(): Promise<void> {
  //  return this.afAuth.currentUser.then(user => user?.delete());
  //}
}
