import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
   const loggedIn = localStorage.getItem('loggedIn');
   
   if(loggedIn=='true'){
      return true;
   }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
