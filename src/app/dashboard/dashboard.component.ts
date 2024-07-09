import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Import Components

// Import Services
import { SignUpService } from '../sign-up.service';
import { UtilityService } from '../utility.service';

// Import Models
import { signUpData } from '../model/signupdata';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [SignUpService, UtilityService]
})
// export class DashboardComponent implements OnInit, AfterViewInit {
  export class DashboardComponent implements OnInit {

  displayedColumns: string[] = [];  // initialize the displayed columns array as an empty array

  dataSource!: MatTableDataSource<signUpData>;  // initialize variable as Material Table data source which aligns to signUpData interface

  @ViewChild(MatPaginator) // Declares a property paginator that Angular will assign a reference to the MatPaginator component.
  paginator!: MatPaginator; //initialize MatPaginator

  @ViewChild(MatSort) // Declares a property sort that Angular will assign a reference to the MatSort component.
  sort!: MatSort; //initialize MatPaginator


  constructor(  // inject services
    private signUpService: SignUpService,
    private utilityService: UtilityService
  ) {}

  // ngAfterViewInit(): void { // lifecycle hook that Angular calls after it has fully initialized the component's view. This is the appropriate place to perform any additional initialization that requires access to the view, such as setting up the paginator and sorter for a table.
  //   this.dataSource.paginator = this.paginator; // assign paginator to dataSource
  //   this.dataSource.sort = this.sort; // assign sorter to datasource
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // get value from filter formfield
    this.dataSource.filter = filterValue.trim().toLowerCase();  // remove white spaces and lower case of consistency

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();  // show results on first page
    }
  }
  
  ngOnInit(): void {
    // debugger
    // get data of all users which have signed up
    this.signUpService.getAllSignUp().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);  // assign dataSource as a MatTableDataSource 
        this.displayedColumns = ['firstname', 'lastname', 'email', 'phone', 'dateofbirth', 'newsletterintent', 'edit', 'delete'] // define all columns that would be displayed, we skipped password
        this.dataSource.paginator = this.paginator; // assign paginator to dataSource
        this.dataSource.sort = this.sort; // assign sorter to datasource       
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openDialog(id: string) {
    throw new Error('Method not implemented.');
    }

  // Function invoked when a row is to be deleted
  deleteRow(id: string) {
    this.signUpService.deleteSignUp(id).subscribe({
      next: (res) => {
        this.dataSource.data = this.dataSource.data.filter((user) => user.id !== id); // filter out the deleted row
        this.utilityService.showSuccessMessage("Record Deleted Succesfully!");
      },
      error: (error) => {
        console.log(error);
        this.utilityService.showWarningMessage("Record Could Not Be Deleted!");
      }
    });
  }
  
    // Function invoked when a row is to be edited
    editRow(id: string) {
      this.utilityService.showWarningMessage("This Functionality is Absent!");
    }  
  }
