import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { MessageService } from 'primeng/api';
import { GoogleAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';
import { TwitterAuthProvider } from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private messageServices: MessageService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> =
      this.afs.doc('user/${user.uid');
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async loginWithGoogle() {
    try {
      const user = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      if (user) {
        this.messageServices.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bienvenido',
        });
        this.router.navigate(['home']);
      }
    } catch (error) {
      this.messageServices.add({
        severity: 'error',
        summary: 'Error',
      });
    }
  }

  async loginWithGithub() {
    try {
      const provider = new GithubAuthProvider();
      const user = await this.afAuth.signInWithPopup(provider);
      if (user) {
        this.messageServices.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bienvenido',
        });
        this.router.navigate(['home']);
      }
    } catch (error) {
      this.messageServices.add({
        severity: 'error',
        summary: 'Error',
      });
    }
  }

  async loginWithTwitter() {
    try {
      const user = await this.afAuth.signInWithPopup(new TwitterAuthProvider());
      if (user) {
        this.messageServices.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bienvenido',
        });
        this.router.navigate(['home']);
      }
    } catch (error) {
      this.messageServices.add({
        severity: 'error',
        summary: 'Error',
      });
    }
  }

  async login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.messageServices.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Bienvenido',
            });
            this.router.navigate(['home']);
          }
        });
      })
      .catch(() => {
        this.messageServices.add({
          severity: 'error',
          summary: 'Error',
        });
      });
  }

  async register(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user?.sendEmailVerification();
        this.setUserData(result.user);
        this.messageServices.add({
          severity: 'success',
          summary: 'Te has registrado',
          detail: 'Bienvenido'
        });
        this.router.navigate(['home']);
      })
      .catch(() => {
        this.messageServices.add({
          severity: 'error',
          summary: 'Error',
        });
      });
  }

  async logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
