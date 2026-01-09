import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../environments/api'; // Check this path is correct
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Button } from '../shared/buttons/button/button'; // <-- New Import

import { AuthService } from '../../services/login-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true, // <--- Add this flag
  imports: [FormsModule, Button],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit, OnChanges {
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  // Use Angular's inject function for services in standalone components
  private api = inject(Api);
  private http = inject(HttpClient); // <--- Inject HttpClient here
  private authService = inject(AuthService);
  private router = inject(Router);

  emailFocused = '';
  passwordFocused = '';

  eyeOpenVisible = 'none';
  eyeClosedVisible = 'none';
  buttonVisible = '';

  testA: any = {};
  uri = 'http://localhost:3000';

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  error: string = '';
  alertBoxActive: string = '';
  passwordShow: string = 'password';

  // You can remove the constructor if you use the inject function:
  // constructor(private api: Api) {}

  checkPassTyped() {
    const isFilled = this.password.trim().length > 0;
    if (isFilled) {
      this.eyeClosedVisible = '';
      this.eyeOpenVisible = 'none';
      this.buttonVisible = 'buttonVisible';
    } else {
      // Hide the icons when the password is empty
      this.eyeClosedVisible = 'none';
      this.eyeOpenVisible = 'none';
      this.buttonVisible = '';
    }
  }

  ngOnInit() {
    // console.log('initialised');
  }

  // Login: admin, password
  login(username: string, password: string) {
    console.log(1);
        console.log(1);
        console.log(this.rememberMe);
        console.log(1);
        console.log(1);
    this.authService.login(username, password, this.rememberMe).subscribe({
      next: (response) => {
        if (response.success && response.token) {
          this.router.navigate(['/admin-page']);
        } else {
          this.error = 'error';
          this.alertBoxActive = 'alert-active';
          this.router.navigate(['/login-page']);
          this.email = '';
          this.password = '';
          console.error('Login failed:', response.message);
        }
      },
      error: (err) => {
        this.error = 'error';
        this.alertBoxActive = 'alert-active';
        this.router.navigate(['/login-page']);
        this.email = '';
        this.password = '';
        
      },
    });
  }
  /*
  login(username: string, password: string) {
    try {
      this.authService.login(username, password);
    } catch (error) {
      console.log(error);
    }
  }
  */

  // login(username: string, password: string) {
  //   // console.log('POPEFKPOFWKE', this.password);
  //   console.log(password, username);
  //   const credentials = { username, password };
  //   this.http.post(`${this.uri}/login`, credentials).subscribe({
  //     next: (response) => {
  //       console.log('Success:', response);
  //     },
  //     error: (err) => {
  //       console.error('Full error:', err);
  //       console.error('Error status:', err.status);
  //       console.error('Error message:', err.message);
  //       console.error('Error body:', err.error);
  //     },
  //   });
  // }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.password);
  }

  focusInput(type: number) {
    // console.log('works');
    if (type === 1) {
      this.emailFocused = 'email-focused';
      this.emailInput.nativeElement.focus();
      if ((this.error = 'error')) {
        this.error = '';
        this.alertBoxActive = '';
      }
    }
    if (type === 2) {
      this.passwordFocused = 'password-focused';
      this.passwordInput.nativeElement.focus();
      if ((this.error = 'error')) {
        this.error = '';
        this.alertBoxActive = '';
      }
    }
  }

  showPassword(){
    if(this.passwordShow == 'password'){
      this.passwordShow = 'text';
    } else {
      this.passwordShow = 'password';
    }
  }

  // remove the input field focus
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const emailInputClicked = this.emailInput.nativeElement.contains(event.target);
    const passwordInputClicked = this.passwordInput.nativeElement.contains(event.target);

    if (!emailInputClicked) {
      this.emailFocused = '';
    }
    if (!passwordInputClicked) {
      this.passwordFocused = '';
    }
  }
}
