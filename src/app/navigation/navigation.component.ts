import { Component } from '@angular/core';

// Import Services
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  providers: [Router]
})

export class NavigationComponent {

  constructor(
    private router: Router
  ) {}
  
  // Route to Login Page
  logout() {
    this.router.navigate(['login'])
    }

}
