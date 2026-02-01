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
import { Api } from '../../environments/api';
import { HttpClient } from '@angular/common/http';
import { Button } from '../shared/buttons/button/button';

import { AuthService } from '../../services/login-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit, OnChanges {
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  private api = inject(Api);
  private http = inject(HttpClient);
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

  checkPassTyped() {
    const isFilled = this.password.trim().length > 0;
    if (isFilled) {
      this.eyeClosedVisible = '';
      this.eyeOpenVisible = 'none';
      this.buttonVisible = 'buttonVisible';
    } else {
      this.eyeClosedVisible = 'none';
      this.eyeOpenVisible = 'none';
      this.buttonVisible = '';
    }
  }

  ngOnInit() {}

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

  showPassword() {
    if (this.passwordShow == 'password') {
      this.passwordShow = 'text';
    } else {
      this.passwordShow = 'password';
    }
  }

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
