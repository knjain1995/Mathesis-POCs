import { Component } from '@angular/core';

// Import Services
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})

export class NavigationComponent {

  constructor(
    private router: Router
  ) {}

  // links = ['/dashboard', '/studentinformationform'];
  // activeLink = this.links[0];

 
  // Route to Login Page
  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login'])
    }

}

