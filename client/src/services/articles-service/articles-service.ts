import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { Article } from '../../app/admin-page/service/articles-service/articles-service';

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

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly apiUrl = `${environment.apiUrl}/articles`;
  private router = inject(Router);
  private http = inject(HttpClient);

  getAllArticles() {
    return this.http.get(`${this.apiUrl}/published`);
  }
  // getAllPublishedArticles() {
  //   return this.http.get(`${this.apiUrl}/published`);
  // }

  getOneArticle(id: string): Observable<Article> {
    // 💡 Key change: Add <Article> to the Observable type and http.get call
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }
}
