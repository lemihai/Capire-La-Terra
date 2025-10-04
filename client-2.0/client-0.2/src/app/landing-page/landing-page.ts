import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { NgOptimizedImage } from '@angular/common';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

@Component({
  selector: 'app-landing-page',
  imports: [NgOptimizedImage],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements AfterViewInit, OnInit, OnDestroy {
  private smoother: ScrollSmoother | null = null;

  constructor(private ngZone: NgZone) {}

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

  ngOnInit() {
    // Register GSAP plugins here once
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    });
  }

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }
  }

  // ... (your existing imports and component setup)

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

      // GSAP ScrollTrigger for parallax effect on each image
      gsap.utils.toArray('[data-speed]').forEach((img) => {
        // Cast the 'img' variable to HTMLElement to satisfy TypeScript
        const element = img as HTMLElement;

        gsap.to(element, {
          y: (i, target) => -100 * parseFloat(target.getAttribute('data-speed') as string),
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // gsap.set('.background', { rotate: 0 });

      let tl = gsap.timeline();
      // tl.to('.background', { height: '80vh', duration: 2, ease: 'power2.out' });
      // tl.to('.content', { top: '56vh', duration: 10, ease: 'power2.out' }); //wait 1 second

      ScrollTrigger.create({
        animation: tl,
        trigger: '.scroll-trigger-a',
        start: 'top top',
        // end: '+=400',
        end: 'max',
        // pin: '.snap-element-a',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        // snap: 2,
      });

      // gsap.to('.section-b-content', {
      //   scrollTrigger: {
      //     trigger: '.section-b-content',
      //     scroller: '.section-b', // Explicitly set the scroll container
      //     start: 'top center',
      //     end:'bottom center',
      //   },
      //   x: 100,
      // });

      // let tl = gsap.timeline({
      //   scrollTrigger: '.scroll-trigger-a',
      //   height: 500,
      //   start: "top center",
      //   end: "bottom center",
      //   pin: true,
      //   scrub:true
      // });

      // tl.to('.background', {
      //   rotation: 32,
      //   duration: 1.6,
      //   ease: "ease-out"
      // });

      // gsap.to('.background', {
      //   scrollTrigger: '.scroll-trigger-a',
      //   height: 500,
      // });
    });
  }

  // ... (rest of your component code)
}
