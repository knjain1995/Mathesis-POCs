// Default imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Module imports
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Components
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmationdialogComponent } from './confirmationdialog/confirmationdialog.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentInformationFormComponent } from './student-information-form/student-information-form.component';

// Animations
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from './navigation/navigation.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    ConfirmationdialogComponent,
    NavigationComponent,
    StudentInformationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
