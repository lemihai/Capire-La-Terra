import { Component, OnInit, inject } from '@angular/core';
import { Api } from '../../environments/api'; // Check this path is correct
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // <-- New Import

@Component({
  selector: 'app-login-page',
  standalone: true, // <--- Add this flag
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {
  // Use Angular's inject function for services in standalone components
  private api = inject(Api);
  private http = inject(HttpClient); // <--- Inject HttpClient here

  RespText = 'test';
  testA: any = {};
  uri = 'http://localhost:3000';

  // You can remove the constructor if you use the inject function:
  // constructor(private api: Api) {}

  ngOnInit() {
    this.api.getData().subscribe({
      next: (data) => console.log(),
      error: (error) => console.error(),
    });

    this.api.getArticle().subscribe({
      next: (data) => {
        // console.log('API Data:', data);
        // **This is where you assign the received data**
        this.testA = data;
      },
      error: (error) => console.error(),
    });
  }

  login(username: string, password: string) {
    const credentials = { username, password };
    this.http.post(`${this.uri}/login`, credentials).subscribe({
      next: (response) => console.log('Success:', response),
      error: (err) => {
        console.error('Full error:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error body:', err.error);
      },
    });
  }

  // This method now works because HttpClient is injected (this.http)
  test() {
    console.log('8888888888888');
    this.RespText = this.testA[50].date;
    console.log(this.testA[50].date);
  }
}
