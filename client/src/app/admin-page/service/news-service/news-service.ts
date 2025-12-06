import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import CustomEase from 'gsap/CustomEase';
import { AdminService } from '../admin-service';

export interface News {
  _id?: string; 
  title: string;
  author?: string;
  date?: string;
  text: string;
  summary: string;
  url: string;
  // Add other fields as needed
}

// db.runCommand({ renameCollection: "capirelaterra.scraperwebsites", to: "capirelaterra.articles" })

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
  private readonly apiUrl = `${environment.apiUrl}/news`;
  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  constructor(private http: HttpClient) {}

  // --------------------------
  // GET Methods
  // --------------------------
  getAllNews() {
    // console.log(environment.apiUrl);
    return this.http.get(`${environment.apiUrl}/news`);
  }

  getOneNewsArticle(id: string) {
    return this.http.get(`${environment.apiUrl}/news/${id}`);
  }

  getNewsByParameters(query: NewsQuery): Observable<News[]> {
    let params = new HttpParams();

    if (query.author) params = params.append('author', query.author);
    if (query.source) params = params.append('source', query.source);
    if (query.date) {
      const dateString = query.date instanceof Date ? query.date.toISOString() : query.date;
      params = params.append('date', dateString);
    }

    return this.http.get<News[]>(this.apiUrl, { params });
  }

  /**
   * Trigger a web scrape and return the updated articles.
   */
  scrapeAndUpdateArticles(): Observable<News[]> {
    return this.http.get<News[]>(`${environment.apiUrl}/scrape`);
  }

  // --------------------------
  // DELETE: Remove Articles
  // --------------------------
  deleteNewsArticle(id: string): Observable<string> {
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
