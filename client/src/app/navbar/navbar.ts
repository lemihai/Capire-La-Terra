import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone, // 1. Import NgZone
} from '@angular/core';

import { Router, RouterLink, ActivatedRoute } from '@angular/router'; // 2. Import Router
import { gsap } from 'gsap'; // 3. Import gsap (assuming it's installed)
import CustomEase from 'gsap/CustomEase';
import { from } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true, // Assuming this is a standalone component based on the original snippet
})
export class Navbar implements OnInit {
  // Initial state for the Navbar component's load-in animation
  translateY: string = '-32px';
  backgroundColor = '';
  scale = '.8';
  opacity = '0';
  width = '0px';
  currentRoute: string = '';

  // For animations in gsap
  time = .64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  // Inject ChangeDetectorRef, Router, and NgZone
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router, // 4. Inject Router
    private ngZone: NgZone, // 5. Inject NgZone
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Navbar initial load-in animation (for the navbar itself)

    setTimeout(() => {
      this.animateNavbarIn();
    }, 1600);
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

  /**
   * Triggers the page exit animation and then navigates.
   * @param url The target URL for navigation.
   */
  // Inside Navbar component

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
      if(fromRoute == '/'){
        this.exitFrontPage(exitTimeline);
      }

      // ******************************************
      // TRIGGER FOR EPISODES PAGE
      // ******************************************
      if (fromRoute == '/episodes-page') {
        this.exitEpisodesPage();
      }

      // ******************************************
      // TRIGGER FOR NEWS PAGE
      // ******************************************
      if (fromRoute == '/news-page') {
        this.exitNewsPage();
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
  }

  navigateToEpisodesPage() {
    this.updateRoute();
    this.triggerPageTransition('/episodes-page', this.currentRoute);
  }

  navigateToNewsPage() {
    this.updateRoute();
    this.triggerPageTransition('/news-page', this.currentRoute);
  }

  nagivateToLoginPage(){
    this.updateRoute();
    this.triggerPageTransition('/login-page', this.currentRoute);
  }

  updateRoute() {
    this.currentRoute = this.router.url;
    console.log('************-------*************');
    console.log('Current route URL:', this.router.url);
    console.log('************-------*************');
  }

  exitFrontPage(exitTimeline: gsap.core.Timeline) {
    exitTimeline.to(
      '.background-wrapper',
      {
        height: '0px',
        duration: this.time,
        ease: this.ease,
      },
      0
    ); // The '0' position parameter makes it start immediately with the timeline
    exitTimeline.to(
      '.episodes-text-h1',
      {
        height: '0px',
        width: '0px',
        y: 0,
        skewX: 32,
        skewY: 8,
        rotate: 0,
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      },
      0
    );
    exitTimeline.to(
      '.latest-news-h1',
      {
        height: '0px',
        width: '0px',
        y: 0,
        skewX: 32,
        skewY: 8,
        rotate: 0,
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      },
      0
    );
    exitTimeline.to(
      '.episode-list-wrapper',
      {
        height: '0px',
        duration: this.time,
        ease: this.ease,
      },
      0
    );
    exitTimeline.to(
      '.about-earth-section',
      {
        height: '0rem',
        duration: this.time,
        ease: this.ease,
      },
      0
    );
    exitTimeline.to(
      '.about-earth-wrapper',
      {
        height: '0rem',
        paddingTop: '8rem',
        duration: this.time,
        ease: this.ease,
      },
      0
    );
    exitTimeline.to(
      '.left-side-wrapper',
      {
        height: '0px',
        duration: this.time,
        ease: this.ease,
      },
      0
    );
    exitTimeline.to(
      '.left-side',
      {
        paddingBottom: '8rem',
        duration: this.time,
        ease: this.ease,
      },
      0
    );
    exitTimeline.to(
      '.right-side-wrapper',
      {
        height: '0px',
        duration: this.time,
        ease: this.ease,
      },
      0
    );
    exitTimeline.to(
      '.right-side',
      {
        duration: this.time,
        ease: this.ease,
      },
      0
    );
  }

  exitEpisodesPage() {
    gsap.to('.episodes-list', {
      height: '0rem',
      minHeight: '0vh',
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.hero-h1A', {
      height: '0rem',
      width: '0rem',
      y: 32,
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.season-h1', {
      height: '0rem',
      width: '0rem',
      y: 32,
      skewX: 32,
      skewY: 8,
      duration: this.time,
      // delay: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium', {
      height: '6.4rem',
      minWidth: '32rem',
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.header-dropdown', {
      height: '0rem',
      width: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });

    gsap.to('h2', {
      width: '0rem',
      height: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.app-profile-card-wrapper-for-transform', {
      // clearProps: 'all',
      width: '0rem',
      height: '0rem',
      translateX: '2rem',
      translateY: '-4rem',
      skewX: 32,
      skewY: 8,
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.date', {
      width: '0rem',
      height: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.topic', {
      width: '0rem',
      height: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.bottom-container', {
      // width: '100%',
      // height: 'auto',
      skewX: 0,
      skewY: 0,
      rotate: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.episode-image', {
      width: '0rem',
      minWidth: '0rem',
      // height: 'auto',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.separator-line', {
      height: '0rem',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.audio-track-wrapper', {
      // width: 'auto',
      // height: 'auto',
      translateX: '2rem',
      translateY: '-6rem',
      skewX: 32,
      skewY: -8,
      rotate: 4,
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      // overwrite: 'auto',
    });
  }

  exitNewsPage(){
    
  }
}
