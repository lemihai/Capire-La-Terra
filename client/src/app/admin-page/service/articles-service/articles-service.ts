import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import CustomEase from 'gsap/CustomEase';
import { AdminService } from '../admin-service';

export interface Article {
  _id: string;
  title: string;
  date: string;
  author: string;
  url: string;
  imageUrl: string;
  text: string[];
  sources: string[];
  summary: string;
  posted: boolean;
}

@Injectable(
  // {providedIn: 'root',}
)
export class ArticlesService {
  private readonly apiUrl = `${environment.apiUrl}/articles`;
  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  constructor(private http: HttpClient) {}

  // --------------------------
  // GET Methods
  // --------------------------
  getAllArticles() {
    // console.log(environment.apiUrl);
    return this.http.get(`${this.apiUrl}`);
  }

  getOneArticle(id: string): Observable<Article> {
    // 💡 Key change: Add <Article> to the Observable type and http.get call
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
}

  // --------------------------
  // POST: Add Articles
  // --------------------------

  postArticle(body: Article) {
    return this.http.post(`${this.apiUrl}`, body);
  }

  // --------------------------
  // PUT: Replace Articles
  // --------------------------

  updateArticle(articleId: string, body: Article){
    return this.http.put(`${this.apiUrl}/${articleId}`, body);
  }

  // --------------------------
  // PATCH: Update Articles
  // --------------------------

  updatePostedArticle(articleId: string, status: boolean) {
    const body = { posted: status };

    return this.http.patch(`${this.apiUrl}/${articleId}`, body);
  }

//   updateArticle(id: string, posted: boolean): Observable<any> {
//     const url = `${this.apiUrl}/${id}`;
    
//     // The body MUST be { posted: true } or { posted: false }
//     return this.http.patch(url, { posted: posted }); 
// }

  // --------------------------
  // DELETE: Remove Articles
  // --------------------------

  deleteArticle(articleId: string) {
    return this.http.delete(`${this.apiUrl}/${articleId}`);
  }

  // --------------------------
  // GSAP NEWS VIEW
  // --------------------------
}
