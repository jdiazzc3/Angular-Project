import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registrarUsuario: FormGroup;

  constructor(private fb: FormBuilder, 
    private afAuth: AngularFireAuth) {
    this.registrarUsuario = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
      photo:['']
    })
   }

  ngOnInit(): void {
  }

  registrar(){
    const email = this.registrarUsuario.value.email
    const password = this.registrarUsuario.value.password
    const name = this.registrarUsuario.value.name
    const confirmPassword = this.registrarUsuario.value.confirmPassword
    const photo = this.registrarUsuario.value.photo
  
    if (password !== confirmPassword) {
      // mostrar error, las contraseñas no coinciden
      return;
    }
  
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Actualizar el perfil del usuario en Firebase Auth
        userCredential.user?.updateProfile({
          displayName: name,
          photoURL: photo
        });
        // Mostrar mensaje de éxito
      })
      .catch((error) => {
        // Mostrar mensaje de error
      });
  }
  
}
