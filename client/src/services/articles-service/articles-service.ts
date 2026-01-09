import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private readonly apiUrl = `${environment.apiUrl}/articles`;
  private router = inject(Router);
  private http = inject(HttpClient);

  getAllArticles() {
    return this.http.get(`${this.apiUrl}`);
  }
}
