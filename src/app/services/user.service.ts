import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity: any;
  public token: any;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
  }

  public register(user): Observable<any> {
    let json = JSON.stringify(user);
    let params = `json=${json}`;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(`${this.url}register`, params, { headers });
  }

  public signup(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.getToken = 'true';
    }

    let json = JSON.stringify(user);
    let params = `json=${json}`;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(`${this.url}login`, params, { headers });
  }

  public update(token: any, user: User): Observable<any> {
    user.description = global.htmlEntities(user.description);
    let json = JSON.stringify(user);
    let params = `json=${json}`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(`${this.url}user/update`, params, { headers });
  }

  public getIdentity(): any {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity && identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  public getToken(): any {
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  public getPosts(id: string | number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(`${this.url}post/user/${id}`, {headers});
  }

  public getUser(id: string | number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(`${this.url}user/detail/${id}`, {headers});
  }
  

}
