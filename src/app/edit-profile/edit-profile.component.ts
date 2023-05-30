import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {};

  ngOnInit() {
    // Obtener el objeto "userInfo" del Local Storage
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      // Asignar los valores del usuario al objeto "user" del componente
      this.user = JSON.parse(userInfo);
    }
  }

  saveChanges() {
    // Lógica para guardar los cambios del perfil
  }
}
