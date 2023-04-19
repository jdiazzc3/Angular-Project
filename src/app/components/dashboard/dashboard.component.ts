import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  singOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  ngAfterViewInit() {
    this.renderer.setStyle(document.body, 'background-image', 'none');
    const body = document.querySelector("body");
    const modeToggle = body ? body.querySelector(".mode-toggle") : null;
    const sidebar = body ? body.querySelector("nav") : null;
    const sidebarToggle = body ? body.querySelector(".sidebar-toggle") : null;

    let getMode = localStorage.getItem("mode");
    if(getMode && getMode ==="dark"){
        body?.classList.toggle("dark");
    }

    let getStatus = localStorage.getItem("status");
    if(getStatus && getStatus ==="close"){
        sidebar?.classList.toggle("close");
    }

    modeToggle?.addEventListener("click", () =>{
        body?.classList.toggle("dark");
        if(body?.classList.contains("dark")){
            localStorage.setItem("mode", "dark");
        }else{
            localStorage.setItem("mode", "light");
        }
    });

    sidebarToggle?.addEventListener("click", () => {
        sidebar?.classList.toggle("close");
        if(sidebar?.classList.contains("close")){
            localStorage.setItem("status", "close");
        }else{
            localStorage.setItem("status", "open");
        }
    });
  }
}
