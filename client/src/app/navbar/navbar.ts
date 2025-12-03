import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  AfterViewInit, // 1. Import NgZone
} from '@angular/core';

import { Router, RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router'; // 2. Import Router
import { gsap } from 'gsap'; // 3. Import gsap (assuming it's installed)
import CustomEase from 'gsap/CustomEase';
import { filter, from } from 'rxjs';
import { NavbarGsapService } from './navbar-gsap-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true, // Assuming this is a standalone component based on the original snippet
})
export class Navbar implements OnInit, AfterViewInit {
  // Initial state for the Navbar component's load-in animation
  translateY: string = '-32px';
  backgroundColor = '';
  scale = '.8';
  opacity = '0';
  width = '0px';
  currentRoute: string = '';

  navbarObj = {
    home: 'active',
    episodes: '',
    news: '',
    admin: '',
    backgroundWidth: '87.56px',
    backgroundLeft: '',
    currentInFocus: 'home',
    languageItalian: 'ln-active',
    languageEnglish: 'ln-inactive',

    setActive(view: string) {
      if (view == 'home') {
        this.currentInFocus = 'home';

        this.home = 'active';
        this.episodes = '';
        this.news = '';
        this.admin = '';
        this.backgroundWidth = '87.56px';
        this.backgroundLeft = '.4rem';
      }
      if (view == 'episodes') {
        this.currentInFocus = 'episodes';

        this.home = '';
        this.episodes = 'active';
        this.news = '';
        this.admin = '';
        this.backgroundWidth = '102.31px';

        // this.backgroundLeft = '2rem';
        this.backgroundLeft = 'calc(.8rem + 65.16px)';
      }
      if (view == 'news') {
        this.currentInFocus = 'news';

        this.home = '';
        this.episodes = '';
        this.news = 'active';
        this.admin = '';
        this.backgroundWidth = '82.44px';
        this.backgroundLeft = 'calc(1.2rem + 65.16px + 79.91px)';
      }
      if (view == 'admin') {
        this.currentInFocus = 'admin';

        this.home = '';
        this.episodes = '';
        this.news = '';
        this.admin = 'active';
        this.backgroundWidth = '91.55px';
        this.backgroundLeft = 'calc(1.2rem + 65.16px + 82.44px + 60.04px)';
      }
    },

    hovered(button: string, flag: boolean) {
      // console.log(this.currentInFocus);
      switch (this.currentInFocus) {
        case 'home':
          // console.log('fioenwdfje');
          break;
        case 'episodes':
          // console.log('4352g5r');
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
          // console.log('c4m19xumh53');
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
              // this.backgroundWidth = '87.56px';
              this.backgroundLeft = 'calc(1.2rem + 65.16px + 102.31px)';
            }
            if (flag == false) {
              // this.backgroundWidth = '87.56px';
              this.backgroundLeft = 'calc(1.2rem + 65.16px + 79.91px)';
            }
          }
          break;
        case 'admin':
          // console.log('124hxm5789');
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
              // this.backgroundWidth = '87.56px';
              this.backgroundLeft = 'calc(1.5rem + 65.16px + 102.31px + 60.04px)';
            }
            if (flag == false) {
              // this.backgroundWidth = '87.56px';
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
  };

