import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  scrapeNews(): Observable<any> {
    return this.http.get(`${this.url}/scrape`)
  }

  onLatestNewsClick(): void {
    this.scrapeNews().subscribe({
      next: (data) => console.log('News scraped successfully', data),
      error: (error) => console.error('Error scraping news', error)
    });
  }
}