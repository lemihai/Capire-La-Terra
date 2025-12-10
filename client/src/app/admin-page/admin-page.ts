import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterModule,
  RouterLink,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';

// GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  imports: [RouterOutlet],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
})
export class AdminPage implements OnInit, OnDestroy, AfterViewInit {
  private smoother: ScrollSmoother | null = null;
  buttonHoverTop = '';
  bottomHoverBottom = 'auto';
  buttonActive = '';

  Sidebar = {
    dashbaord: 'active',
    news: '',
    articles: '',
    episodes: '',
    robots: '',
    settings: '',
    logout: '',

    currentRoute: '',

    setActive(view: string) {
      if (view == 'admin-page') {
        this.dashbaord = 'active';
        this.news = '';
        this.articles = '';
        this.episodes = '';
        this.robots = '';
        this.settings = '';
        this.logout = '';
      }
      if (view == 'news-view') {
        this.dashbaord = '';
        this.news = 'active';
        this.articles = '';
        this.episodes = '';
        this.robots = '';
        this.settings = '';
        this.logout = '';
      }
      if (view == 'articles-view') {
        this.dashbaord = '';
        this.news = '';
        this.articles = 'active';
        this.episodes = '';
        this.robots = '';
        this.settings = '';
        this.logout = '';
      }
      if (view == 'episodes-view') {
        this.dashbaord = '';
        this.news = '';
        this.articles = '';
        this.episodes = 'active';
        this.robots = '';
        this.settings = '';
        this.logout = '';
      }
      if (view == 'robots-view') {
        this.dashbaord = '';
        this.news = '';
        this.articles = '';
        this.episodes = '';
        this.robots = 'active';
        this.settings = '';
        this.logout = '';
      }
      if (view == 'settings') {
        this.dashbaord = '';
        this.news = '';
        this.articles = '';
        this.episodes = '';
        this.robots = '';
        this.settings = 'active';
        this.logout = '';
      }
      if (view == 'logout') {
        this.dashbaord = '';
        this.news = '';
        this.articles = '';
        this.episodes = '';
        this.robots = '';
        this.settings = '';
        this.logout = 'active';
      }
    },
  };

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  ngOnInit() {
    // Register GSAP plugins
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    });
    const currentRouter = this.router.url;

    // Set the initial active sidebar based on the current route
    let currentRoute = this.router.url.split('/').pop() || 'admin-page';
    if (currentRouter.includes('news-article-view')) {
      currentRoute = currentRouter;
    }
    if (currentRouter.includes('new-article')) {
      currentRoute = currentRouter;
    }
    if (currentRouter.includes('admin-article-page')) {
      let routeSplit = currentRouter.split('/articles-view').pop();

      if (typeof routeSplit === 'string') {
        currentRoute = routeSplit;
      }
    }
    if (currentRouter.includes('robots-view')) {
      // currentRoute = currentRouter;
    }
    if (currentRouter.includes('episodes-view')) {
      // currentRoute = currentRouter;
    }
    // if (currentRouter.includes('admin-article-page')) {
    //
    //   currentRoute = currentRouter;
    //
    // }

    // console.log('');
    // console.log('');
    // console.log(32, currentRoute);
    // console.log('');
    // console.log('');

    this.SetSidebarView(currentRoute);

    // Subscribe to future route changes
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.Sidebar.currentRoute = event.urlAfterRedirects;

        //HERE IS THE PLACE WHERE THE NEW ARTICLE ERROR APPEARS BECAUSE IT REDIRECTS TO NEWS-ARTICLE FOR SOME REASON. THE FIRST ONE IS NICE
        // if (this.Sidebar.currentRoute.includes('new-article')) {
        //   this.Sidebar.currentRoute = 'new-article';
        // }

        //
        //
        //
        //
        //

        // this.SetSidebarView(this.Sidebar.currentRoute);
      });

    // this.cdr.detectChanges();
  }

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Create the smoother instance
      this.smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        normalizeScroll: false,
        ignoreMobileResize: true,
        smoothTouch: false,
      });

      setTimeout(() => {
        // --------------------------------
        // TEXT SECTION
        // --------------------------------

        gsap.to('.intro-button-transition', {
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          height: '4rem',
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
        gsap.to('.sidebar-transition', {
          height: 'auto',
          width: '18rem',
          minWidth: '18rem',
          maxWidth: '18rem',
          skewX: 0,
          skewY: 0,
          opacity: 1,
          scale: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.sidebar-button-transition', {
          width: '16.2rem',
          skewX: 0,
          skewY: 0,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
      }, 100);
    });
  }

  SetSidebarView(view: string) {
    // console.log('');
    // console.log('');
    // console.log(32, view);
    // console.log('');
    // console.log('');
    if (view === 'admin-page') {
      this.Sidebar.setActive('admin-page');
      this.buttonHoverTop = 'calc(6.1rem)';
      this.router.navigate(['admin-page']);
    } else if (view === 'news-view') {
      this.Sidebar.setActive('news-view');
      this.bottomHoverBottom = 'auto';
      this.buttonHoverTop = 'calc(6.1rem + (4rem*1) + (0.4rem*1)) !important';
      this.router.navigate(['admin-page/news-view']);
    } else if (view === 'articles-view') {
      this.Sidebar.setActive('articles-view');
      this.bottomHoverBottom = 'auto';
      this.buttonHoverTop = 'calc(6.1rem + (4rem*2) + (0.4rem*2)) !important';
      this.router.navigate(['admin-page/articles-view']);
    } else if (view === 'robots-view') {
      this.Sidebar.setActive('robots-view');
      this.bottomHoverBottom = 'auto';
      this.buttonHoverTop = 'calc(6.1rem + (4rem*3) + (0.4rem*3)) !important';
      this.router.navigate(['admin-page/robots-view']);
    } else if (view === 'episodes-view') {
      this.Sidebar.setActive('episodes-view');
      this.bottomHoverBottom = 'auto';
      this.buttonHoverTop = 'calc(6.1rem + (4rem*4) + (0.4rem*4)) !important';
      this.router.navigate(['admin-page/episodes-view']);
    } else if (view === 'settings') {
      this.Sidebar.setActive('settings');
      this.bottomHoverBottom = 'auto';
      this.buttonHoverTop = 'calc(6.1rem + (4rem*5) + (0.4rem*5)) !important';
      this.router.navigate(['admin-page/settings']);
    } else if (view === 'logout') {
      this.Sidebar.setActive('logout');
      this.buttonHoverTop = 'auto';
      this.bottomHoverBottom = '.8rem !important';
      this.router.navigate(['']);
    } else if (view.includes('news-article-view')) {
      //
      this.Sidebar.setActive('news-view');
      this.bottomHoverBottom = 'auto';
      this.buttonHoverTop = 'calc(6.1rem + (4rem*1) + (0.4rem*1)) !important';
      this.router.navigate([`${view}`]);
    } else if (view.includes('admin-article-page')) {
      this.Sidebar.setActive('articles-view');
      this.bottomHoverBottom = 'auto';
      this.buttonHoverTop = 'calc(6.1rem + (4rem*2) + (0.4rem*2)) !important';
      this.router.navigate([`/admin-page/articles-view/${view}`]);
    } else if (view === '/admin-page/articles-view/new-article') {
      this.Sidebar.setActive('articles-view');
      this.bottomHoverBottom = 'auto';
      this.buttonHoverTop = 'calc(6.1rem + (4rem*2) + (0.4rem*2)) !important';
      // this.router.navigate([`admin-page/new-article`]);
      this.router.navigate([`${view}`]);
    } else {
      // this.Sidebar.setActive('admin-page');
      // this.buttonHoverTop = 'calc(6.1rem)';
      // this.router.navigate(['admin-page']);
    }
    this.cdr.detectChanges();
  }
}

/*

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

  */
