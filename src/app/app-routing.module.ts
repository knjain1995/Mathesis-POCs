import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Imports
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { StudentInformationFormComponent } from './student-information-form/student-information-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},  // default routing to sign-up component
  {path: 'newsignup', component: SignupComponent, canActivate: [authGuard]},
  {path: 'editsignup/:id', component: SignupComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent, canActivate: [authGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'studentinformationform', component: StudentInformationFormComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
