import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor() { }

  ngOnInit() {
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
