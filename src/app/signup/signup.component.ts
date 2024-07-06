import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

// Services Import
import { SignUpService } from '../sign-up.service';

// Model import
import { signUpData } from './model/signupdata';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [SignUpService, UtilityService, provideNativeDateAdapter()]  // providing sign-up service but only to sign-up component
})

export class SignupComponent implements OnInit {

  // implement the hide button for password form field
  hide = signal(true);  // CHECK WHAT THIS IS!!
  clickPasswordToggle(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // set max date for date selection to be 1 day before current day
  readonly currentDate = new Date();
  readonly maxDate = new Date(this.currentDate.getTime() - (24 * 60 * 60 * 1000));    

  signUpForm: FormGroup = new FormGroup({});  // initialize a formgroup acting as our sign-up form 

  constructor(
    private formBuilder: FormBuilder,  //inject formbuilder to create forms
    private signUpService: SignUpService, //inject signup service to recieve signup information
    private utilityService: UtilityService //inject utility service to show snackbar messages
  ) {}

  // initializing form in the Oninit lifecycle hook
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({  // Setting up individual form controls and validations
      firstname: ['', Validators.required], 
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dateofbirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      newsletterintent: [false]   
    });  
  }

  // Function to be executed with Submit button is clicked 
  onSubmit(): void {
    if(this.signUpForm.valid) { // check if signup form is valid
      
      this.utilityService.showRegistrationSuccessMessage("Registration Succesful! Welcome "+this.signUpForm.value.firstname);

      let userData: signUpData = this.signUpForm.value; //  initialize a variable of type signUpData (interface) to have the input field values 
      this.signUpService.signup(userData);  // call signup function in sign-up service and pass the userdata to be displayed
    }
    else {
      console.error('Sign Up Error'); // this should'nt run
    }
  }

}