  // For animations in gsap
  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  // Inject ChangeDetectorRef, Router, and NgZone
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router, // 4. Inject Router
    private ngZone: NgZone, // 5. Inject NgZone
    private route: ActivatedRoute,
    private navbarGsapService: NavbarGsapService
  ) {}

  ngOnInit() {
    // ... your existing setTimeout ...
    setTimeout(() => {
      this.animateNavbarIn();
    }, 1600);

    // FIX: Subscribe to Router events to correctly determine the current route
    // after the initial navigation is complete, especially on refresh.
    this.router.events
      .pipe(
        // Filter for the NavigationEnd event, which signals the completion of a navigation cycle
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        // 'event.url' or 'event.urlAfterRedirects' now holds the correct, navigated URL
        this.currentRoute = event.urlAfterRedirects;
        this.logRouteInfo(this.currentRoute);
        this.updateNavbarActiveState(this.currentRoute); // Call a method to update the navbar's active state
      });
  }

  ngAfterViewInit(): void {
    // This is often too early on page load. The subscription in ngOnInit is more reliable.
    // If you need the URL immediately for any reason, use the snapshot.
    // However, the router.events subscription handles the refresh scenario best.
  }

  // Update logRouteInfo to accept the URL
  logRouteInfo(url: string) {
    // console.log(`--- Router URL (Corrected): ${url} ---`);
    // console.log(`Current Route set: ${this.currentRoute}`);
    // Example: You might want to strip query params or fragments here
  }

  // New method to process the route and set the navbarObj active state
  updateNavbarActiveState(url: string): void {
    // Logic to determine which view is active based on the URL
    // You'll need to match your routes ('/', '/episodes-page', etc.) to your navbarObj keys.
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
    }
    this.cdr.detectChanges(); // Ensure the view updates with the new state
  }

  animateNavbarIn() {
    this.width = '97%';
    this.translateY = '0px';
    this.scale = '1';
    this.opacity = '1';
    // Trigger change detection to apply CSS property updates
    this.cdr.detectChanges();

    // console.log('Navbar load-in animation finished.');
  }

  private triggerPageTransition(url: string, fromRoute: string) {
    const customEase = 'cubic-bezier(0,.55,.52,.96)';
    // console.log('THIS IS the route we are coming from', fromRoute);

    this.ngZone.runOutsideAngular(() => {
      // 1. Create a new GSAP Timeline
      const exitTimeline = gsap.timeline({
        // 2. Place the navigation logic in the timeline's main onComplete
        onComplete: () => {
          // --- Single Navigation Point ---
          this.ngZone.run(() => {
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
        0
      );

      // ******************************************
      // TRIGGER FOR HOME PAGE
      // ******************************************
      if (fromRoute == '/') {
        this.navbarGsapService.exitFrontPage(exitTimeline);
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
        // this.exitNewsPage();
        this.navbarGsapService.exitNewsPage();
      }

      if (fromRoute == '/article-page') {
        // this.exitNewsPage();
        this.navbarGsapService.exitArticlePage();
      }

      if (fromRoute == '/admin-page') {
        this.navbarGsapService.exitAdminPage();
      }

      if (fromRoute == '/login-page') {
        this.navbarGsapService.exitLoginPage();
      }

      // 3. Add the first animation to the timeline (starts at 0 seconds)

      // 4. Add the second animation to the timeline (starts at the same time)

      // The navigation will only fire when the timeline is complete,
      // which is after the longest animation (the 2-second one) finishes.
    });
  }

  // --- Public navigation methods called from the template (e.g., via (click) events) ---

  // Separate into change page transition from home or from episodes page.
  navigateToHome() {
    this.updateRoute();
    this.triggerPageTransition('/', this.currentRoute);
    this.navbarObj.setActive('home');
  }

  navigateToEpisodesPage() {
    this.updateRoute();
    this.triggerPageTransition('/episodes-page', this.currentRoute);
    this.navbarObj.setActive('episodes');
  }

  navigateToNewsPage() {
    this.updateRoute();
    this.triggerPageTransition('/news-page', this.currentRoute);
    this.navbarObj.setActive('news');
  }

  nagivateToAdminPage() {
    this.updateRoute();
    this.triggerPageTransition('/admin-page', this.currentRoute);
    this.navbarObj.setActive('admin');
  }

  nagivateToLoginPage() {
    this.updateRoute();
    this.triggerPageTransition('/login-page', this.currentRoute);
  }

  updateRoute() {
    this.currentRoute = this.router.url;
    // console.log('************-------*************');
    // console.log('Current route URL:', this.router.url);
    // console.log('************-------*************');
  }

}
