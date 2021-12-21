import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private _httClient: HttpClient) { }

  getListItems(): Observable<Post[]> {
    return this._httClient.get<Post[]>(`${this.url}/posts?_page=0&_limit=10`); // tipar metodos y tipar get 
  }
  
  getListItem(id: number): Observable<Post> {
    return this._httClient.get<Post>(`${this.url}/posts/${id}`);
  }
  
  getComments(id: number): Observable<Comment[]> {
    return this._httClient.get<Comment[]>(`${this.url}/posts/${id}/comments`);
  }

}
