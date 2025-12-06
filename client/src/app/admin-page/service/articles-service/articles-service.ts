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
  text: string;
  sources: string[];
  summary: string;
}

@Injectable({
  providedIn: 'root',
})
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

  // --------------------------
  // POST: Add Articles
  // --------------------------

  // --------------------------
  // PUT: Update Articles
  // --------------------------

  // --------------------------
  // DELETE: Remove Articles
  // --------------------------

  deleteArticle(articleId:string){
    return this.http.delete(`${this.apiUrl}/:${articleId}`)
  }

  // --------------------------
  // GSAP NEWS VIEW
  // --------------------------
}
