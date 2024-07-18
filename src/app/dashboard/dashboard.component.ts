import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Import Components
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';

// Import Services
import { SignUpService } from '../sign-up.service';
import { UtilityService } from '../utility.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// Import Models
import { signUpData } from '../model/signupdata';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [SignUpService, UtilityService, MatDialog]
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
    private utilityService: UtilityService,
    private matDialog: MatDialog,
    private router: Router
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
        this.displayedColumns = ['id', 'firstname', 'lastname', 'email', 'phone', 'dateofbirth', 'newsletterintent', 'edit', 'delete'] // define all columns that would be displayed, we skipped password
        this.dataSource.paginator = this.paginator; // assign paginator to dataSource
        this.dataSource.sort = this.sort; // assign sorter to datasource       
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // openDialog(id: string) {
  //   throw new Error('Method not implemented.');
  //   }

  // Function invoked when a row is to be deleted
  deleteRow(id: string) {

    // Invoking dialog to confirm if row is to be deleted 
    const dialogRef = this.matDialog.open(ConfirmationdialogComponent, {  // opens the dialog by passing the component having the dialog
      data: { message: "Are you sure you want to delete this record?" }
    });

    // open method created an instance of the MatDialogRef which provides a handle on the open dialog
    dialogRef.afterClosed().subscribe({
      next: (res1) => {  // value bound in confirmationdialog.component.html     
        if (res1) { // if true
          this.signUpService.deleteSignUp(id).subscribe({ // call delete method in signUpService and return the deleted object
            next: (res2) => {
              this.dataSource.data = this.dataSource.data.filter((res3) => res3.id !== res2.id); // filter out the deleted object
              this.utilityService.showSuccessMessage("Record Deleted Succesfully!");
            },
            error: (error) => {
              console.log(error);
              this.utilityService.showWarningMessage("Record Could Not Be Deleted!");
            }
          });
        }
        else {
          this.utilityService.showWarningMessage("Deletion Cancelled!");
        }      
      },
      error: (error) => {
        console.log(error);
        this.utilityService.showWarningMessage("Record Could Not Be Deleted!");
      }
    });    
  }
  
    // Function invoked when a row is to be edited
    editRow(id: string) {
      this.router.navigate(['/editsignup/'+id]);
    } 
  }