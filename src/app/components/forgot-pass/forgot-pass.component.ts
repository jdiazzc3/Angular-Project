import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit{
  recuperarUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.recuperarUsuario = this.fb.group({
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  recuperar() {
    const email = this.recuperarUsuario.value.email;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.toastr.success('Email sent successfully!', 'Success');
      this.recuperarUsuario.reset();
      this.router.navigate(['/login']);
    }).catch(() => {
      this.toastr.error('Invalid email. Please try again.', 'Error');
    })
  }
}
