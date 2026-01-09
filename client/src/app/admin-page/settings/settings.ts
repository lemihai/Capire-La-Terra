import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  profilePicture = 'https://example.com/image.jpg';
  emailFocused = '';
  passwordFocused = '';

  email: string = '';

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
}
