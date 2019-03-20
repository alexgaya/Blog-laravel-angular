import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  public create(token: any, category: Category): Observable<any> {
    let json = JSON.stringify(category);
    let params = `json=${json}`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    
    return this._http.post(`${this.url}category`, params, {headers});
  }

  public getCategories(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(`${this.url}category`, {headers});
  }

  public getCategory(id: string | number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(`${this.url}category/${id}`, {headers});
  }

  public getPosts(id: string | number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(`${this.url}post/category/${id}`, {headers});
  }
}
