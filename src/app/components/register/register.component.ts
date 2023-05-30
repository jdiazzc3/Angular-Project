import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from 'firebase/app';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrarUsuario: FormGroup;


  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService, 
    private router: Router,
    private firestore:AngularFirestore) {
    this.registrarUsuario = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      photo: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  registrar() {
    const email = this.registrarUsuario.value.email
    const password = this.registrarUsuario.value.password
    const name = this.registrarUsuario.value.name
    const confirmPassword = this.registrarUsuario.value.confirmPassword
    const photo = this.registrarUsuario.value.photo

    if (password !== confirmPassword) {
      this.toastr.error("Passwords do not match. Please try again", 'Error');
      // muestra error, las contraseñas no coinciden
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    //verifica que la contraseña cumple con las políticas
    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || password.length < 8) {
      console.log("error contraseña no valida")
      this.toastr.error('Invalid password. Please try again.', 'Error');
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);

      // Guardar datos del usuario en Firestore
      this.firestore.collection('users').add({
        name: name,
        email: email,
        photoURL: photo,
        uid: user.user?.uid
      }).then(() => {
        this.toastr.success('User registered successfully!', 'Succes');
        this.registrarUsuario.reset();
        this.router.navigate(['/login']);
      }).catch((error) => {
        console.log(error);
        this.toastr.error('Error saving user data.', 'Error');
      });
    }).catch((error) => {
      console.log("error");
      this.toastr.error(this.firebaseError(error.code), 'Error');
      //muestra error, no es pudo iniciar sesión
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      let fileName = file.name;
      const maxLength = 9; // Longitud máxima permitida para el nombre del archivo
      if (fileName.length > maxLength) {
        // Si el nombre es demasiado largo, truncarlo y agregar puntos suspensivos
        fileName = fileName.substr(0, maxLength) + '...';
      }
      const fileNameElement = document.getElementById('file-name');
      if (fileNameElement) {
        fileNameElement.innerHTML = fileName;
      }
    }
  }

  firebaseError(code: string) {

    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address';
        break;
      case 'auth/email-already-in-use':
        return 'The email address is already in use.';
        break;
      case 'auth/weak-password':
        return 'The password must have at least 6 characters';
        break;
      default:
        return 'Unknown error';
    }
  }

}


