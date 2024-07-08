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
  showRegistrationMessage(message: string) {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = 3000;
    this.snackBar.open(message, 'Dismiss', snackBarConfig);
  }

}
 