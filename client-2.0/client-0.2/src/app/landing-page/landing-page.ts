import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { NgOptimizedImage } from '@angular/common';

// GSAP IMPORTS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';

import { Footer } from '../footer/footer';
import { EpisodesListComponent } from './episodes-list.component/episodes-list.component';
import { Button } from '../shared/buttons/button/button';
import { AboutEarthComponent } from './about-earth.component/about-earth.component';
import { NewsSectionComponent } from './news-section.component/news-section.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    NgOptimizedImage,
    Footer,
    EpisodesListComponent,
    Button,
    AboutEarthComponent,
    NewsSectionComponent,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements AfterViewInit, OnInit, OnDestroy {
  private smoother: ScrollSmoother | null = null;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef, private router: Router) {}

  episodes = [
    {
      id: 3243223,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 1,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243224,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 2,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243225,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 3,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243226,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 4,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243227,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 5,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243228,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 6,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243229,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 7,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243230,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 8,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243231,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 9,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
  ];

  changeanimation = '';
  height = '100vh';
  loadhappened = false;

  // For animations in gsap
  time = 1.24;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  ngOnInit() {
    // Register GSAP plugins here once
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    });

    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     // Navigation is starting: play the "out" animation
    //     this.playPageOutTransition();
    //   } else if (event instanceof NavigationEnd) {
    //     // Navigation is complete: play the "in" animation
    //     this.playPageInTransition();
    //   }
    // });

    setTimeout(() => {
      this.delayedFunction();
    }, 3000);
    this.cdr.detectChanges();
  }

  playPageOutTransition() {
    this.ngZone.runOutsideAngular(() => {
      // gsap.to('#smooth-wrapper', {
      //   opacity: 0,
      //   duration: 3.2,
      //   ease: this.ease,
      // });
      // gsap.to('.background', {
      //   height: '0px',
      //   duration: 1.6,
      //   ease: this.ease,
      //   // onComplete: () => {
      //   //   // This code runs AFTER the animation finishes
      //   //   this.router.navigate(['/episodes-page']);
      //   // },
      // });
    });

    // console.log('EXITEEEEEED');
  }

  playPageInTransition() {
    this.ngZone.runOutsideAngular(() => {
      // gsap.fromTo(
      //   '#smooth-wrapper',
      //   { opacity: 0, height: '0rem' },
      //   {
      //     opacity: 1,
      //     height: '100rem',
      //     duration: 2.4,
      //     ease: this.ease,
      //     // onComplete: () => {
      //     //   this.router.navigate(['/episodes-page']);
      //     // },
      //   }
      // );
    });
    // console.log('ENTEREEEEEED');
  }

  // GET RID OF THIS
  delayedFunction() {
    this.height = '0rem';
    this.cdr.detectChanges();

    // console.log('feawrfer');
  }

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }

    this.changeanimation = '.on-destroy-test';
  }

  // ... (your existing imports and component setup)

  ngAfterViewInit() {
    //  GSAP Animations

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      // --- 1. Define the Initial Load-In Animation Timeline ---
      // this.createLoadInTimeline();
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

      gsap.to('.spacing-h1', {
        height: '120px',
        width: '400px',
        skewX: 0,
        skewY: 0,
        rotate: 0,
        duration: 0.8,
        ease: this.ease,
        overwrite: true,
      });

      // Initial state set in CSS should be removed.
      // We use GSAP to set the starting position (off-screen) and then animate to the final position.
      if (this.loadhappened == false) {
        setTimeout(() => {
          gsap.to('.spacing-h1', {
            height: '0px',
            width: '0px',
            y: '-32px',
            skewX: 32,
            skewY: 8,
            // rotate: 0,
            duration: 0.8,
            ease: this.ease,
            // overwrite: true,
          });
          // console.log('AAAAAAAA', '09999999');
        }, 800);

        setTimeout(() => {
          gsap.to('.spacing', {
            height: '90vh',
            zIndex: -99,
            opacity: 0,
            // Animate to its natural position
            duration: 0.8,
            ease: this.ease,
            // ease: CustomEase.create('eeeease', '.01,.99,.53,.99'),
          });
          // console.log('BBBBBBB', '09999999');
          // console.log('BBBBBBB', '09999999');
          // console.log('BBBBBBB', '09999999');
        }, 1000);

        setTimeout(() => {
          gsap.fromTo(
            '#smooth-wrapper',
            { y: '100vh' }, // Start 100vh lower than its natural position
            {
              y: '0vh',
              // Animate to its natural position
              duration: 0.8,
              ease: this.ease,
              // ease: CustomEase.create('eeeease', '.01,.99,.53,.99'),
            }
          );
          gsap.fromTo(
            '#smooth-content',
            { opacity: 0 }, // Start 100vh lower than its natural position
            {
              opacity: 1, // Animate to its natural position
              duration: 0.8,
              ease: this.ease,
              // ease: CustomEase.create('eeeease', '.01,.99,.53,.99'),
            }
          );
          gsap.fromTo(
            '.image',
            { height: '120vh' }, // Start 100vh lower than its natural position
            {
              height: 'calc(100vh - 1.6rem)', // Animate to its natural position
              duration: 1.6,
              ease: this.ease,
              // ease: CustomEase.create('eeeease', '.01,.99,.53,.99'),
            }
          );

          // console.log('CCCCCCCC', '09999999');
        }, 1200);
        this.loadhappened = true;
      } else {
        // console.log('intro not happening');
      }
      // setTimeout(() => {for (let i = 0; i <= 11; i++) {
      //   gsap.to(
      //     `.background-image-layer-${i}`,
      //     // { top: `${i*2.4}`, height: '200px', opacity: 0 }, // Start 100vh lower than its natural position
      //     {
      //       top: `${i*2.4}`,
      //       opacity: 1, // Animate to its natural position
      //       duration: 1.6,
      //       backgroundColor: 'red',
      //       ease: this.ease,
      //       // ease: CustomEase.create('eeeease', '.01,.99,.53,.99'),
      //     }
      //   );
      // }}, 3200);

      // PIN THE TEXT: if doesn't work, remove this, reactivate the pin of the other elements
      // Then add "position fixed to the text container
      ScrollTrigger.create({
        trigger: '#smooth-content', // Start at the very top of the scrollable area
        start: 'top top',
        // endTrigger: '.background-collapse-trigger', // End when the background is about to collapse
        end: 'top top',
        pin: '.text-container', // <-- Pin the text container itself
        pinType: 'fixed', // Use 'fixed' to position it relative to the viewport while pinned
        pinSpacing: false, // Don't add extra space when pinning a fixed element
        markers: false, // set to true for debugging
      });

      // ******************************************
      // Trigger to collapse the background
      // ******************************************
      let backgroundTL = gsap.timeline();
      backgroundTL.to('.background', 
        { height: '16vh', 
          duration: 6, 
          ease: 'power2.out' });

      ScrollTrigger.create({
        animation: backgroundTL,
        trigger: '.background-collapse-trigger',
        start: 'top top',
        // end: '+=400',
        end: '+=600',
        // pin: '.snap-element-a',
        // pin: true,
        scrub: true,
        anticipatePin: 1,
        // snap: 2,
      });

      // ******************************************
      // Trigger to show the first lines of text
      // ******************************************
      let heroTextTL = gsap.timeline();
      heroTextTL.to('.hero-h1', {
        height: '0px',
        width: '0px',
        y: -0,
        skewX: 32,
        skewY: 8,
        rotate: 0,
        duration: 2,
        ease: this.ease,
      });

      // Scroll triggers for the sides
      ScrollTrigger.create({
        animation: heroTextTL,
        trigger: '.hero-section-trigger',
        start: 'center center',
        // end: '+=400',
        end: '+=180',
        // pin: '.snap-element-a',
        // pin: true,
        scrub: true,
        anticipatePin: 1,
        // snap: 2,
      });

      // ******************************************
      // Trigger for entering Episodes section
      // ******************************************

      ScrollTrigger.create({
        trigger: '.episode-section-top-enter-trigger',
        start: 'top center',
        end: '+=300',
        // pin: true,
        scrub: false,
        anticipatePin: 1,
        markers: true,
        onEnter: () => {
          // Play entering animation when entering from the top
          gsap.to('.episodes-text-h1', {
            height: '120px',
            width: '400px',
            y: -120,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 0,
            ease: this.ease,
            overwrite: true, // Overwrite any existing animations on these elements
          });
          gsap.to('.episodes-action-container-text', {
            height: '24px',
            width: '189px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-button', {
            height: '40px',
            width: '140px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-button-btn', {
            height: '40px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
        },
        onEnterBack: () => {
          // Play entering animation when entering from the bottom
          gsap.to('.episodes-text-h1', {
            height: '120px',
            width: '400px',
            y: -60,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-text', {
            height: '24px',
            width: '189px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-button', {
            height: '40px',
            width: '140px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-button-btn', {
            height: '40px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
        },
        onLeave: () => {
          // Play exiting animation when leaving from the bottom
          gsap.to('.episodes-text-h1', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-text', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-button', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-button-btn', {
            height: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          // Play exiting animation when leaving from the top
          gsap.to('.episodes-text-h1', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-text', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-button', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-button-btn', {
            height: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
        },
      });

      // ******************************************
      // Trigger for entering Latest News section
      // ******************************************

      ScrollTrigger.create({
        trigger: '.news-section-enter-trigger',
        start: 'top center',
        end: '+=364',
        // pin: true,
        scrub: false,
        anticipatePin: 1,
        markers: true,
        onEnter: () => {
          // Play entering animation when entering from the top
          gsap.to('.line-container', {
            width: '500px',
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.latest-news-h1', {
            height: '120px',
            width: '500px',
            // x: 0,
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true, // Overwrite any existing animations on these elements
          });
          gsap.to('.news-action-container', {
            // x: 0,
          });
          gsap.to('.news-action-container-text', {
            height: '24px',
            width: '288px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-button', {
            height: '40px',
            width: '140px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-button-btn', {
            height: '40px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
        },
        onEnterBack: () => {
          gsap.to('.line-container', {
            width: '500px',
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          // Play entering animation when entering from the bottom
          gsap.to('.latest-news-h1', {
            height: '120px',
            width: '400px',
            y: -60,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-text', {
            height: '24px',
            width: '288px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-button', {
            height: '40px',
            width: '140px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-button-btn', {
            height: '40px',
            y: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
        },
        onLeave: () => {
          gsap.to('.line-container', {
            width: '400px',
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          // Play exiting animation when leaving from the bottom
          gsap.to('.latest-news-h1', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-text', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-button', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-button-btn', {
            height: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          gsap.to('.line-container', {
            width: '400px',
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          // Play exiting animation when leaving from the top
          gsap.to('.latest-news-h1', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-text', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-button', {
            height: '0px',
            width: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.news-action-container-button-btn', {
            height: '0px',
            y: 0,
            skewX: 32,
            skewY: 8,
            rotate: 0,
            duration: 1,
            ease: this.ease,
            overwrite: true,
          });
        },
      });

      ScrollTrigger.create({
        trigger: '.news-section-enter-trigger-2',
        start: 'top center',
        end: '+=800',
        // pin: true,
        scrub: false,
        anticipatePin: 1,
        markers: true,
        onEnter: () => {
          // Play entering animation when entering from the top
          gsap.to('.left-side', {
            height: '981px',
            borderRadius: '32px',
            duration: 2,
            ease: this.ease,
            overwrite: true, // Overwrite any existing animations on these elements
          });
        },
        onEnterBack: () => {
          // Play entering animation when entering from the bottom
          gsap.to('.left-side', {
            height: '981px',
            borderRadius: '32px',
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
        },
        onLeave: () => {
          // Play exiting animation when leaving from the bottom
          gsap.to('.left-side', {
            height: '100px',
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          // Play exiting animation when leaving from the top
          gsap.to('.left-side', {
            height: '100px',
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
        },
      });
    });
  }

  // ... (rest of your component code)
}
