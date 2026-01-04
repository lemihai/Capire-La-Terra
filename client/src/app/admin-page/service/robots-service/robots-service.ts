import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import CustomEase from 'gsap/CustomEase';
import { AdminService } from '../admin-service';

export interface NewsWebsite {
  _id?: string;
  name: string;
  url: string;
  status: string;
}

export interface ScrapeQuery {
  id?: string;
  scrapers?: {
    // Nested object
    scraper1?: boolean;
    scraper2?: boolean;
    scraper3?: boolean;
  };
}

@Injectable(
  // {providedIn: 'root',}
)
export class RobotsService {
  private readonly apiUrl = `${environment.apiUrl}/newsWebsites`;
  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  constructor(private http: HttpClient) {}

  // --------------------------
  // GET Methods
  // --------------------------
  getRobots() {
    return this.http.get<NewsWebsite[]>(`${this.apiUrl}`);
  }

  startScraper(name: string|undefined){
    return this.http.get(`${this.apiUrl}/scrape/${name}`)
  }
}
