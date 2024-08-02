import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { StepperOrientation } from '@angular/cdk/stepper';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Services Import
import { UtilityService } from '../utility.service';
import { SignUpService } from '../sign-up.service';
import { BreakpointObserver } from '@angular/cdk/layout';

// Models Import
import { studentData } from '../model/studentdata';


@Component({
  selector: 'app-student-information-form',
  templateUrl: './student-information-form.component.html',
  styleUrl: './student-information-form.component.css',
  providers: [UtilityService, SignUpService, provideNativeDateAdapter()]
})

export class StudentInformationFormComponent implements OnInit {
  
  stepperOrientation!: Observable<StepperOrientation>;  // bound to orientation in html  

  // inject dependencies
  constructor(
    private matDialogRef: MatDialogRef<StudentInformationFormComponent>,  // make this component a mat dialog
    @Inject(MAT_DIALOG_DATA) public dialogData: any,  // inject data into the dialog (this component) -> currently we give isEditForm (flag to tell if the form will be populated by a users value)
    private utilityService: UtilityService,
    private signUpService: SignUpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private breakPointObserver: BreakpointObserver  // to check matching state of media queries
  ) {

    this.dateAdapter.setLocale('en-IN');
    // Use BreakpointObserver to create an observable that will emit
    // the appropriate stepper orientation based on the screen size
    this.stepperOrientation = breakPointObserver.observe('(max-width: 600px')
    .pipe(map(({matches}) => (matches ? 'vertical' : 'horizontal')));  
    
  }


  studentInformationForm: FormGroup = new FormGroup({}); // initialize formgroup for accepting student information

  // set maxDate for the date selector
  readonly currentDate = new Date();
  readonly maxDate = new Date(this.currentDate.getTime() - (24 * 60 * 60 * 1000));    

  // intialize lists for the select fields in the form
  academicYears: string[] = []; // assign academic years form selection field
  degreePrograms: string[] = []; // assign degree program form selection field
  degreeProgramModules: any = {};  // assign degree program modules for selection fields
  selectedProgramModulesList: string[] = [];  // all elective modules for selected degree program
  studentElectiveModule1List: string[] = [];  // all elective modules for selected degree program with selected electives (2 and 3) filtered out
  studentElectiveModule2List: string[] = [];  // all elective modules for selected degree program with selected electives (1 and 3) filtered out
  studentElectiveModule3List: string[] = [];  // all elective modules for selected degree program with selected electives (1 and 2) filtered out
  filteredOutElectives: string[] = ['', '', ''];  // electives selected in each of the selection fields


  ngOnInit(): void {

    // initialize the form
    this.initializeStudentForm();

    // call methods to load selection fields
    this.getAcademicYears();  // load academic years
    this.getDegreeProgramModules(); // load degree program modules (call before getDegreePrograms to get keys)
    this.getDegreePrograms(); // load degree programs

    // If this dialog is called to edit students information populate the fields 
    if(this.dialogData.isEditForm) {
      this.populateStudentFormFieldsForEdit(this.dialogData.editStudentRecordID);
    }

    // subscribe to changes in student scholarship status field, reset its subfields if set to false
    this.studentInformationForm.get('studentScholarshipStatus')?.valueChanges.subscribe(res => {
      if (res==='No') {
        this.studentInformationForm.patchValue({
          studentScholarshipsGained_CheveningScholarship: false,       
          studentScholarshipsGained_DeansScholarship: false,
          studentScholarshipsGained_Other: ''
        });
      }
    });

    // Subscribe to changes in the studentDegreeProgram field
    this.studentInformationForm.get('studentDegreeProgram')?.valueChanges.subscribe(res => {
      this.setModulesBasedOnDegreeProgram(res);
    });

    // Subscribe to changes in the selective fields after selecting elective module 1
    this.studentInformationForm.get('studentElectiveModule1')?.valueChanges.subscribe(res => {
      this.setElectivesList23(res);
    });

    // Subscribe to changes in the selective fields after selecting elective module 2
    this.studentInformationForm.get('studentElectiveModule2')?.valueChanges.subscribe(res => {
      this.setElectivesList13(res);
    });

    // Subscribe to changes in the selective fields after selecting elective module 3
    this.studentInformationForm.get('studentElectiveModule3')?.valueChanges.subscribe(res => {
      this.setElectivesList12(res);
    });

  }

