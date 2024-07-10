import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Imports
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentInformationDashboardComponent } from './student-information-dashboard/student-information-dashboard.component';
import { CreateStudentProfileComponent } from './create-student-profile/create-student-profile.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},  // default routing to sign-up component
  {path: 'newsignup', component: SignupComponent, canActivate: [authGuard]},
  {path: 'editsignup/:id', component: SignupComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent, canActivate: [authGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'studentinfodashboard', component: StudentInformationDashboardComponent, canActivate: [authGuard]},
  {path: 'createstudentprofile', component: CreateStudentProfileComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
