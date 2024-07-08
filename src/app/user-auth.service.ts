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
    
    
    let correctLogin = this.allSignUpData.find(signedUpUsers => signedUpUsers.email === currentLoginData.email);  
    console.log(correctLogin);
      
    if(correctLogin) {
      return correctLogin.firstname;
    }
    else{
      return null;
    }
  }
}
