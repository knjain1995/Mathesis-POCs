import { Injectable } from '@angular/core';

// import service
import { SignUpService } from './sign-up.service';

// import models
import { signUpData } from './model/signupdata';
import { loginData } from './model/logindata';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService  {

  allSignUpData: signUpData[] = [];

  constructor(private signUpService: SignUpService) {}

  // Function authenticates user
  checkLogin(currentLoginData: loginData): Observable<any> {
    return new Observable(observer => {
      // get all signups and check if the user info checks out
      this.signUpService.getAllSignUp().subscribe({
        next: (res) => {
          console.log('all signups loaded in checklogin');
          this.allSignUpData = res;

          let correctEmail = this.allSignUpData.find(signedUpUsers => signedUpUsers.email === currentLoginData.email);  
          let correctPassword = this.allSignUpData.find(signedUpUsers => signedUpUsers.password === currentLoginData.password);
          
          if(correctEmail && correctPassword) {
            observer.next(correctEmail.firstname);
          }
          else {
            observer.next(null);
          }
          observer.complete();
        },
        error: (error) => {
          console.log(error);
          observer.error(error);
        }
      });
    });
        
  }


  // Function to check if email has already been used by another user to signup
  checkDuplicateEmail(currentSignUpData: signUpData, userId?: string): Observable<boolean> {
    // get all signups and check if the user info checks out
    return new Observable(observer => {
      this.signUpService.getAllSignUp().subscribe({
        next: (res) => {
          console.log('all signups loaded in checklogin');
          this.allSignUpData = res;
          let duplicateEmail = this.allSignUpData.find(signedUpUser =>
            signedUpUser.email === currentSignUpData.email && signedUpUser.id !== userId) !== undefined;
          observer.next(duplicateEmail);
        },
        error: (error) => {
          console.log(error);
          observer.error(error);
        }
      }); 
    });
  }

}