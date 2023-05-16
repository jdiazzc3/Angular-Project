import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private firestore: AngularFirestore
  ) {
    this.users$ = this.firestore.collection('users').valueChanges();
  }

  public users$: Observable<any[]>;

  singOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {
   
  }
}