import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Episode {
  _id?: string;
  title: string;
  about: string[];
  author: string;
  date: string;
  number: number;
  season: number;
  imageUrl: string;
  audioUrl: string;
  sources: string[];
  transcript: string;
  posted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private readonly apiUrl = `${environment.apiUrl}/episodes`;
  private router = inject(Router);
  private http = inject(HttpClient);

  getAllEpisodes() {
    return this.http.get(`${this.apiUrl}/published`);
  }
  
  getOneEpisode(id: string): Observable<Episode> {
    // 💡 Key change: Add <Article> to the Observable type and http.get call
    return this.http.get<Episode>(`${this.apiUrl}/${id}`);
  }
  
  getLastEpisode():Observable<Episode> {
    return this.http.get<Episode>(`${environment.apiUrl}/lastEpisode`);
  }
}
