import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Services Import
import { SignUpService } from '../sign-up.service';

// Model import
import { signUpData } from './model/signupdata';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [SignUpService]  // providing sign-up service but only to sign-up component
})

export class SignupComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({});  // initialize a formgroup acting as our sign-up form 

  constructor(
    private formBuilder: FormBuilder,  //inject formbuilder to create forms
    private signUpService: SignUpService //inject signup service to recieve signup information
  ) {}

  // initializing form in the Oninit lifecycle hook
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({  // Setting up individual form controls and validations
      firstname: ['', Validators.required], 
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],   
    });  
  }

  // Function to be executed with Submit button is clicked 
  onSubmit(): void {
    if(this.signUpForm.valid) { // check if signup form is valid
      let userData: signUpData = this.signUpForm.value; //  initialize a variable of type signUpData (interface) to have the input field values 
      this.signUpService.signup(userData);  // call signup function in sign-up service and pass the userdata to be displayed
    }
    else {
      console.error('Sign Up Error'); // this should'nt run
    }
  }

}
