import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import CustomEase from 'gsap/CustomEase';
import { AdminService } from '../admin-service';

// Add image
export interface Episode {
  _id: string;
  title: string;
  about: string;
  date: string;
  number: number;
  season: number;
  sources: string[];
  transcript: string;
  episode: '';
}



@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private readonly apiUrl = `${environment.apiUrl}/episodes`;
  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  constructor(private http: HttpClient) {}

  // --------------------------
  // GET Methods
  // --------------------------
  getAllEpisodes() {
    // console.log(environment.apiUrl);
    return this.http.get(`${this.apiUrl}`);
  }
}
