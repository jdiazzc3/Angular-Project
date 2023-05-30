import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
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

  deleteUser(user: any) {
    const uid = user.uid;
  
    if (uid) {
      // Obtener el usuario actualmente autenticado
      this.afAuth.authState.subscribe(currentUser => {
        if (currentUser && currentUser.uid === uid) {
          this.toastr.error("You can't delete your own account", 'Error');
        } else {
          this.firestore.collection('users', ref => ref.where('uid', '==', uid)).get()
            .subscribe(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete()
                  .then(() => {
                    console.log('Usuario eliminado correctamente');
                  })
                  .catch((error) => {
                    console.error('Error al eliminar el usuario:', error);
                  });
              });
            });
        }
      });
    } else {
      console.error('El usuario no tiene un UID válido');
    }
  }
  
}