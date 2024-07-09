import { Injectable } from '@angular/core';

// import service
import { SignUpService } from './sign-up.service';

// import models
import { signUpData } from './model/signupdata';
import { loginData } from './model/logindata';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService  {

  allSignUpData: signUpData[] = [];

  constructor(private signUpService: SignUpService) {
    
    this.signUpService.getAllSignUp().subscribe({
      next: (res) => {
        this.allSignUpData = res;
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  checkLogin(currentLoginData: loginData): any {
    console.log(this.allSignUpData);
    console.log(currentLoginData);
       
    let correctEmail = this.allSignUpData.find(signedUpUsers => signedUpUsers.email === currentLoginData.email);  
    let correctPassword = this.allSignUpData.find(signedUpUsers => signedUpUsers.password === currentLoginData.password);
    console.log(correctEmail);
    console.log(correctPassword);
    
    if(correctEmail && correctPassword) {
      return correctEmail.firstname;
    }
    else{
      return null;
    }
  }
}
