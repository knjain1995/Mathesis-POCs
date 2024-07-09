import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Model imports
import { signUpData } from './model/signupdata';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private httpClient: HttpClient, // inject HTTP client to make http requests to json server
  ) { }

  // URL to JSON server
  serverURL = 'http://localhost:3000';

  // Make HTTP post request to json server and return an observable
  addSignUp(signUpData: signUpData): Observable<any> {
    return this.httpClient.post(this.serverURL+'/signUpData', signUpData);
  }

  // Get all signup information from JSON server
  getAllSignUp(): Observable<signUpData[]> {
    return this.httpClient.get<signUpData[]>(this.serverURL+'/signUpData');
  }

  // delete signup data of passed id
  deleteSignUp(id: string): Observable<any> {
    return this.httpClient.delete(this.serverURL+'/signUpData/'+id);
  }

}