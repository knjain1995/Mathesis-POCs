import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Model imports
import { signUpData } from './model/signupdata';
import { studentData } from './model/studentdata';
import { loginData } from './model/logindata';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private httpClient: HttpClient, // inject HTTP client to make http requests to json server
  ) { }

  // URL to JSON server
  private serverURL = 'http://localhost:3000';


  // URL to Backend API
  private backendAPI = 'http://localhost:8080/api/signup'

  // SIGN-UP INFORMATION TABLE

  checkLogin(loginData: loginData): Observable<any> {
    return this.httpClient.post<loginData>(this.backendAPI+'/checkLoginCredentials', loginData);
  } 

  // Make HTTP post request to json server and return an observable
  // addSignUp(signUpData: signUpData): Observable<any> {
  //   return this.httpClient.post(this.serverURL+'/signUpData', signUpData);
  // }
  addSignUp(signUpData: signUpData): Observable<any> {
    return this.httpClient.post<signUpData>(this.backendAPI, signUpData);
  }

  // Get specific signup's information from JSON server
  // getSignUp(id: string): Observable<signUpData> {
  //   return this.httpClient.get<signUpData>(this.serverURL+'/signUpData/'+id);
  // }
  getSignUp(id: string): Observable<signUpData> {
    return this.httpClient.get<signUpData>(this.backendAPI+'/'+id);
  }

  // Get all signup information from JSON server
  // getAllSignUp(): Observable<signUpData[]> {
  //   return this.httpClient.get<signUpData[]>(this.serverURL+'/signUpData');
  // }
  getAllSignUp(): Observable<signUpData[]> {
    return this.httpClient.get<signUpData[]>(this.backendAPI);
  }

  // Put updated form in the dataset
  // updateSignUp(id: string, editedSignUpData: signUpData) {
  //   return this.httpClient.put(this.serverURL+'/signUpData/'+id, editedSignUpData);
  // }
  updateSignUp(id: string, editedSignUpData: signUpData) {
    return this.httpClient.put(this.backendAPI+'/'+id, editedSignUpData);
  }

  // delete signup data of passed id
  // deleteSignUp(id: string): Observable<any> {
  //   return this.httpClient.delete(this.serverURL+'/signUpData/'+id);
  // }
  deleteSignUp(id: string): Observable<any> {
    return this.httpClient.delete(this.backendAPI+'/'+id);
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

  // Put updated student information form in the dataset
  updateStudentInformation(id: string, editedStudentInformation: studentData) {
    return this.httpClient.put(this.serverURL+'/studentInformationData/'+id, editedStudentInformation);
  }

  // delete student information data of passed id
  deleteStudentInformation(id: string): Observable<any> {
    return this.httpClient.delete(this.serverURL+'/studentInformationData/'+id);
  }

}