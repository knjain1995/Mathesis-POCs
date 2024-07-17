import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Model imports
import { signUpData } from './model/signupdata';
import { studentData } from './model/studentdata';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private httpClient: HttpClient, // inject HTTP client to make http requests to json server
  ) { }

  // URL to JSON server
  serverURL = 'http://localhost:3000';

  // SIGN-UP INFORMATION TABLE

  // Make HTTP post request to json server and return an observable
  addSignUp(signUpData: signUpData): Observable<any> {
    return this.httpClient.post(this.serverURL+'/signUpData', signUpData);
  }

  // Get specific signup's information from JSON server
  getSignUp(id: string): Observable<signUpData> {
    return this.httpClient.get<signUpData>(this.serverURL+'/signUpData/'+id);
  }

  // Get all signup information from JSON server
  getAllSignUp(): Observable<signUpData[]> {
    return this.httpClient.get<signUpData[]>(this.serverURL+'/signUpData');
  }

  // Put updated form in the dataset
  updateSignUp(id: string, editedSignUpData: signUpData) {
    return this.httpClient.put(this.serverURL+'/signUpData/'+id, editedSignUpData);
  }

  // delete signup data of passed id
  deleteSignUp(id: string): Observable<any> {
    return this.httpClient.delete(this.serverURL+'/signUpData/'+id);
  }


  // STUDENT INFORMATION TABLE

  addStudentInformation(studentInformationData: studentData): Observable<any> {
    return this.httpClient.post(this.serverURL+'/studentInformationData', studentInformationData);
  }

  getStudentInformation(id: string): Observable<studentData> {
    return this.httpClient.get<studentData>(this.serverURL+'/studentInformationData/'+id)
  }

  getAllStudentInformation(): Observable<studentData[]> {
    return this.httpClient.get<studentData[]>(this.serverURL+'/studentInformationData')
  }

}