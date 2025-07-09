import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RobotsService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  getRobots(): Observable<any> {
    return this.http.get(`${this.url}/news`);
  }
}
