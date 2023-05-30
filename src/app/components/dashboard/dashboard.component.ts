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

  user: any;

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
      // Obtiene el usuario actualmente autenticado
      this.afAuth.authState.subscribe(currentUser => {
        if (currentUser && currentUser.uid === uid) {
          this.toastr.error("You can't delete your own account", 'Error');
        } else {
          this.firestore.collection('users', ref => ref.where('uid', '==', uid)).get()
            .subscribe(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete()
                  .then(() => {
                    this.toastr.success('User deleted successfully', 'Success');
                  })
                  .catch((error) => {
+                    this.toastr.error('An error occurred while deleting the user', 'Error');
                  });
              });
            });
        }
      });
    } else {
      console.error('El usuario no tiene un UID válido');
    }
  }

  openModal(user: any) {
    this.user = user;
    const modal = document.getElementById('modal') as HTMLElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const photoURLInput = document.getElementById('photoURL') as HTMLInputElement;
  
    // Asignar los datos del usuario a los inputs correspondientes
    nameInput.value = user.name || '';
    photoURLInput.value = user.photoURL || '';
  
    // Mostrar el modal
    modal.style.display = 'block';
  }

  close() {
    const modal = document.getElementById('modal') as HTMLElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const photoURLInput = document.getElementById('photoURL') as HTMLInputElement;
  
    // Restablecer los valores de los inputs del modal
    nameInput.value = '';
    photoURLInput.value = '';
  
    // Ocultar el modal
    modal.style.display = 'none';
  }
  
  edit() {
    if (this.user) {
      const newName = document.getElementById('name') as HTMLInputElement;
      const newPhotoURL = document.getElementById('photoURL') as HTMLInputElement;
  
      if (newName && newPhotoURL) {
        const updatedUser = { ...this.user }; // Crear una copia del usuario para evitar modificar directamente la referencia original
        updatedUser.name = newName.value;
        updatedUser.photoURL = newPhotoURL.value;
  
        // Realizar la actualización del usuario en Firestore
        this.firestore.collection('users').doc(this.user.uid).update(updatedUser)
          .then(() => {
            // Éxito en la actualización
            this.toastr.success('User updated successfully', 'Success');
            this.close();
          })
          .catch((error) => {
            // Error en la actualización
            console.error('Error updating user:', error);
            this.toastr.error('An error occurred while updating the user', 'Error');
          });
      }
    }
  }
}