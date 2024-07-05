import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Imports
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', component: SignupComponent}  // default routing to sign-up component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
