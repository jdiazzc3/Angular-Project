import { Component, HostListener, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { EventEmitter, Output } from '@angular/core';

interface SideNavToggle {
  collapsed: boolean;
  screenWidth: number;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  userName: string = '';
  userPhotoURL: string | undefined;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getUserName();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  getUserName() {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.userName = userInfo.name.split(' ')[0];
      this.userPhotoURL = userInfo.photoURL;
    } else {
      // Obtener el nombre y la foto del usuario desde Firestore y asignarlos a this.userName y this.userPhotoURL
      // ...
    }
  }
}