  // method to initialize student information form 
  initializeStudentForm(): void {

    // initialize form
    this.studentInformationForm = this.formBuilder.group({
      studentFirstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      studentLastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      studentEmail: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      studentPhoneNumber: ['',[Validators.required, Validators.pattern(/^[1-9][0-9]{9}$/)]],
      studentDateOfBirth: ['', Validators.required],
      // studentDateOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)]],
      studentPresentAddress: ['', Validators.required],
      studentIDNumber: ['WA', [Validators.required, Validators.pattern(/^WA[0-9]{4}$/)]],
      studentAcademicYear: ['', Validators.required],
      studentNationality: ['Domestic'],
      studentScholarshipStatus: ['No'],
      // studentScholarshipGained: ['', Validators.required],
      studentScholarshipsGained_CheveningScholarship: [false],
      studentScholarshipsGained_DeansScholarship: [false],
      studentScholarshipsGained_Other: [''],
      studentDegreeProgram: ['', Validators.required],
      studentCoreModule1: [''],
      studentCoreModule2: [''],
      studentElectiveModule1: ['', Validators.required],
      studentElectiveModule2: ['', Validators.required],
      studentElectiveModule3: ['', Validators.required]
    });

  }

  // method to populate the form fields if this dialog was opened to edit student information
  populateStudentFormFieldsForEdit(editStudentRecordID: string): void {
    this.signUpService.getStudentInformation(editStudentRecordID).subscribe({
      next: (res) => {
        if (res) { 
          this.studentInformationForm.patchValue(res); // if we succesfully get subscribers information, put them in the form fields
        }
      },
      error: (error) => {
        console.log(error);
        // this.utilityService.showWarningMessage(error);
        // if(error.status==404)
        // {
        //   this.utilityService.showWarningMessage("Details Not Found!"); // user could not be found  
        // }
        // else {
        //   this.utilityService.showWarningMessage("Could Not Recieve Details!"); // user could not be found
        // }
        this.utilityService.showWarningMessage(error.error);
      }
    });
  }

 
  // Method invokes when we click on the submit button -> puts (update) or posts (add) data if form is valid and based on flag to indicate edit/new
  onSubmit(): void {

    // check if form is valid
    if(this.studentInformationForm.valid) {
      
      let studentInformation = this.studentInformationForm.value; // assign form values to variable
      
      // if dialog was opened to edit student details, call update function
      if (this.dialogData.isEditForm) {
        this.signUpService.updateStudentInformation(this.dialogData.editStudentRecordID, studentInformation).subscribe({
          next: (res1) => {
            this.utilityService.showSuccessMessage("Student Information Updated Sucessfully!");
            this.matDialogRef.close(true);  //return true when closing dialog box    
          },
          error: (error) => {
            console.log(error);
            // if (error.status==404) {
            //   this.utilityService.showWarningMessage("Student Information Could Not Be Updated! Information Not Found!");  
            // }
            // else if (error.status==409) {
            //   this.utilityService.showWarningMessage("Email, Phone Number Or Student ID Used In Another Record!");
            // }
            // else {
            //   this.utilityService.showWarningMessage("Student Information Could Not Be Updated!");
            // }  
            this.utilityService.showWarningMessage(error.error);
          }
        });
      }
      
      // if dialog was opened to add student details, call add function
      else {
        this.signUpService.addStudentInformation(studentInformation).subscribe({
          next: (res) => {
            console.log(res);
            this.utilityService.showSuccessMessage("Student Information "+ res.studentFirstName +" Added Successfully!");
            this.matDialogRef.close(true);
            // this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.log(error);
            // if (error.status==409) {
            //   this.utilityService.showWarningMessage("Email, Phone Number Or Student ID Used In Another Record!");
            // }
            // else {
            //   this.utilityService.showWarningMessage("Student Information Could Not Be Added!");
            // }
            this.utilityService.showWarningMessage(error.error);
          }
        });
      }

    } 
    else {
      console.error("Something went wrong!");
      this.utilityService.showWarningMessage("Encountered Some Issue Adding Student Information!")  
    }

  }

  // Method to populate the academic year selection
  getAcademicYears(): void {
      
    const startAcademicYear = 2010;
    const endAcademicYear = 2023;

    for ( let academicYear = startAcademicYear; academicYear <= endAcademicYear; academicYear++) {
      this.academicYears.push(`${academicYear}-${academicYear + 1}`);
    }  
  }

  // Method to populate the degree program selection
  getDegreePrograms(): void {
    this.degreePrograms = Object.keys(this.degreeProgramModules);
  }


