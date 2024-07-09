import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private snackBar: MatSnackBar // inject snackbar to display messages
  ) { }

  // display success messages
  showSuccessMessage(message: string) {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = 3000;
    snackBarConfig.panelClass = ['snackbar-success']; // custom styling defined in global css
    this.snackBar.open(message, 'Dismiss', snackBarConfig);
  }

    // display warning messages
    showWarningMessage(message: string) {
      const snackBarConfig = new MatSnackBarConfig();
      snackBarConfig.duration = 3000;
      snackBarConfig.panelClass = ['snackbar-warning']; // custom styling defined in global css
      this.snackBar.open(message, 'Dismiss', snackBarConfig);
    }
}
 