import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../service/admin-service';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements OnInit {
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  profilePicture = 'https://example.com/image.jpg';
  emailFocused = '';
  passwordFocused = '';

  email: string = '';

  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.adminService.getUser('test').subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
    );
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
}
