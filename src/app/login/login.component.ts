import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services Import
import { SignUpService } from '../sign-up.service';
import { UtilityService } from '../utility.service';
import { UserAuthService } from '../user-auth.service';

// Models import
import { signUpData } from '../model/signupdata';
import { loginData } from '../model/logindata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [SignUpService, UtilityService]  // providing sign-up service but only to sign-up component
})

export class LoginComponent implements OnInit {

  // implement the hide button for password form field
  hide = signal(true);  // CHECK WHAT THIS IS!!
  clickPasswordToggle(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginForm: FormGroup = new FormGroup({});  // initialize a formgroup acting as our login form 
  allSignUpData: signUpData[] = [];

  constructor(
    private formBuilder: FormBuilder,  //inject formbuilder to create forms
    private signUpService: SignUpService, //inject signup service to recieve signup information
    private utilityService: UtilityService, //inject utility service to show snackbar messages
    private userAuth: UserAuthService,  //inject user authentication service to show if user loggen in is correct
    private router: Router
  ) {
    this.signUpService.getAllSignUp
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

   // Function to be executed with Submit button is clicked 
   onSubmit(): void {
    
    if(this.loginForm.valid) { // check if signup form is valid
      
      let userData = this.loginForm.value; //  initialize a variable of type signUpData (interface) to have the input field values 
      let loggedInUser = this.userAuth.checkLogin(userData);

      if( loggedInUser !== null) {
          this.utilityService.showRegistrationMessage("Login Succesful! Welcome " + loggedInUser);  // if succesful login
          this.router.navigate(['/dashboard/']);
      }
      else {
        this.utilityService.showRegistrationMessage("Could Not Find User");
      }
      // console.log(userData);

      
      

      // // call addSignUp function in sign-up service and pass the userdata
      // let signUpCheck = this.signUpService.addSignUp().subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     this.utilityService.showRegistrationMessage("Registration Succesful! Welcome " + res.firstname);  // if succesful login
      //     this.router.navigate(['/signupdetails/'+res.id]);
      //   },
      //   error: (error) => {
      //     console.log(error);
      //     this.utilityService.showRegistrationMessage("Registration Failed: " + error); // if login not succesful
      //   }
      // });      
   
    }

    else {
      console.error('Sign Up Error'); // this shouldn't run
    }
  } 

}
