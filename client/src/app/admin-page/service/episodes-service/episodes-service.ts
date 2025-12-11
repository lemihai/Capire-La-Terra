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
  about: string[];
  author: string;
  date: string;
  number: number;
  season: number;
  imageUrl: string,
  audioUrl: string,
  sources: string[];
  transcript: string;
  posted: boolean;
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
  
    getOneEpisode(id: string): Observable<Episode> {
      // 💡 Key change: Add <Article> to the Observable type and http.get call
      return this.http.get<Episode>(`${this.apiUrl}/${id}`);
  }
  
    // --------------------------
    // POST: Add Articles
    // --------------------------
  
    postEpisode(body: Episode) {
      return this.http.post(`${this.apiUrl}`, body);
    }
  
    // --------------------------
    // PUT: Replace Articles
    // --------------------------
  
    updateEpisode(episodeId: string, body: Episode){
      return this.http.put(`${this.apiUrl}/${episodeId}`, body);
    }
  
    // --------------------------
    // PATCH: Update Articles
    // --------------------------
  
    updatePostedEpisode(episodeId: string, status: boolean) {
      const body = { posted: status };
  
      return this.http.patch(`${this.apiUrl}/${episodeId}`, body);
    }
  
  //   updateEpisode(id: string, posted: boolean): Observable<any> {
  //     const url = `${this.apiUrl}/${id}`;
      
  //     // The body MUST be { posted: true } or { posted: false }
  //     return this.http.patch(url, { posted: posted }); 
  // }
  
    // --------------------------
    // DELETE: Remove Articles
    // --------------------------
  
    deleteEpisode(episodeId: string) {
      return this.http.delete(`${this.apiUrl}/${episodeId}`);
    }
  
    // --------------------------
    // GSAP NEWS VIEW
    // --------------------------
}
