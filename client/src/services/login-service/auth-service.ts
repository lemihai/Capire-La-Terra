import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly SESSION_EXPIRATION_TOKEN = 'SESSION_EXPIRATION_TOKEN';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  // private currentUser: Observable<any>

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  login(username: string, password: string) {
    const credentials = { username, password };
    this.http.post<LoginResponse>(`${environment.apiUrl}/login`, credentials).subscribe({
      next: (response: LoginResponse) => {
        if (response.success && response.token) {
          this.storeToken(response.token);
          this.isAuthenticated.next(true);
          this.router.navigate(['/admin-page']);
          console.log('Login successful:', response);
        } else {
          console.error('Login failed:', response.message);
        }
      },
      // this.router.navigate(['/dashboard']),
      error: (err) => {
        console.error('Full error:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error body:', err.error);
      },
    });
  }

  storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
    const decodedToken = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp! * 1000);
    const iat = new Date(decodedToken.iat! * 1000);
    console.log('DecodedToken: ', decodedToken);
    // expiresAt += 1000;
    console.log('expires at:' ,expiresAt, 'IAT:', iat);
    console.log(expiresAt.toISOString());
    localStorage.setItem(this.SESSION_EXPIRATION_TOKEN, expiresAt.toISOString());
  }

  private checkToken(): void {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      const decoded = jwtDecode(token);
      const expiresAt = new Date(decoded.exp! * 1000);
      if (new Date() < expiresAt) {
        this.isAuthenticated.next(true);
      } else {
        this.logout();
      }
    }
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.SESSION_EXPIRATION_TOKEN);
    this.isAuthenticated.next(false);
    this.router.navigate(['/login-page']);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
