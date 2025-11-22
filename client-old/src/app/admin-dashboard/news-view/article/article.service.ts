import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ 
    providedIn: 'root' 
})
export class ArticleService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  getArticles(): Observable<any> {
    return this.http.get(`${this.url}/articles`)
  }
}


