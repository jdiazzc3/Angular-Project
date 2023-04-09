import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router) {
        this.loginUsuario = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
    }
    ngOnInit(): void {}

    login() {
      const email = this.loginUsuario.value.email;
      const password = this.loginUsuario.value.password;

      this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
        this.toastr.success('User logged in successfully!', 'Success');
        this.loginUsuario.reset();
        this.router.navigate(['/dashboard']);
      }).catch(()=>{
        this.toastr.error('Invalid email or password. Please try again.', 'Error');
      })
    }
}
