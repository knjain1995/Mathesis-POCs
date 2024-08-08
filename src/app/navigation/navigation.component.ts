import { Component } from '@angular/core';

// Import Services
import { Router } from '@angular/router';
import { SignUpService } from '../sign-up.service';
import { UtilityService } from '../utility.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  providers: [SignUpService]
})

export class NavigationComponent {

  constructor(
    private router: Router,
    private signUpService: SignUpService,
    private utilityService: UtilityService
  ) {}

  // links = ['/dashboard', '/studentinformationform'];
  // activeLink = this.links[0];

 
  // Route to Login Page

  logout() {
    this.utilityService.showWarningMessage("Logged Out!");
    this.signUpService.logout();
  }  

}

