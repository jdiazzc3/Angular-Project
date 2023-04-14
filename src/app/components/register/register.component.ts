import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from 'firebase/app';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrarUsuario: FormGroup;


  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router,
    ) {
    this.registrarUsuario = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      photo: ['']
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
      // mostrar error, las contraseñas no coinciden
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || password.length < 8) {
      console.log("error contraseña no valida")
      this.toastr.error('Invalid password. Please try again.', 'Error');
      // mostrar error, la contraseña no cumple con las políticas requeridas
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
      this.toastr.success('User registered successfully!', 'Succes');
      this.registrarUsuario.reset();
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log("error");
      this.toastr.error(this.firebaseError(error.code), 'Error');

      // Mostrar mensaje de error
    });
  }

  //guardar datos en la base de datos
  // guardarDatos() {
  //   const email = this.registrarUsuario.value.email
  //   const password = this.registrarUsuario.value.password
  //   const name = this.registrarUsuario.value.name
  //   const confirmPassword = this.registrarUsuario.value.confirmPassword
  //   const photo = this.registrarUsuario.value.photo

  //   this.firestore.collection('users').add({
  //     name: name,
  //     email: email,
  //     password: password,
  //     confirmPassword: confirmPassword,
  //     photo: photo
  //   });
  // }









  firebaseError(code: string) {

    switch (code) {
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido';
        break;
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso';
        break;
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
        break;
      default:
        return 'Error desconocido';
    }
  }

}
