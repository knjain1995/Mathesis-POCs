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
import { studentData } from '../model/studentdata';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { StudentInformationFormComponent } from '../student-information-form/student-information-form.component';

// Import Custom Pipes
import { TruncDataPipe } from '../trunc-data.pipe';

// Import Custom Directives
import { RowSelectAttributeDirective } from '../row-select-attribute.directive';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-student-information-dashboard',
  templateUrl: './student-information-dashboard.component.html',
  styleUrl: './student-information-dashboard.component.css',
  providers: [SignUpService, UtilityService, MatDialog] 
})
export class StudentInformationDashboardComponent implements OnInit {


  tableDataSource!: MatTableDataSource<studentData>;   // initialize variable as Material Table data source which aligns to studentData interface
  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;  // initialize MatPaginator
  @ViewChild(MatSort) tableSort!: MatSort; // initialize MatSort

  // list of column fields which will be displayed in the table
  displayedColumns: string[] = [ 
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
    "studentScholarshipsGained_CheveningScholarship",
    "studentScholarshipsGained_DeansScholarship",
    "studentScholarshipsGained_Other",
    "studentDegreeProgram",
    "studentCoreModule1",
    "studentCoreModule2",
    "studentElectiveModule1",
    "studentElectiveModule2",
    "studentElectiveModule3",
    "edit",
    "delete"
    ];

  // list which contains the same values as displayed columns. This is to maintain the original list when filtering out columns selected in the filter column menu
  menuColumns: string[] = this.displayedColumns;

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

  // Method to invoke student information form component which is in a dialogbox
  addStudentInformation() {
      let openAddStudentInformationDialogRef = this.matDialog.open(StudentInformationFormComponent, {
        height: '60%', data: { isEditForm: false } // set height for the dialog box and send flag telling that this is not an edit form 
      });

      openAddStudentInformationDialogRef.afterClosed().subscribe({
        next: (res) => {
          if(res) {
            this.initializeDataSource();  // reintialize datasource, maginator and sorter
          }
          else {
            this.utilityService.showWarningMessage("Add Operation Cancelled")
          }
        },
        error: (error) => {
          console.log(error);
          this.utilityService.showWarningMessage("Record Could Not Be Added! Some Error In The Dialog Box!")
        }
      });

    }
  
  //  method run on component instantiation
  ngOnInit(): void {
    this.initializeDataSource();
  }

  //  method to initialize DataSource for Mat Table
  initializeDataSource() {
    this.signUpService.getAllStudentInformation().subscribe({
      next: (res) => {
        this.tableDataSource = new MatTableDataSource(res); // assign all student information as mat table datasource
        this.displayedColumns;  // declare all columns which will be displayed
        this.tableDataSource.paginator = this.tablePaginator;   // assign paginator to table datasource
        this.tableDataSource.sort = this.tableSort;   // assign sort to table datasource  
      },
      error: (error) => {
        // if (error.status==404) {
        //   this.utilityService.showWarningMessage("Data Could Not Be Loaded!");
        // }
        // else {
        //   this.utilityService.showWarningMessage("Some Error Occured!");
        // }
        console.log(error);
        this.utilityService.showWarningMessage(error.error);
      }
    });
  }

  // Method to delete specific row
  deleteRow(studentID: string) {

    // open dialog box and gets its reference
    let openDeleteDialogRef = this.matDialog.open(ConfirmationdialogComponent, {
      data: { message: "Are you sure you want to delete this record?"}  // send message to appear in this dialog box
    });

    openDeleteDialogRef.afterClosed().subscribe({
      
      next: (res1) => { // value bound in confirmationdialog.component.html     
        if(res1) {  // if dialog box returns true
          this.signUpService.deleteStudentInformation(studentID).subscribe({ // call delete method in signUpService and return the deleted object
            next: (res2) => {
              this.tableDataSource.data = this.tableDataSource.data.filter((res3) => res3.id !== res2.id);  // filter out the deleted object
              this.utilityService.showSuccessMessage("Record Deleted Succesfully!");
            },
            error: (error) => {
              console.log(error);
              // if (error.status==404) {
              //   this.utilityService.showWarningMessage("Record Not Found! Deletion Cancelled!");
              // }
              // else {
              //   this.utilityService.showWarningMessage("Record Could Not Be Deleted!");
              // }
              this.utilityService.showWarningMessage(error.error);
            }
          });
        }
        else {
          this.utilityService.showWarningMessage("Deletion Cancelled!");
        }   
      },
      error: (error) => {
        console.log(error);
        this.utilityService.showWarningMessage("Record Could Not Be Deleted! Some Issue With The Dialog Box");
      }
    });

  }


  // Method to populate the student information form to update data
  editRow(studentRecordID: string) {
    // open dialog box and gets its reference
    let openAddStudentInformationDialogRef = this.matDialog.open(StudentInformationFormComponent, {
      height: '60%', data: { isEditForm: true, editStudentRecordID: studentRecordID } // set height for the dialog box and send flag telling that this "is" an edit form and share the student record id of the record to be edited 
    });

    openAddStudentInformationDialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res) { // If dialog box returns true
          console.log("Record Edited Successfully");
          this.initializeDataSource();  // intialize datasource, maginator and sorter again
        }
        else {
          this.utilityService.showWarningMessage("Edit Cancelled")
        }
      },
      error: (error) => {
        console.log(error);
        this.utilityService.showWarningMessage("Record Could Not Be Edited! Some Error in the Dialog Box!")
      }
    });
  }
  

/////////////////////////////////////////////////////////////////////////////////
////////////////////// CODE FOR COLUMN SELECTOR ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  selectedColumns: Set<string> = new Set(this.displayedColumns);

  @ViewChild(MatMenuTrigger)
  columnSelectorMenuTrigger!: MatMenuTrigger;

  @ViewChild('shoes')
  selectionList!: MatSelectionList;


  toggleColumnSelector() {
    this.columnSelectorMenuTrigger.openMenu();
  }

  applyColumnFilter() {
    // Logic to apply the column filter based on selected options   
    this.selectedColumns.clear();
    this.menuColumns.forEach(column => {
      const selectedOption = this.selectionList.selectedOptions.selected.find(option => option.value === column);
      if (selectedOption) {
        this.selectedColumns.add(selectedOption.value);
      }
    });
    console.log(this.selectedColumns);
    this.columnSelectorMenuTrigger.closeMenu();
    this.displayedColumns = Array.from(this.selectedColumns);
    this.initializeDataSource();
  }

  toggleSelectAll(event: any) {
    if (event.checked) {
      this.selectionList.selectAll();
    } else {
      this.selectionList.deselectAll();
    }
  }

  isColumnSelected(column: string): boolean {
    return this.selectedColumns.has(column);
  }


 // -x-x--x-x-x-x-x-x--x-x-x--x-x-x--x-x-x--x-x-x--x-x-x--x-x-x--x-x-x--x //
// -x-x--x-x-x--x END OF CODE FOR COLUMN SELECTOR -x-x--x-x-x--x-x-x--x-
// -x-x--x-x-x--x-x-x--x-x-x--x-x-x--x-x-x--x-x-x--x-x-x--x-x-x--x-x-x--x
}
