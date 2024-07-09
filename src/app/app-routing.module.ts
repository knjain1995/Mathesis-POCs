import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Imports
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentInformationDashboardComponent } from './student-information-dashboard/student-information-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/newsignup', pathMatch: 'full'},  // default routing to sign-up component
  {path: 'newsignup', component: SignupComponent},
  {path: 'editsignup/:id', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'studentinfodashboard', component: StudentInformationDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
