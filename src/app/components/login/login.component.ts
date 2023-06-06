import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { signInWithPopup, GoogleAuthProvider, Auth } from '@angular/fire/auth'
import { FacebookAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from 'firebase/auth';
import { TwitterAuthProvider } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { UserData } from './interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  private googleProvider = new GoogleAuthProvider();
  private facebookProvider = new FacebookAuthProvider();
  private githubProvider = new GithubAuthProvider();
  private twitterProvider = new TwitterAuthProvider();
  private user: any;

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
  
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
  
        // Buscar el usuario actual en Firestore
        this.firestore.collection('users', ref => ref.where('uid', '==', currentUser?.uid)).get()
          .subscribe(querySnapshot => {
            if (querySnapshot.size > 0) {
              const userData = querySnapshot.docs[0].data();
              console.log('Usuario encontrado:', userData);
  
              // Guardar la información del usuario en el local storage
              localStorage.setItem('userInfo', JSON.stringify(userData));
              this.handleLoginSuccess(currentUser);
            } else {
              // Si no se encontró el usuario en Firestore, mostrar un error
              this.toastr.error('User not found in database.', 'Error');
            }
          });
      })
      .catch(() => {
        this.toastr.error('Invalid email or password. Please try again.', 'Error');
      });
  }
  
      
  loginGoogle() {
    this.afAuth.signInWithPopup(this.googleProvider)
      .then((result) => {
        this.handleExternalLogin(result);
      })
      .catch(() => {
        this.toastr.error('Invalid email or password. Please try again.', 'Error');
      });
  }

  loginWithFacebook() {
    this.afAuth.signInWithPopup(this.facebookProvider)
      .then((result) => {
        this.handleExternalLogin(result);
      })
      .catch(() => {
        this.toastr.error('Invalid email or password. Please try again.', 'Error');
      });
  }

  loginWithGithub() {
    this.afAuth.signInWithPopup(this.githubProvider)
      .then((result) => {
        this.handleExternalLogin(result);
      })
      .catch(() => {
        this.toastr.error('Invalid email or password. Please try again.', 'Error');
      });
  }

  loginWithTwitter() {
    this.afAuth.signInWithPopup(this.twitterProvider)
      .then((result) => {
        this.handleExternalLogin(result);
      })
      .catch(() => {
        this.toastr.error('Invalid email or password. Please try again.', 'Error');
      });
  }

  private handleExternalLogin(result: any) {
    this.user = result.user;
    this.loginUsuario.reset();
    localStorage.setItem('loggedIn', 'true');

    // Verificar si el usuario ya existe en la colección 'users'
    this.firestore.collection('users').doc(this.user.uid).get()
      .subscribe((snapshot) => {
        if (snapshot.exists) {
          // El usuario ya ha sido guardado, no es necesario hacer nada adicional
          this.saveUserInfo();
          this.router.navigate(['/home']);
        } else {
          // El usuario no existe en la colección 'users', guardar sus datos
          const userData: UserData = {
            name: this.user.displayName || '',
            email: this.user.email || '',
            photoURL: this.user.photoURL || '',
            uid: this.user.uid || '',
          };
          this.firestore.collection('users').doc(this.user.uid).set(userData)
            .then(() => {
              this.saveUserInfo();
              this.router.navigate(['/home']);
            })
            .catch((error) => {
              console.error('Error saving user data:', error);
              this.router.navigate(['/home']);
            });
        }
      });
  }

  private handleLoginSuccess(user: any) {
    this.toastr.success('User logged in successfully!', 'Success');
    this.loginUsuario.reset();
    localStorage.setItem('loggedIn', 'true');
    
    // Guardar la información del usuario en el localStorage solo si se inicia sesión con correo y contraseña
    if (user && user.providerData && user.providerData.length === 0) {
      const userData: UserData = {
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        uid: user.uid || '',
      };
      localStorage.setItem('userInfo', JSON.stringify(userData));
    }
    
    this.router.navigate(['/home']);
  }
  

  private saveUserInfo() {
    localStorage.setItem('userInfo', JSON.stringify(this.user));
  }
}
