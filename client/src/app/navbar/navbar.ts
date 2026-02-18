import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { filter, Observable } from 'rxjs';
import { NavbarGsapService } from './navbar-gsap-service';
import { AuthService } from '../../services/login-service/auth-service';
import { ProfileCard } from '../shared/components/profile-card/profile-card';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, ProfileCard],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true,
})
export class Navbar implements OnInit, AfterViewInit {
  // Initial state for the Navbar component's load-in animation
  isLoggedIn$!: Observable<boolean>;
  translateY: string = '-32px';
  backgroundColor = '';
  scale = '.8';
  opacity = '0';
  width = '0px';
  currentRoute: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private navbarGsapService: NavbarGsapService,
    private authService: AuthService,
  ) {}

  // ViewPortWidth for responsiveness
  // 768px breakpoint
  viewportWidth = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.viewportWidth = window.innerWidth;
    this.navbarObj.viewPortWidthNav = this.viewportWidth;
    this.updateNavbarActiveState(this.currentRoute);
    this.cdr.detectChanges();
  }

  navbarObj = {
    viewPortWidthNav: this.viewportWidth,
    home: 'active',
    episodes: '',
    news: '',
    admin: '',
    login: '',
    iconHome: 'nav-small-icon-active',
    iconEpisodes: '',
    iconNews: '',
    iconaAdmin: '',
    iconLogin: '',
    backgroundWidth: '87.56px',
    backgroundHeight: '3.2rem',
    backgroundLeft: '',
    backgroundTop: '0rem',
    isOnAdmin: 'nav-onAdmin',

    loginBackgroundWidth: '0rem',
    loginBackgroundHeight: '.8rem',
    loginBackgroundLeft: '-8rem',

    currentInFocus: 'home',
    languageItalian: 'ln-active',
    languageEnglish: 'ln-inactive',

    previousActive: 'home',

    setActive(view: string) {
      if (this.viewPortWidthNav > 792) {
        if (view == 'home') {
          this.currentInFocus = 'home';
          this.isOnAdmin = '';

          this.home = 'active';
          this.episodes = '';
          this.news = '';
          this.admin = '';
          this.login = '';
          this.backgroundWidth = '87.56px';
          this.backgroundHeight = '3.2rem';
          this.backgroundLeft = '.4rem';

          this.loginBackgroundWidth = '0rem';
          this.loginBackgroundHeight = '3.2rem';
          this.loginBackgroundLeft = '-6rem';

          this.previousActive = view;
        }
        if (view == 'episodes') {
          this.currentInFocus = 'episodes';
          this.isOnAdmin = '';

          this.home = '';
          this.episodes = 'active';
          this.news = '';
          this.admin = '';
          this.login = '';
          this.backgroundWidth = '102.31px';
          this.backgroundHeight = '3.2rem';
          this.backgroundLeft = 'calc(.8rem + 65.16px)';

          this.loginBackgroundWidth = '0rem';
          this.loginBackgroundHeight = '3.2rem';
          this.loginBackgroundLeft = '-6rem';

          this.previousActive = view;
        }
        if (view == 'news') {
          this.currentInFocus = 'news';
          this.isOnAdmin = '';

          this.home = '';
          this.episodes = '';
          this.news = 'active';
          this.admin = '';
          this.login = '';
          this.backgroundWidth = '82.44px';
          this.backgroundHeight = '3.2rem';
          this.backgroundLeft = 'calc(1.2rem + 65.16px + 79.91px)';

          this.loginBackgroundWidth = '0rem';
          this.loginBackgroundHeight = '3.2rem';
          this.loginBackgroundLeft = '-6rem';

          this.previousActive = view;
        }
        if (view == 'admin') {
          this.currentInFocus = 'admin';
          this.isOnAdmin = 'nav-onAdmin';

          this.home = '';
          this.episodes = '';
          this.news = '';
          this.admin = 'active';
          this.login = '';

          this.backgroundWidth = '91.55px';
          this.backgroundHeight = '3.2rem';
          this.backgroundLeft = 'calc(1.2rem + 65.16px + 82.44px + 60.04px)';

          this.loginBackgroundWidth = '0rem';
          this.loginBackgroundHeight = '3.2rem';
          this.loginBackgroundLeft = '-6rem';

          this.previousActive = view;
        }
        if (view == 'login') {
          this.currentInFocus = 'login';
          this.isOnAdmin = '';

          this.home = '';
          this.episodes = '';
          this.news = '';
          this.admin = '';
          this.login = 'active';
          if (this.previousActive === 'admin') {
            this.backgroundWidth = '0px';
            this.backgroundHeight = '3.2rem';
            this.backgroundLeft = 'calc(1.2rem + 65.16px + 82.44px + 60.04px + 10rem)';
          } else if (this.previousActive === 'news') {
            this.backgroundWidth = '0px';
            this.backgroundHeight = '3.2rem';
            this.backgroundLeft = 'calc(1.2rem + 65.16px + 79.91px + 16rem)';
          } else if (this.previousActive === 'episodes') {
            this.backgroundWidth = '0px';
            this.backgroundHeight = '3.2rem';
            this.backgroundLeft = 'calc(.8rem + 65.16px + 28rem)';
          } else if (this.previousActive === 'home') {
            this.backgroundWidth = '0px';
            this.backgroundHeight = '3.2rem';
            this.backgroundLeft = 'calc(.4rem + 38rem)';
          } else {
            this.backgroundWidth = '0px';
            this.backgroundHeight = '.8rem';
          }

          this.loginBackgroundWidth = '7.87rem';
          this.loginBackgroundHeight = '3.2rem';
          this.loginBackgroundLeft = '.4rem';

          this.previousActive = view;
        }
      } else {
        if (view == 'home') {
          this.currentInFocus = 'home';
          this.isOnAdmin = '';

          this.home = 'active';
          this.episodes = '';
          this.news = '';
          this.admin = '';
          this.login = '';
          this.backgroundTop = '5.1rem';
          this.backgroundHeight = '4.8rem';
          this.backgroundLeft = '.8rem';
          this.previousActive = view;
        }
        if (view == 'episodes') {
          this.currentInFocus = 'episodes';
          this.isOnAdmin = '';

          this.home = '';
          this.episodes = 'active';
          this.news = '';
          this.admin = '';
          this.login = '';
          this.backgroundTop = 'calc(5.1rem + 1.2rem + 4.8rem)';
          this.backgroundHeight = '4.8rem';
          this.backgroundLeft = '.8rem';
          this.previousActive = view;
        }
        if (view == 'news') {
          this.currentInFocus = 'news';
          this.isOnAdmin = '';

          this.home = '';
          this.episodes = '';
          this.news = 'active';
          this.admin = '';
          this.login = '';
          this.backgroundTop = 'calc(5.1rem + 1.2rem * 2 + 4.8rem * 2)';
          this.backgroundHeight = '4.8rem';
          this.backgroundLeft = '.8rem';
          this.previousActive = view;
        }
        if (view == 'admin') {
          this.currentInFocus = 'admin';
          this.isOnAdmin = 'nav-onAdmin';

          this.home = '';
          this.episodes = '';
          this.news = '';
          this.admin = 'active';
          this.login = '';
          this.backgroundTop = 'calc(5.1rem + 1.2rem * 3 + 4.8rem * 3)';
          this.backgroundHeight = '4.8rem';
          this.backgroundLeft = '.8rem';
          this.previousActive = view;
        }
        if (view == 'login') {
          this.currentInFocus = 'login';
          this.isOnAdmin = '';

          this.home = '';
          this.episodes = '';
          this.news = '';
          this.admin = '';
          this.login = 'active';
          this.backgroundTop = 'calc(5.1rem + 1.2rem * 3 + 4.8rem * 3)';
          this.backgroundHeight = '4.8rem';
          this.backgroundLeft = '.8rem';
          this.previousActive = view;
        }
      }
    },

    hovered(button: string, flag: boolean) {
      switch (this.currentInFocus) {
        case 'home':
          break;
        case 'episodes':
          if (button == 'home') {
            if (flag == true) {
              this.backgroundLeft = 'calc(.8rem + 87.56px)';
            }
            if (flag == false) {
              this.backgroundLeft = 'calc(.8rem + 65.16px)';
            }
          }

          break;

        case 'news':
          if (button == 'home') {
            if (flag == true) {
              this.backgroundLeft = 'calc(1.2rem + 87.56px + 79.91px)';
            }
            if (flag == false) {
              this.backgroundLeft = 'calc(1.2rem + 65.16px + 79.91px)';
            }
          }

          if (button == 'episodes') {
            if (flag == true) {
              this.backgroundLeft = 'calc(1.2rem + 65.16px + 102.31px)';
            }
            if (flag == false) {
              this.backgroundLeft = 'calc(1.2rem + 65.16px + 79.91px)';
            }
          }
          break;
        case 'admin':
          if (button == 'home') {
            if (flag == true) {
              this.backgroundLeft = 'calc(1.5rem + 87.56px + 79.91px + 60.04px)';
            }
            if (flag == false) {
              this.backgroundLeft = 'calc(1.5rem + 65.16px + 79.91px + 60.04px)';
            }
          }

          if (button == 'episodes') {
            if (flag == true) {
              this.backgroundLeft = 'calc(1.5rem + 65.16px + 102.31px + 60.04px)';
            }
            if (flag == false) {
              this.backgroundLeft = 'calc(1.5rem + 65.16px + 79.91px + 60.04px)';
            }
          }
          if (button == 'news') {
            if (flag == true) {
              this.backgroundLeft = 'calc(1.5rem + 65.16px + 79.91px + 82.44px)';
            }
            if (flag == false) {
              this.backgroundLeft = 'calc(1.5rem + 65.16px + 79.91px + 60.04px)';
            }
          }
          break;

        default:
      }
    },

    setLanguage(language: string) {
      if (language === 'italian') {
        this.languageItalian = 'ln-active';
        this.languageEnglish = 'ln-inactive';
      }
      if (language === 'english') {
        this.languageItalian = 'ln-inactive';
        this.languageEnglish = 'ln-active';
      }
    },

    // ************************
    // FOR MOBILE
    // ************************

    chevronExpanded: '',
  };

  socials = {
    capireLaTerraInsta: 'https://www.instagram.com/capirelaterrapodcast/',
    capireLaTerraSpotify: 'https://open.spotify.com/show/0lBbMLBVG9USZhiTZeOU8E',
    capireLaTerraInstaApp: 'instagram://user?username=capirelaterrapodcast',
    capireLaTerraSpotifyApp: 'spotify:show:0lBbMLBVG9USZhiTZeOU8E',
  };

  // For animations in gsap
  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  ngOnInit() {
    setTimeout(() => {
      this.animateNavbarIn();
    }, 1600);

    this.isLoggedIn$ = this.authService.isAuthenticated$;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        this.logRouteInfo(this.currentRoute);
        this.updateNavbarActiveState(this.currentRoute);
      });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // --------------------------
        // Navigation
        // --------------------------
        gsap.to('.nav-logo-wrapper', {
          translateX: '.8rem',
          translateY: '.8rem',
          opacity: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: 'auto',
        });
        gsap.to('.nav-login-navigation', {
          translateX: '-.8rem',
          translateY: '.8rem',
          opacity: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: 'auto',
        });
      }, 2400);
      setTimeout(() => {
        // --------------------------
        // Navigation
        // --------------------------
        gsap.to('.nav-main-navigation', {
          translateX: '0rem',
          translateY: '.8rem',
          opacity: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: 'auto',
        });
      }, 3200);
    });
  }

  // Update logRouteInfo to accept the URL
  logRouteInfo(url: string) {}

  // Process the route and set the navbarObj active state
  updateNavbarActiveState(url: string): void {
    if (url === '/') {
      this.navbarObj.setActive('home');
    } else if (url.startsWith('/episodes-page')) {
      this.navbarObj.setActive('episodes');
    } else if (url.startsWith('/news-page')) {
      this.navbarObj.setActive('news');
    } else if (url.startsWith('/admin-page')) {
      this.navbarObj.setActive('admin');
    } else if (url.startsWith('/article-page')) {
      this.navbarObj.setActive('news');
    } else if (url.startsWith('/login')) {
      this.navbarObj.setActive('login');
    }
    this.cdr.detectChanges();
  }

  animateNavbarIn() {
    this.width = '97%';
    this.translateY = '0px';
    this.scale = '1';
    this.opacity = '1';

    this.cdr.detectChanges();
  }

  private triggerPageTransition(url: string, fromRoute: string) {
    const customEase = 'cubic-bezier(0,.55,.52,.96)';

    this.ngZone.runOutsideAngular(() => {
      const exitTimeline = gsap.timeline({
        onComplete: () => {
          this.ngZone.run(() => {
            // setTimeout(()=>{

            // WINDOW SCROLLS TO TOP
            window.scrollTo({
              top: 0,
              // behavior: 'smooth',
              behavior: 'instant',
            });
            // },200);
            this.router.navigate([url]);
          });
        },
      });

      // ******************************************
      // TRIGGER FOR GLOBAL ELEMENTS THAT ARE EVERYWHERE
      // ******************************************

      exitTimeline.to(
        '.hero-h1',
        {
          height: '0px',
          width: '0px',
          y: -0,
          skewX: 32,
          skewY: 8,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
        },
        0,
      );

      // ******************************************
      // TRIGGER FOR HOME PAGE
      // ******************************************
      if (fromRoute == '/') {
        this.navbarGsapService.exitFrontPage();
      }

      // ******************************************
      // TRIGGER FOR EPISODES PAGE
      // ******************************************
      if (fromRoute == '/episodes-page') {
        this.navbarGsapService.exitEpisodesPage();
      }

      // ******************************************
      // TRIGGER FOR NEWS PAGE
      // ******************************************
      if (fromRoute == '/news-page') {
        this.navbarGsapService.exitNewsPage();
      }

      if (fromRoute.includes('/article-page')) {
        this.navbarGsapService.exitArticlePage();
      }

      if (fromRoute == '/admin-page') {
        this.navbarGsapService.exitAdminPage();
      }

      if (fromRoute == '/login-page') {
        this.navbarGsapService.exitLoginPage();
      }
    });
  }

  // Separate into change page transition from home or from episodes page.
  navigateToHome() {
    this.updateRoute();
    this.triggerPageTransition('/', this.currentRoute);
    this.navbarObj.setActive('home');
    if (this.viewportWidth < 792) {
      this.navbarGsapService.navbarCollapse();
      this.navbarObj.chevronExpanded = '';
    }
  }

  navigateToEpisodesPage() {
    this.updateRoute();
    this.triggerPageTransition('/episodes-page', this.currentRoute);
    this.navbarObj.setActive('episodes');
    if (this.viewportWidth < 792) {
      this.navbarGsapService.navbarCollapse();
      this.navbarObj.chevronExpanded = '';
    }
  }

  navigateToNewsPage() {
    this.updateRoute();
    this.triggerPageTransition('/news-page', this.currentRoute);
    this.navbarObj.setActive('news');
    if (this.viewportWidth < 792) {
      this.navbarGsapService.navbarCollapse();
      this.navbarObj.chevronExpanded = '';
    }
  }

  nagivateToAdminPage() {
    this.updateRoute();
    this.triggerPageTransition('/admin-page', this.currentRoute);
    this.navbarObj.setActive('admin');
    if (this.viewportWidth < 792) {
      this.navbarGsapService.navbarCollapse();
      this.navbarObj.chevronExpanded = '';
    }
  }

  nagivateToLoginPage() {
    this.updateRoute();
    this.triggerPageTransition('/login-page', this.currentRoute);
    if (this.viewportWidth < 792) {
      this.navbarGsapService.navbarCollapse();
      this.navbarObj.chevronExpanded = '';
    }
  }

  updateRoute() {
    this.currentRoute = this.router.url;
  }

  // ************************
  // FOR MOBILE
  // ************************
  expandNavbar() {
    if (this.navbarObj.chevronExpanded === '') {
      this.navbarGsapService.navbarExpand();
      this.navbarObj.chevronExpanded = 'nav-small-chevron-active';
    } else {
      this.navbarGsapService.navbarCollapse();
      this.navbarObj.chevronExpanded = '';
    }
  }
}