  // Dictionary - {programModules: {coreModules: [], electiveModules: []}}
  getDegreeProgramModules() {
    this.degreeProgramModules = {
      "Bachelor of Science in Computer Science": {
        coreModules: ['CS101 - Introduction to Computer Science', 'CS102 - Data Structures and Algorithms'],
        electiveModules: ['CS201 - Operating Systems', 'CS202 - Database Systems', 'CS203 - Computer Networks', 'CS204 - Artificial Intelligence', 'CS205 - Machine Learning', 'CY202 - Ethical Hacking', 'DS204 - Data Visualization']
      },
      "Bachelor of Arts in Computer Science": {
        coreModules: ['CSBA101 - Introduction to Computer Science', 'CSBA102 - Data Structures and Algorithms'],
        electiveModules: ['CSBA201 - Software Engineering', 'CSBA202 - Human-Computer Interaction', 'CSBA203 - Cybersecurity', 'CSBA204 - Data Visualization', 'CSBA205 - Ethics in Technology', 'CS202 - Database Systems', 'DS204 - Data Visualization']
      },
      "Bachelor of Science in Software Engineering": {
        coreModules: ['SE101 - Software Engineering Fundamentals', 'SE102 - Software Design and Architecture'],
        electiveModules: ['SE201 - Agile Software Development', 'SE202 - Software Project Management', 'SE203 - Software Testing and Quality Assurance', 'SE204 - Mobile App Development', 'SE205 - Web Development', 'CS204 - Artificial Intelligence', 'CS205 - Machine Learning']
      },
      "Bachelor of Science in Information Technology": {
        coreModules: ['IT101 - Fundamentals of Information Technology', 'IT102 - Network Fundamentals'],
        electiveModules: ['IT201 - Cloud Computing', 'IT202 - Cybersecurity Fundamentals', 'IT203 - IT Project Management', 'IT204 - System Administration', 'IT205 - IT Service Management', 'CS203 - Computer Networks', 'CY202 - Ethical Hacking']
      },
      "Bachelor of Science in Computer Engineering": {
        coreModules: ['CE101 - Digital Logic Design', 'CE102 - Microprocessors and Microcontrollers'],
        electiveModules: ['CE201 - Embedded Systems', 'CE202 - VLSI Design', 'CE203 - Computer Architecture', 'CE204 - Signal Processing', 'CE205 - Robotics', 'CS203 - Computer Networks', 'CS204 - Artificial Intelligence']
      },
      "Bachelor of Science in Data Science": {
        coreModules: ['DS101 - Introduction to Data Science', 'DS102 - Statistical Methods for Data Science'],
        electiveModules: ['DS201 - Big Data Analytics', 'DS202 - Data Mining', 'DS203 - Predictive Modeling', 'DS204 - Data Visualization', 'DS205 - Natural Language Processing', 'CS205 - Machine Learning', 'AI202 - Deep Learning']
      },
      "Bachelor of Science in Cybersecurity": {
        coreModules: ['CY101 - Introduction to Cybersecurity', 'CY102 - Cryptography'],
        electiveModules: ['CY201 - Network Security', 'CY202 - Ethical Hacking', 'CY203 - Digital Forensics', 'CY204 - Security Risk Management', 'CY205 - Cloud Security', 'IT202 - Cybersecurity Fundamentals', 'CS203 - Computer Networks']
      },
      "Bachelor of Science in Artificial Intelligence": {
        coreModules: ['AI101 - Introduction to Artificial Intelligence', 'AI102 - Machine Learning'],
        electiveModules: ['AI201 - Neural Networks', 'AI202 - Deep Learning', 'AI203 - Natural Language Processing', 'AI204 - AI Ethics', 'AI205 - Reinforcement Learning', 'CS204 - Artificial Intelligence', 'DS205 - Natural Language Processing']
      },
      "Bachelor of Science in Game Development": {
        coreModules: ['GD101 - Introduction to Game Development', 'GD102 - Game Design Principles'],
        electiveModules: ['GD201 - Game Programming', 'GD202 - 3D Modeling and Animation', 'GD203 - Game AI', 'GD204 - Game Production', 'GD205 - Game Testing', 'CS204 - Artificial Intelligence', 'AI203 - Natural Language Processing']
      },
      "Bachelor of Science in Network Engineering": {
        coreModules: ['NE101 - Introduction to Network Engineering', 'NE102 - Network Protocols'],
        electiveModules: ['NE201 - Network Security', 'NE202 - Wireless Networks', 'NE203 - Network Design and Implementation', 'NE204 - Network Management', 'NE205 - VoIP', 'CS203 - Computer Networks', 'CY201 - Network Security']
      },
      "Bachelor of Science in Information Systems": {
        coreModules: ['IS101 - Introduction to Information Systems', 'IS102 - System Analysis and Design'],
        electiveModules: ['IS201 - Enterprise Systems', 'IS202 - Business Intelligence', 'IS203 - IT Governance', 'IS204 - IS Strategy and Planning', 'IS205 - IS Project Management', 'IT203 - IT Project Management', 'CS202 - Database Systems']
      },
      "Bachelor of Science in Computer Information Systems": {
        coreModules: ['CIS101 - Introduction to Computer Information Systems', 'CIS102 - Information Systems Analysis'],
        electiveModules: ['CIS201 - Database Management Systems', 'CIS202 - Information Systems Security', 'CIS203 - IT Infrastructure', 'CIS204 - Business Process Management', 'CIS205 - E-Commerce Systems', 'CS202 - Database Systems', 'IT203 - IT Project Management']
      },
      "Bachelor of Science in Cloud Computing": {
        coreModules: ['CC101 - Introduction to Cloud Computing', 'CC102 - Cloud Architecture'],
        electiveModules: ['CC201 - Cloud Security', 'CC202 - Cloud DevOps', 'CC203 - Cloud Services', 'CC204 - Cloud Migration', 'CC205 - Serverless Computing', 'IT201 - Cloud Computing', 'CY205 - Cloud Security']
      }
    };
  }
  
