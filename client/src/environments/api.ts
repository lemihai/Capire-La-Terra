import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {}

  getData() {
    console.log(environment.apiUrl);
    return this.http.get(`${environment.apiUrl}/articles`);
  }

  getArticle(){
    // console.log(environment.apiUrl);
   let articles = this.http.get(`${environment.apiUrl}/articles`)
  //  let article = articles[1];
    return this.http.get(`${environment.apiUrl}/articles`);
  }

  login(_req:any){
    console.log('API-ts');
    let login = this.http.post(`${environment.apiUrl}/login-page`, _req.body);
    return login;
  }
}
