import { Injectable } from '@angular/core';

// Model imports
import { signUpData } from './signup/model/signupdata';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  // receive sign up data and display in console
  signup(signUpData: signUpData): void {
    console.log('Sign Up Successful');
    console.log("First Name: ", signUpData.firstname);
    console.log("Last Name: ", signUpData.lastname);
    console.log("Email: ", signUpData.email);
    console.log("Phone Number: ", signUpData.phone);
    console.log("Password: ", signUpData.password);   
  }
}
