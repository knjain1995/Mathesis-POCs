import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Import Components


// Import Services
import { SignUpService } from '../sign-up.service';
import { UtilityService } from '../utility.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// Import Models
import { studentData } from '../model/studentdata';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-student-information-dashboard',
  templateUrl: './student-information-dashboard.component.html',
  styleUrl: './student-information-dashboard.component.css',
  providers: [SignUpService, UtilityService, MatDialog] 
})
export class StudentInformationDashboardComponent implements OnInit {

  displayedColumns: string[] = [];  // Array of columns which will be displayed in the table
  tableDataSource!: MatTableDataSource<studentData>;   // initialize variable as Material Table data source which aligns to studentData interface
  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;  // initialize MatPaginator
  @ViewChild(MatSort) tableSort!: MatSort; // initialize MatSort


  constructor (
    private router: Router,
    private signUpService: SignUpService,
    private utilityService: UtilityService,
    private matDialog: MatDialog 
  ) {}

  // function to get filter-formfield input and filter the data based on it 
  applyTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // get value from the filter formfield
    this.tableDataSource.filter = filterValue.trim().toLowerCase(); // assign the filter property of the table data source our filter term in a consistent format

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage(); // if we have a paginator, move to the first page (this is where we will show the filter results)
    }
  }
  
  ngOnInit(): void {
    
    this.signUpService.getAllStudentInformation().subscribe({
      next: (res) => {
        this.tableDataSource = new MatTableDataSource(res); // assign all student information as mat table datasource
        this.displayedColumns = [ // list of column fields which will be displayed in the table
          "id",
          "studentFirstName",
          "studentLastName",
          "studentEmail",
          "studentPhoneNumber",
          "studentDateOfBirth",
          "studentPresentAddress",
          "studentIDNumber",
          "studentAcademicYear",
          "studentNationality",
          "studentScholarshipStatus",
          // "studentScholarshipGained",
          "studentScholarsipsGained_CheveningScholarship",
          "studentScholarsipsGained_DeansScholarship",
          "studentScholarsipsGained_Other",
          "studentDegreeProgram",
          "studentCoreModule1",
          "studentCoreModule2",
          "studentElectiveModule1",
          "studentElectiveModule2",
          "studentElectiveModule3"
          ]
        this.tableDataSource.paginator = this.tablePaginator;   // assign paginator to table datasource
        this.tableDataSource.sort = this.tableSort;   // assign sort to table datasource
      },
      error: (error) => {
        console.log(error);
      }
    });

  }



}
