import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authResponse, mailRess, newEmail, signupInterface } from './Interface';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  baseurl = "http://localhost/snigdh_ci4/api";

  login(data: NgForm) {
    return this.http.post<authResponse>(this.baseurl + '/login', data)
  }
  signUp(data: typeof signupInterface) {
    
    return this.http.post<newEmail>(this.baseurl + '/signup', data)
  }
  newMail(data: FormData) {
    // console.error(data);
    
    return this.http.post<newEmail>(this.baseurl + '/newMail', data)
  }
  allEmail(email: string) {
    // console.error(email);
    
    return this.http.get<mailRess>(this.baseurl + `/allEmail?email=${email}`)
  }
  allEmailSent(email: string) {
    // console.error(email);
    
    return this.http.get<mailRess>(this.baseurl + `/allEmailSent?email=${email}`)
  }
  readStatus(id: number) {
    // console.error(id);
    
    return this.http.get<boolean>(this.baseurl + `/readStatusApi?id=${id}`)
  }
  registerEmails() {
    // console.error(id);
    return this.http.get<any>(this.baseurl + `/allEmailRegister`)
  }
}
