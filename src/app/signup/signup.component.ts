import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services Import
import { SignUpService } from '../sign-up.service';
import { UtilityService } from '../utility.service';

// Model import
import { signUpData } from '../model/signupdata';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [SignUpService, UtilityService, UserAuthService, provideNativeDateAdapter()]  // providing sign-up service but only to sign-up component
})

export class SignupComponent implements OnInit {

  // this will hold the ID to be edited if we come this page from the dashboard
  editRegId!: string; 

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
    private utilityService: UtilityService, //inject utility service to show snackbar messages
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-IN');  // set locale to india to accept date in DD/MM/YYYY format
  }

  // Function to check if there are any parameters in the link
  checkIdInURL(): void {
    this.activatedRoute.params.subscribe(params => {    
      this.editRegId = params['id'];
    });
  }

  // initializing form in the Oninit lifecycle hook
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({  // Setting up individual form controls and validations
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]], 
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{9}$/)]],
      dateofbirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      newsletterintent: [false]   
    });  
    
    // check if there are any parameters in the link
    this.checkIdInURL();

    // if we have a legitimate id to edit populate all fields with registered data
    if(this.editRegId) {
      console.log(this.editRegId);
      let regToEdit = this.signUpService.getSignUp(this.editRegId).subscribe({
        next: (res) => {
          if (res) { 
            this.signUpForm.patchValue(res); // if we succesfully get subscribers information, put them in the form fields
          }
        },
        error: (error) => {
          console.log(error);
          console.log(error.status);
          this.utilityService.showWarningMessage(error.error);          
          // if (error.status==404) {
          //   this.utilityService.showWarningMessage("Sign Up Details Not Found!"); // user could not be found
          // }
          // else {
          //   this.utilityService.showWarningMessage("Could Not Recieve Sign Up Details!");
          // }
        }
      });
    }

  }

  // Function to be executed with Submit button is clicked 
  onSubmit(): void {
    
    if(this.signUpForm.valid) { // check if signup form is valid
      // debugger
      let currentSignUpData: signUpData = this.signUpForm.value; //  initialize a variable of type signUpData (interface) to have the input field values   

      // check if there are any parameters in the link
      this.checkIdInURL();

          
          // If we an id in the link, run the update form on signup page
          if (this.editRegId) {
            // this.signUpService.updateSignUp(this.editRegId, currentSignUpData).subscribe((res) => {
            //   this.utilityService.showSuccessMessage("Registration Information Updated Sucessfully");  // if data updated succesfully
            //   this.router.navigate(['/dashboard']);
            // });
            this.signUpService.updateSignUp(this.editRegId, currentSignUpData).subscribe({
              next: (res) => {
                this.utilityService.showSuccessMessage("Registration Information Updated Sucessfully");  // if data updated succesfully
                this.router.navigate(['/dashboard']);
              },
              error: (error) => {
                // if (error.status == 409) {
                //   this.utilityService.showWarningMessage("The Email Or Phone Number Is Already In Use!");  
                // }
                // else {
                //   this.utilityService.showWarningMessage("Update Failed!"); // if login not succesful
                // }
                this.utilityService.showWarningMessage(error.error);
              }
            });
          }

          // If we do not have a legitimate ID add new subscription details
          else {
            let signUpCheck = this.signUpService.addSignUp(currentSignUpData).subscribe({
              next: (res) => {
                console.log(res);

                // SET LOCAL STORAGE TO EMULATE SESSION
                localStorage.setItem('loggedIn', 'true');

                this.utilityService.showSuccessMessage("Registration Succesful! Welcome " + res.firstname);  // if succesful login
                this.router.navigate(['/dashboard']);
              },
              error: (error) => {
                // if (error.status == 409) {
                //   this.utilityService.showWarningMessage("The Email Or Phone Number Is Already In Use!");  
                // }
                // else {
                //   this.utilityService.showWarningMessage("Registration Failed!"); // if login not succesful
                // }
                this.utilityService.showWarningMessage(error.error);
              }
            }); 
          }
        }

    else {
      console.error('Sign Up Error'); // this shouldn't run
    }    
 
  }
}

