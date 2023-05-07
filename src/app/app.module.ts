import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { MessagesModule } from 'primeng/messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideAuth,getAuth } from '@angular/fire/auth';



//componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AppComponent } from './app.component';
import { environment } from './environments/environment';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RecipesComponent } from './recipes/recipes.component';

@NgModule({
    declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    VerifyComponent,
    ForgotPassComponent,
    SpinnerComponent,
    BodyComponent,
    SidenavComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MessagesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    provideAuth(()=>getAuth()),
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
