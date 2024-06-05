import { Injectable } from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  constructor(private afAuth: Auth) { }

  // Register a new user with email and password
  register(email: string, password: string): Promise<any> {  // Cambiar por UserCredential
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  // Login with email and password
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  // Logout the current user
  logout(): Promise<void> {
    return signOut(this.afAuth);
  }

  // Get the currently authenticated user
  getCurrentUser(): Observable<any | null> {
    return authState(this.afAuth);
  }

  // Reset password for the specified email
  //resetPassword(email: string): Promise<void> {
  //  return this.afAuth.sendPasswordResetEmail(email);
  //}



  //updateDisplayName(displayName: string): Promise<void> {
  //  return this.currentUser.then(user => user?.updateProfile({ displayName }));
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
