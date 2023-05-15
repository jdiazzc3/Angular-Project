import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:"register", component:RegisterComponent },
  { path:"verify", component:VerifyComponent },
  { path:"forgot-password", component:ForgotPassComponent },
  { path:"dashboard", component:SidenavComponent, canActivate: [AuthGuard] },
  { path:"*/", redirectTo:'login', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
