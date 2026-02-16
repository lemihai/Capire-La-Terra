import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../service/admin-service';
import { Button } from '../../shared/buttons/button/button';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, Button],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements OnInit {
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;
  profilePicture = 'https://example.com/image.jpg';
  usernameFocused = '';
  emailFocused = '';
  passwordFocused = '';
  confirmPasswordFocused = '';

  currentUser: any = {};
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  eyeClosedVisible = 'eye-open';
  eyeOpenVisible = 'eye-invisible';
  buttonVisible = '';
  eyeOpenParent = '';
  passwordShow: string = 'password';

  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.adminService.getUser('test').subscribe(
      (data) => {
        this.currentUser = data[0];
        console.log(this.currentUser);
      },
      (error) => {
        console.log(error);
      },
    );
    this.cdr.detectChanges();
  }

  focusInput(type: number) {
    console.log('works');
    if (type === 1) {
      this.usernameFocused = 'focused';
      this.usernameInput.nativeElement.focus();
    }
    if (type === 2) {
      this.emailFocused = 'focused';
      this.emailInput.nativeElement.focus();
    }
    if (type === 3) {
      this.passwordFocused = 'focused';
      this.passwordInput.nativeElement.focus();
    }
    if (type === 4) {
      this.confirmPasswordFocused = 'focused';
      this.confirmPasswordInput.nativeElement.focus();
    }
  }

  checkPassTyped() {
    const isFilled = this.password.trim().length > 0;
    console.log(this.password, this.eyeClosedVisible);
    if (isFilled) {
      if (this.eyeClosedVisible === 'eye-open') {
        this.eyeClosedVisible = 'eye-open';
        this.eyeOpenVisible = 'eye-invisible';
        this.eyeOpenParent = '';
      }
      if (this.eyeOpenVisible === 'eye-open') {
        this.eyeClosedVisible = 'eye-invisible';
        this.eyeOpenVisible = 'eye-open';
        this.eyeOpenParent = 'eye-open-parent';
      }
      this.buttonVisible = 'buttonVisible';
    } else {
      this.eyeClosedVisible = 'eye-invisible';
      this.eyeOpenVisible = 'eye-invisible';
      this.buttonVisible = '';
      this.eyeOpenParent = '';
    }
  }

  showPassword() {
    if (this.passwordShow == 'password') {
      this.passwordShow = 'text';
      this.eyeClosedVisible = 'eye-invisible';
      this.eyeOpenVisible = 'eye-open';
    } else {
      this.passwordShow = 'password';
      this.eyeClosedVisible = 'eye-open';
      this.eyeOpenVisible = 'eye-invisible';
    }
    if (this.eyeOpenVisible === 'eye-open') {
      this.eyeOpenParent = 'eye-open-parent';
    } else {
      this.eyeOpenParent = '';
    }
    console.log(this.eyeOpenParent);
  }

  updatePassword() {
    // Basic validation
    if (!this.password || this.password !== this.confirmPassword) {
      console.log('Passwords do not match or are empty!');
      return;
    }

    if (!this.currentUser.id) {
      console.error('No user ID found');
      return;
    }

    this.adminService.updatePassword(this.currentUser.id, this.password).subscribe({
      next: (response) => {
        console.log('Password updated successfully', response);
        // Clear fields after success
        this.password = '';
        this.confirmPassword = '';
        this.checkPassTyped(); // Reset eye icon state
      },
      error: (err) => {
        console.error('Error updating password', err);
      },
    });
  }

  updateDetails() {
    if (!this.currentUser.id) {
      console.error('No user ID found');
      return;
    }

    // Create the payload from the ngModel bound data
    const updateBody = {
      name: this.currentUser.name,
      email: this.currentUser.email,
    };

    this.adminService.updateDetails(this.currentUser.id, updateBody).subscribe({
      next: (response) => {
        console.log('Profile updated successfully', response);
        // Optional: Show a success toast/notification
      },
      error: (err) => {
        console.error('Error updating profile', err);
      },
    });
  }
}
