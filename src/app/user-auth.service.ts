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

  // // Function authenticates user
  // checkLogin(currentLoginData: loginData): any {

  //   // get all signups and check if the user info checks out
  //   this.signUpService.getAllSignUp().subscribe({
  //     next: (res) => {
  //       console.log('all signups loaded in checklogin');
  //       this.allSignUpData = res;

  //       let correctEmail = this.allSignUpData.find(signedUpUsers => signedUpUsers.email === currentLoginData.email);  
  //       let correctPassword = this.allSignUpData.find(signedUpUsers => signedUpUsers.password === currentLoginData.password);
        
  //       if(correctEmail && correctPassword) {
  //         return correctEmail.firstname;
  //       }
  //       else{
  //         return null;
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });  
  // }


  checkDuplicateEmail(currentSignUpData: signUpData) {
    // get all signups and check if the user info checks out
    this.signUpService.getAllSignUp().subscribe({
      next: (res) => {
        console.log('all signups loaded in checklogin');
        this.allSignUpData = res;
        let duplicateEmail = this.allSignUpData.find(signedUpUsers => currentSignUpData.email === currentSignUpData.email) !== undefined;
        return duplicateEmail;
      },
      error: (error) => {
        console.log(error);
      }
    }); 
  }


}
  // // Function to check if email or password during signup is duplicate
  // checkDuplicateEmailPhone(currentSignupData: signUpData): [boolean, boolean] {
  //   // get all signups and check if the user info checks out
  //   this.signUpService.getAllSignUp().subscribe({
  //     next: (res) => {
  //       console.log('all signups loaded in checkDuplicateEmailPhone');
  //       this.allSignUpData = res;

  //       let duplicateEmail = this.allSignUpData.find(res => res.email === currentSignupData.email) !== undefined;  
  //       let duplicatePhoneNumber = this.allSignUpData.find(res => res.phone === currentSignupData.phone) !== undefined;

  //       if(duplicateEmail) {
  //         if(duplicatePhoneNumber) {
  //           console.log('[true, true]');
  //           return ([true, true]);
  //         }
  //         else {
  //           console.log('[true, false]');
  //           return ([true, false]);
  //         }
  //       }
  //       else {
  //         if(duplicatePhoneNumber) {
  //           console.log('[false, true]');
  //           return ([false, true]);
  //         }
  //         else {
  //           console.log('[false, false]');
  //           return ([false, false]);
  //         }
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });  
  // }
