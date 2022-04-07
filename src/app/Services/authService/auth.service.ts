import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  BASE_URL = "http://localhost:8080/user";
  userLogin = new BehaviorSubject<User>({
    id: '',
    username: '',
    password: '',
    roles: []
  });
  currentUser = this.userLogin.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    if (token) {
      return token;
    }
    return '';
  }


  login(user: User): Observable<any> {
    console.log(user);
    return this.httpClient.post(this.BASE_URL + "/login", user, {
      responseType: 'text'
    });
  }

  logout() {
    return this.httpClient.post(this.BASE_URL + "/logout", null);
  }

  getUserLogined(): Observable<User> {
    return this.httpClient.get<User>(this.BASE_URL + '/auth')
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/