import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';

import { Router } from '@angular/router';


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
  imports: [Footer, EpisodesListComponent, Button, AboutEarthComponent, NewsSectionComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements AfterViewInit, OnInit, OnDestroy {
  private smoother: ScrollSmoother | null = null;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

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

  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: BeforeUnloadEvent) {
    localStorage.removeItem('landingPageLoaded');
  }

  ngOnInit() {
    // Register GSAP plugins here once
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    });

    setTimeout(() => {
      this.delayedFunction();
    }, 3000);
    this.cdr.detectChanges();
  }

  playPageOutTransition() {
    this.ngZone.runOutsideAngular(() => {});
  }

  playPageInTransition() {
    this.ngZone.runOutsideAngular(() => {});
  }

  // GET RID OF THIS
  delayedFunction() {
    this.height = '0rem';
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const hasLoaded = localStorage.getItem('landingPageLoaded');

      // --------------------------
      // EEPISODE CARD
      // --------------------------
      gsap.to('.episode-number', {
        width: 'auto',
        height: 'auto',
        skewX: 0,
        skewY: 0,
        scale: 1,
        rotate: 0,
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
      gsap.to('.episode-dash', {
        width: '1.6rem',
        height: 'auto',
        skewX: 0,
        skewY: 0,
        scale: 1,
        rotate: 0,
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
      gsap.to('.episode-title', {
        width: '100%',
        height: 'auto',
        // color: 'red',
        skewX: 0,
        skewY: 0,
        scale: 1,
        rotate: 0,
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
      gsap.to('.app-profile-card-wrapper-for-transform', {
        width: 'auto',
        height: 'auto',
        translateX: 0,
        translateY: 0,
        skewX: 0,
        skewY: 0,
        scale: 1,
        rotate: 0,
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
      gsap.to('.audio-track-wrapper-large', {
        // width: '100%',
        translateX: 0,
        translateY: 0,
        skewX: 0,
        skewY: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: this.time,
        ease: this.ease,
        overwrite: 'auto',
      });
      gsap.to('.date', {
        width: 'auto',
        height: 'auto',
        translateX: 0,
        translateY: 0,
        skewX: 0,
        skewY: 0,
        scale: 1,
        rotate: 0,
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
      gsap.to('.topic', {
        width: 'auto',
        height: 'auto',
        translateX: 0,
        translateY: 0,
        skewX: 0,
        skewY: 0,
        scale: 1,
        rotate: 0,
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
      gsap.to('.separator-line', {
        height: '1rem',
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
      gsap.to('.bottom-container', {
        skewX: 0,
        skewY: 0,
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

      // --------------------------
      // SMOOTHER LOADUP
      // --------------------------
      this.smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        normalizeScroll: false,
        ignoreMobileResize: true,
        smoothTouch: false,
      });

      ScrollTrigger.create({
        trigger: '#smooth-content',
        start: 'top top',
        end: 'top top',
        // pin: '.text-container',
        // pinType: 'fixed',
        pinSpacing: false,
        markers: false,
      });

      // ******************************************
      // Trigger to collapse the background
      // ******************************************
      let backgroundTL = gsap.timeline();
      backgroundTL.to('.background', { height: '16vh', duration: 6, ease: 'power2.out' });

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
      // Trigger for collapsing the H1 element
      // ******************************************

      // Scroll triggers for the sides
      ScrollTrigger.create({
        // animation: heroTextTL,
        trigger: '.hero-section-trigger',
        start: 'center center',
        end: '+=01',
        anticipatePin: 1,

        onEnter: () => {},
        onLeave: () => {
          gsap.to('.hero-h1', {
            height: '0rem',
            width: '0rem',
            y: -120,
            skewX: 32,
            skewY: 8,
            scale: 1,
            rotate: 0,
            duration: 2,
            ease: this.ease,
          });
        },
        onEnterBack: () => {
          gsap.to('.hero-h1', {
            width: '46.4rem',
            height: '12rem',
            y: 0,
            skewX: 0,
            skewY: 0,
            scale: 1,
            rotate: 0,
            duration: 2,
            ease: this.ease,
          });
        },
        onLeaveBack: () => {},
      });

      // ****************************************
      // This is how to handle the conditional loading
      // ****************************************
      if (!hasLoaded) {
        // Set the flag in localStorage
        localStorage.setItem('landingPageLoaded', 'true');

        gsap.to('.spacing-h1', {
          height: '120px',
          width: '400px',
          skewX: 0,
          skewY: 0,
          rotate: 0,
          scale: 1,
          duration: 0.8,
          ease: this.ease,
          overwrite: true,
        });

        // Initial state set in CSS should be removed.
        // We use GSAP to set the starting position (off-screen) and then animate to the final position.
        setTimeout(() => {
          gsap.to('.spacing-h1', {
            height: '0px',
            width: '0px',
            y: '-32px',
            skewX: 32,
            scale: 1,
            skewY: 8,
            duration: 0.8,
            ease: this.ease,
          });
        }, 800);

        setTimeout(() => {
          gsap.to('.spacing', {
            height: '90vh',
            zIndex: -99,
            opacity: 0,
            duration: 0.8,
            ease: this.ease,
          });
        }, 1000);

        // --------------------------
        // TEXT SECTION
        // --------------------------

        setTimeout(() => {
          gsap.to('.hero-h1', {
            width: '46.4rem',
            height: '12rem',
            y: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            duration: 2,
            ease: this.ease,
          });
        }, 2400);

        // --------------------------
        // WRAPPER AND CONTENT SECTION
        // --------------------------
        setTimeout(() => {
          gsap.fromTo(
            '#smooth-wrapper',
            { y: '100vh' },
            {
              y: '0vh',
              duration: 0.8,
              ease: this.ease,
            },
          );
          gsap.fromTo(
            '#smooth-content',
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: this.ease,
            },
          );
          gsap.fromTo(
            '.image',
            { height: '120vh' },
            {
              height: 'calc(100vh - 1.6rem)',
              duration: 1.6,
              ease: this.ease,
            },
          );
        }, 1200);

        // ****************************************
        // This is how to handle the conditional loading
        // ****************************************
      } else {
        // --------------------------
        // SPACING SECTION
        // --------------------------
        gsap.to('.spacing', {
          height: '0vh',
          zIndex: -99,
          opacity: 0,
          duration: 0,
          ease: this.ease,
          pointerEvents: 'none,',
        });

        // --------------------------
        // TEXT SECTION
        // --------------------------
        gsap.to('.hero-h1', {
          width: '46.4rem',
          height: '12rem',
          y: 0,
          skewX: 0,
          scale: 1,
          skewY: 0,
          rotate: 0,
          duration: 2,
          ease: this.ease,
        });
        setTimeout(() => {}, 2400);

        // --------------------------
        // WRAPPER AND CONTENT SECTION
        // --------------------------

        setTimeout(() => {
          gsap.fromTo(
            '#smooth-wrapper',
            { y: '100vh' },
            {
              y: '0vh',
              duration: 0.64,
              ease: this.ease,
            },
          );
          gsap.fromTo(
            '#smooth-content',
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.64,
              ease: this.ease,
            },
          );

          // --------------------------
          // BACKGROUND SECTION
          // --------------------------

          gsap.fromTo(
            '.image',
            { height: '120vh' },
            {
              height: 'calc(100vh - 1.6rem)',
              duration: 1.2,
              ease: this.ease,
            },
          );
          console.log('LOADED SKIPPED');
        }, 100);
      }

      // --------------------------
      // THIS NEEDS TO HAPPEN NO MATTER HOW THE PAGE LOADS
      // --------------------------

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
        markers: false,
        onEnter: () => {
          // Play entering animation when entering from the top
          gsap.to('.episodes-text-h1', {
            height: '120px',
            width: '400px',
            y: -120,
            skewX: 0,
            skewY: 0,
            scale: 1,
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
            scale: 1,
            rotate: 0,
            duration: 2,
            ease: this.ease,
            overwrite: true,
          });
          gsap.to('.episodes-action-container-button', {
            height: '40px',
            width: '140px',
            y: 0,
            // scale: '1',
            skewX: 0,
            skewY: 0,
            scale: 1,
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
            scale: 1,
            // scale: '1',
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
        markers: false,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
            scale: 1,
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
        markers: false,
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
}
