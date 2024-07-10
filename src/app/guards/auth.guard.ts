import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
    const router = inject(Router);
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const isAuthRoute = route.routeConfig?.path === 'login' || route.routeConfig?.path === 'newsignup';

    if (loggedIn) {
      if (isAuthRoute) {
        router.navigate(['/dashboard']);
        return false;
      }
      return true;
    } else {
      if (isAuthRoute) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    }
};


// if (localStorage.getItem('loggedIn') === 'true') {
//   // If the user is already logged in, navigate to the dashboard
//   if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'newsignup') {
//     router.navigate(['/dashboard']);
//     return false;
//   }
//   return true;
// } else {
//   // If the user is not logged in, allow access to login and signup pages
//   if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'newsignup') {
//     return true;
//   }
//   // Otherwise, redirect to the login page
//   router.navigate(['/login']);
//   return false;
// }


// import { inject } from '@angular/core';
// import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


// export const authGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot, 
//   state: RouterStateSnapshot) => {
//     // const r outer = inject(Router);

//     if(localStorage.getItem('loggedIn') === 'true') {
//       return true;
//     }
//     else {
//       return false;
//     }
// };