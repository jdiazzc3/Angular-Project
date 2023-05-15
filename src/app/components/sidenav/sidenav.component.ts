import { Component } from '@angular/core';
import { navbarData } from './nav-data';
import { EventEmitter, Output } from '@angular/core';

interface SideNavToggle {
  collapsed: boolean;
  screenWidth:number;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  loggedIn: boolean;

  constructor() {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter(); 
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  toggleCollapse():void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav():void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
