import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Model imports
import { signUpData } from './model/signupdata';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private httpClient: HttpClient, // inject HTTP client to make http requests to json server
  ) { }

  // URL to JSON server
  serverURL = 'http://localhost:3000';

  // allSignUpData: signUpData[] = []; 

  // Make HTTP post request to json server and return an observable
  addSignUp(signUpData: signUpData): Observable<any> {
    return this.httpClient.post(this.serverURL+'/signUpData', signUpData);
  }

  // Get all signup information from JSON server
  getAllSignUp(): Observable<signUpData[]> {
    return this.httpClient.get<signUpData[]>(this.serverURL+'/signUpData');
  }

}


    // addSignUp(signUpData: signUpData): void {

    //   this.httpClient.post(this.serverURL+'/signUpData', signUpData).subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.utilityService.showRegistrationMessage("Registration Succesful! Welcome " + signUpData.firstname);
    //     },
    //     error: (error) => {
    //       console.log(error);
    //       this.utilityService.showRegistrationMessage("Registration Failed: " + error);
    //     }
    //   });
    // }

    // console.log('Sign Up Successful');
    // console.log("First Name: ", signUpData.firstname);
    // console.log("Last Name: ", signUpData.lastname);
    // console.log("Email: ", signUpData.email);
    // console.log("Phone Number: ", signUpData.phone);
    // console.log("Date of Birth: ", signUpData.dateofbirth);
    // console.log("Password: ", signUpData.password);
    // console.log("Signed up for newsletter: ", signUpData.newsletterintent);
       