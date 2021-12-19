import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private _httClient: HttpClient, private  _router: Router) { }

  getListItems() {
    this._httClient.get(`${this.url}/posts?_page=0&_limit=10`);
  }
}
