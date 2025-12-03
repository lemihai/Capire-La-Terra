import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import CustomEase from 'gsap/CustomEase';
import { AdminService } from '../admin-service';

export interface Article {
  _id?: string; // MongoDB ID (optional for new articles)
  title: string;
  author?: string;
  date?: string;
  text: string;
  summary: string;
  url: string;
  // Add other fields as needed
}

export interface NewsQuery {
  id?: string;
  author?: string;
  source?: string;
  date?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly apiUrl = `${environment.apiUrl}/articles`;
  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  constructor(private http: HttpClient) {}

  // --------------------------
  // GET Methods
  // --------------------------
  getAllNews() {
    console.log(environment.apiUrl);
    return this.http.get(`${environment.apiUrl}/articles`);
  }

  getOneNewsArticle(id: string) {
    console.log(environment.apiUrl);
    return this.http.get(`${environment.apiUrl}/articles:${id}`);
  }

  getNewsByParameters(query: NewsQuery): Observable<Article[]> {
    let params = new HttpParams();

    if (query.author) params = params.append('author', query.author);
    if (query.source) params = params.append('source', query.source);
    if (query.date) {
      const dateString = query.date instanceof Date ? query.date.toISOString() : query.date;
      params = params.append('date', dateString);
    }

    return this.http.get<Article[]>(this.apiUrl, { params });
  }

  /**
   * Trigger a web scrape and return the updated articles.
   */
  scrapeAndUpdateArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.apiUrl}/scrape`);
  }

  // --------------------------
  // POST: Add Articles
  // --------------------------
  addArticle(article: Article): Observable<{ insertedId: string }> {
    return this.http.post<{ insertedId: string }>(this.apiUrl, article);
  }

  // --------------------------
  // PUT: Update Articles
  // --------------------------
  updateArticle(id: string, article: Article): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, article, { responseType: 'text' });
  }

  // --------------------------
  // DELETE: Remove Articles
  // --------------------------
  deleteArticle(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
  // --------------------------
  // GSAP NEWS VIEW
  // --------------------------
  exitNewsView() {
    gsap.to('h2', {
      height: '0rem',
      minHeight: '0vh',
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
  }

  // --------------------------
  // GSAP NEWS ARTICLE VIEW
  // --------------------------
  exitNewsArticlesView() {
    gsap.to('h2', {
      height: '0rem',
      minHeight: '0vh',
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
  }

}
