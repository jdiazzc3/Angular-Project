import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { signInWithPopup, GoogleAuthProvider, Auth } from '@angular/fire/auth'
import { FacebookAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from 'firebase/auth';
import { TwitterAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { AuthGuard } from 'src/app/auth.guard';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginUsuario: FormGroup;
  private googleProvider = new GoogleAuthProvider();
  private facebookProvider = new FacebookAuthProvider();
  private githubProvider = new GithubAuthProvider();
  private twitterProvider = new TwitterAuthProvider();
  userState: any;


  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    localStorage.setItem('loggedIn', 'false');
  }
 
  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.toastr.success('User logged in successfully!', 'Success');
      this.loginUsuario.reset();
      localStorage.setItem('loggedIn', 'true');
      this.saveUserInfo('Email', user.user);
      this.router.navigate(['/home']);
    }).catch(()=>{
      this.toastr.error('Invalid email or password. Please try again.', 'Error');
    });
  }

  loginGoogle() {
    this.afAuth.signInWithPopup(this.googleProvider).then((result) => {
      this.toastr.success('User logged in successfully!', 'Success');
      const user = result.user;
      this.saveUserInfo('Google', user);
      this.loginUsuario.reset();
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/home']);
    }).catch(()=>{
      this.toastr.error('Invalid email or password. Please try again.', 'Error');
    });
  }
   
  loginWithFacebook() {
    this.afAuth.signInWithPopup(this.facebookProvider).then((result) => {
      this.toastr.success('User logged in successfully!', 'Success');
      const user = result.user;
      this.saveUserInfo('Facebook', user);
      this.loginUsuario.reset();
      this.router.navigate(['/home']);
    }).catch(()=>{
      this.toastr.error('Invalid email or password. Please try again.', 'Error');
    });
  }
  
  loginWithGithub() {
    this.afAuth.signInWithPopup(this.githubProvider).then((result) => {
      this.toastr.success('User logged in successfully!', 'Success');
      const user = result.user;
      this.saveUserInfo('GitHub', user);
      this.loginUsuario.reset();
      this.router.navigate(['/home']);
    }).catch(()=>{
      this.toastr.error('Invalid email or password. Please try again.', 'Error');
    });
  }

  loginWithTwitter() {
    this.afAuth.signInWithPopup(this.twitterProvider).then((result) => {
      this.toastr.success('User logged in successfully!', 'Success');
      const user = result.user;
      this.saveUserInfo('Twitter', user);
      this.loginUsuario.reset();
      this.router.navigate(['/home']);
    }).catch(()=>{
      this.toastr.error('Invalid email or password. Please try again.', 'Error');
    });
  }

  logout() {
    this.afAuth.signOut();
    localStorage.setItem('loggedIn', 'false');
    this.router.navigate(['/login']);
  }

  saveUserInfo(provider: string, user: any) {
    const userRef = this.firestore.collection('users').doc(user.uid);
  
    userRef.get().toPromise().then((docSnapshot) => {
      if (docSnapshot && docSnapshot.exists) {
        console.log('User already exists in Firestore');
      } else {
        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
  
        // Verificar si el proveedor es "Email"
        if (provider === 'Email') {
          userData.email = this.loginUsuario.value.email; // Obtener el correo electrónico del formulario de inicio de sesión
        }
  
        userRef.set(userData)
          .then(() => {
            console.log('User info saved successfully');
  
            // Guardar la información del usuario en el localStorage
            localStorage.setItem('userInfo', JSON.stringify(userData));
          })
          .catch((error) => {
            console.error('Error saving user info:', error);
          });
      }
    }).catch((error) => {
      console.error('Error checking user existence:', error);
    });
  }
    
  
  getUserInfoFromLocalStorage() {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      return userInfo;
    } else {
      return null;
    }
  }
}
