import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  public create(token: any, post: Post): Observable<any> {
    post.content = global.htmlEntities(post.content);
    let json = JSON.stringify(post);
    let params = `json=${json}`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(`${this.url}post`, params, {headers});
  }

  public getPosts(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    return this._http.get(`${this.url}post`, {headers});
  }

  public getPost(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    return this._http.get(`${this.url}post/${id}`, {headers});
  }

  public update(token, post: Post, id): Observable<any> {
    post.content = global.htmlEntities(post.content);
    let json = JSON.stringify(post);
    let params = `json=${json}`;
    let headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(`${this.url}post/${id}`, params, {headers});
  }

  public delete(token: any, id: number | string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(`${this.url}post/${id}`, {headers});
  }
}
