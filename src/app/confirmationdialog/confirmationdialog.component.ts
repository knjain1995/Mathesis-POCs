import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrl: './confirmationdialog.component.css'
})
export class ConfirmationdialogComponent {
  
  // Components created via MatDialog can inject MatDialogRef and use it to close the dialog in which they are contained.
  constructor(
    public dialogRef: MatDialogRef<ConfirmationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { //To access the data in our dialog component, we have to use the MAT_DIALOG_DATA injection token
    message: string
  }) {}

}
