import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  HostListener,
  OnChanges,
  SimpleChanges,
  NgZone,
  AfterViewInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/login-service/auth-service';
import { Router } from '@angular/router';

// GSAP Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';
import { NavbarGsapService } from '../navbar/navbar-gsap-service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  private authService = inject(AuthService);
  private router = inject(Router);
  private navbarGsap = inject(NavbarGsapService);
  private ngZone = inject(NgZone);
  private smoother: ScrollSmoother | null = null;

  emailFocused = '';
  passwordFocused = '';

  eyeClosedVisible = 'eye-open';
  eyeOpenVisible = 'eye-invisible';
  buttonVisible = '';
  eyeOpenParent = '';

  testA: any = {};
  uri = 'http://localhost:3000';

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  error: string = '';
  alertBoxActive: string = '';
  passwordShow: string = 'password';

  // variables for GSAP
  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  checkPassTyped() {
    const isFilled = this.password.trim().length > 0;
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

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // Create the smoother instance

       const isTouchDevice = () => 
      'ontouchstart' in window || navigator.maxTouchPoints > 0;


      this.smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: isTouchDevice() ? 0 : 1,       
        effects: !isTouchDevice(), 
        normalizeScroll: false,
        ignoreMobileResize: true,
        smoothTouch: false,
      });

      setTimeout(() => {
        // --------------------------------
        // TEXT SECTION
        // --------------------------------
        gsap.to('.image-wrapper', {
          height: '100%',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.image', {
          height: '100vh',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-A', {
          height: 'auto',
          x: 0,
          y: 0,
          skewX: 0,
          skewY: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-B', {
          width: '100%',
          minWidth: '30rem',
          opacity: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-C', {
          opacity: '.4',
          scale: 1,
          duration: this.timeFast,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-login-button', {
          width: '100%',
          minWidth: '26.8rem',
          opacity: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-D', {
          height: '2rem',
          widows: '2rem',
          x: 0,
          y: 0,
          opacity: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-icon', {
          height: '100%',
          width: '2.4rem',
          scale: 1,
          opacity: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
      }, 400);
    });
  }

  login(username: string, password: string) {
    this.authService.login(username, password, this.rememberMe).subscribe({
      next: (response) => {
        if (response.success && response.token) {
          this.navbarGsap.exitLoginPage();
          setTimeout(() => {
            this.router.navigate(['/admin-page']);
          }, 800);
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
