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

  // You can remove the constructor if you use the inject function:
  // constructor(private api: Api) {}

  private authService = inject(AuthService);

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
    console.log('initialised');
  }

  // Login: admin, password
  login(username: string, password: string) {
    this.authService.login(username, password);
    // No need to handle the subscription here; AuthService does it.
  }

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
    console.log('works');
    if (type === 1) {
      this.emailFocused = 'email-focused';
      this.emailInput.nativeElement.focus();
    }
    if (type === 2) {
      this.passwordFocused = 'password-focused';
      this.passwordInput.nativeElement.focus();
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
