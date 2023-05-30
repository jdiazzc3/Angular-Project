import { Component, HostListener, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

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
    const userInfo = localStorage.getItem('userInfo');
    console.log('userInfo:', userInfo);
    if (userInfo) {
      const user = JSON.parse(userInfo);
      this.userPhotoURL = user.photoURL;
      this.userName = this.getFirstTwoNames(user.displayName || user.name);
    }    
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  getFirstTwoNames(fullName: string): string {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return names[0] + ' ' + names[1];
    } else {
      return fullName;
    }
  }
  
  
  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('userInfo');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigateByUrl('/login');
  }

}
