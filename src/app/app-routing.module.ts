import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './main/main.component';
import { BodyComponent } from './body/body.component';
import { RecipesComponent } from './recipes/recipes.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:"register", component:RegisterComponent },
  { path:"verify", component:VerifyComponent },
  { path:"forgot-password", component:ForgotPassComponent },
  { path:"home", component:MainComponent, canActivate: [AuthGuard], children:[
    { path:"dashboard", component:DashboardComponent },
    { path:"sidenav", component:SidenavComponent },
    { path:"body", component:BodyComponent},
    { path:"recipes", component:RecipesComponent},
    { path:"edit-profile", component:EditProfileComponent}
    ,{ path:"**", redirectTo:'dashboard', pathMatch:'full' }
  ]}
  ,{ path:"*/", redirectTo:'login', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
