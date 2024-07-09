import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services Import
import { SignUpService } from '../sign-up.service';
import { UtilityService } from '../utility.service';

// Model import
import { signUpData } from '../model/signupdata';

@Component({
  selector: 'app-create-student-profile',
  templateUrl: './create-student-profile.component.html',
  styleUrl: './create-student-profile.component.css',
  providers: [SignUpService, UtilityService, provideNativeDateAdapter()]  // providing sign-up service but only to sign-up component
})
export class CreateStudentProfileComponent implements OnInit {

  // this will hold the ID to be edited if we come this page from the dashboard
  // editStudentProfileId!: string; 

  // set max date for date selection to be 1 day before current day
  readonly currentDate = new Date();
  readonly maxDate = new Date(this.currentDate.getTime() - (24 * 60 * 60 * 1000));    

  studentProfileForm: FormGroup = new FormGroup({});  // initialize a formgroup acting as our sign-up form 

  constructor(
    private formBuilder: FormBuilder,  //inject formbuilder to create forms
    private signUpService: SignUpService, //inject signup service to recieve signup information
    private utilityService: UtilityService, //inject utility service to show snackbar messages
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // check if there are any parameters in the link
  // checkIdInURL(): void {
  //   this.activatedRoute.params.subscribe(params => {
  //     console.log(params);
      
  //     this.editStudentProfileId = params['id'];
  //   });
  // }

  // initializing form in the Oninit lifecycle hook
  ngOnInit(): void {
    this.studentProfileForm = this.formBuilder.group({  // Setting up individual form controls and validations
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{9}$/)]],
      dateOfBirth: ['', Validators.required],
      presentAddress: ['', Validators.required],
      studentIDNumber: ['', [Validators.required, Validators.pattern(/^WA\d{3}$/)]],  // pattern WAxxx, where x is a number
      academicYear: ['', Validators.required],
      degreeProgram: ['', Validators.required],
      studentType: ['', Validators.required],
      scholarshipStatus: ['', Validators.required],
      coreModule1: ['', Validators.required],
      coreModule2: ['', Validators.required],
      electiveModule1: ['', Validators.required],
      electiveModule2: ['', Validators.required],
      electiveModule3: ['', Validators.required]
    });  
    
    // check if there are any parameters in the link
    // this.checkIdInURL();

    // if we have a legitimate id to edit populate all fields with student data
    // if(this.editStudentProfileId) {
    //   console.log(this.editStudentProfileId);
    //   let regToEdit = this.signUpService.getSignUp(this.editStudentProfileId).subscribe({
    //     next: (res) => {
    //       if (res) { 
    //         this.studentProfileForm.patchValue(res); // if we succesfully get subscribers information, put them in the form fields
    //       }
    //     },
    //     error: (error) => {
    //       console.log(error);
    //       this.utilityService.showWarningMessage("Could not recieve details!"); // user could not be found
    //     }
    //   });
    // }
  }

  // Function to be executed with Submit button is clicked 
  onSubmit(): void {
    
    if(this.studentProfileForm.valid) { // check if signup form is valid
      
      let currentSignUpData: signUpData = this.studentProfileForm.value; //  initialize a variable of type signUpData (interface) to have the input field values 

      // check if there are any parameters in the link
      // this.checkIdInURL();

      // If we have an ID in the link, run functionality for update
      // if(this.editStudentProfileId) {
      //   this.signUpService.updateSignUp(this.editStudentProfileId, currentSignUpData).subscribe((res) => {
      //     this.utilityService.showSuccessMessage("Registration Information Updated Sucessfully");  // if data updated succesfully
      //     this.router.navigate(['/dashboard/']);          
      //   });
      // }
   
      // If we do not have a legitimate ID add new subscription details
      // else {
        let signUpCheck = this.signUpService.addSignUp(currentSignUpData).subscribe({
          next: (res) => {
            console.log(res);
            this.utilityService.showSuccessMessage("Registration Succesful! Welcome " + res.firstname);  // if succesful login
            this.router.navigate(['/dashboard/']);
          },
          error: (error) => {
            console.log(error);
            this.utilityService.showWarningMessage("Registration Failed!"); // if login not succesful
          }
        });    
      // }
    }
    
    else {
      console.error('Sign Up Error'); // this shouldn't run
    }    
 
  }
}