  // set core modules and selection list of electives basd on degree program selected
  setModulesBasedOnDegreeProgram(degreeProgram: string): void {

    const selectedProgram = this.degreeProgramModules[degreeProgram];  // get the object of the selected program from dictionary

    if (selectedProgram) {
      this.studentInformationForm.patchValue({
        studentCoreModule1: selectedProgram.coreModules[0] || '', // set as the first core module
        studentCoreModule2: selectedProgram.coreModules[1] || '', // set as the second core module
        studentElectiveModule1: '', // initialize to blank      
        studentElectiveModule2: '', // initialize to blank
        studentElectiveModule3: ''  // initialize to blank
      });

      this.studentElectiveModule1List = selectedProgram.electiveModules;  // list shown at field elective module 1
      this.studentElectiveModule2List = selectedProgram.electiveModules;  // list shown at field elective module 2
      this.studentElectiveModule3List = selectedProgram.electiveModules;  // list shown at field elective module 3
      this.selectedProgramModulesList = selectedProgram.electiveModules;  // complete list of elective modules, this remains complete during the entire time
      this.filteredOutElectives = ['', '', '']; // initialize filtered out electives as an empty array
    }

    else { 
      // Reset values in the form
      this.studentInformationForm.patchValue({
        studentCoreModule1: '',
        studentCoreModule2: '',
        studentElectiveModule1: '',      
        studentElectiveModule2: '',
        studentElectiveModule3: '' 
      });

      // reset elective module lists if we deselect Degree Program
      this.studentElectiveModule1List = [];
      this.studentElectiveModule2List = [];
      this.studentElectiveModule3List = [];
      this.selectedProgramModulesList = []; 
      this.filteredOutElectives = ['', '', '']; 
    }
  }

    // Method to filter out electives for elective fields 2 and 3 after selecting elective in field 1
    setElectivesList23(selectedElective1: string): void {

      if (selectedElective1)  {
        this.filteredOutElectives[0] = selectedElective1; // assign the elective selected in elective 1
      }
      else {
        this.filteredOutElectives[0] = '';
      }

      this.studentElectiveModule2List = this.selectedProgramModulesList.filter(module => module !== this.filteredOutElectives[0] && module !== this.filteredOutElectives[2]);  // remove electives selected in 1 and 3
      this.studentElectiveModule3List = this.selectedProgramModulesList.filter(module => module !== this.filteredOutElectives[0] && module !== this.filteredOutElectives[1]);  // remove electives selected in 1 and 2
    }
  
    // Method to filter out electives for elective fields 1 and 3 after selecting elective in field 2
    setElectivesList13(selectedElective2: string): void {

      if (selectedElective2)  {
        this.filteredOutElectives[1] = selectedElective2; // assign the elective selected in elective 2
      }
      else {
        this.filteredOutElectives[1] = '';
      }
      
      this.studentElectiveModule1List = this.selectedProgramModulesList.filter(module => module !== this.filteredOutElectives[1] && module !== this.filteredOutElectives[2]);  // remove electives selected in 2 and 3
      this.studentElectiveModule3List = this.selectedProgramModulesList.filter(module => module !== this.filteredOutElectives[1] && module !== this.filteredOutElectives[0]);  // remove electives selected in 1 and 2 
    }
  
    // Method to filter out electives for elective fields 1 and 2 after selecting elective in field 3
    setElectivesList12(selectedElective3: string): void {

      if (selectedElective3)  {
        this.filteredOutElectives[2] = selectedElective3; // assign the elective selected in elective 3
      }
      else {
        this.filteredOutElectives[2] = '';
      }

      this.studentElectiveModule1List = this.selectedProgramModulesList.filter(module => module !== this.filteredOutElectives[2] && module !== this.filteredOutElectives[1]);  // remove electives selected in 2 and 3
      this.studentElectiveModule2List = this.selectedProgramModulesList.filter(module => module !== this.filteredOutElectives[2] && module !== this.filteredOutElectives[0]);  // remove electives selected in 1 and 3  
    }

}