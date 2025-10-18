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
import { LandingPage } from './landing-page/landing-page';
import { Navbar } from './navbar/navbar';
import { Footer } from "./footer/footer";

import { RouterOutlet } from '@angular/router';
import { GlobalAudioPlayerComponent } from "./global-audio-player.component/global-audio-player.component";




@Component({
  selector: 'app-root',
  standalone: true, // Use standalone components
  imports: [RouterOutlet, LandingPage, Navbar, Footer, GlobalAudioPlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App{
  // private smoother: ScrollSmoother | null = null;

  // constructor(private ngZone: NgZone) {}

  // ngOnInit() {
  //   // Register GSAP plugins here once
  //   this.ngZone.runOutsideAngular(() => {
  //     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  //   });
  // }

  // ngOnDestroy() {
  //   // Kill the smoother and triggers to prevent memory leaks
  //   if (this.smoother) {
  //     this.smoother.kill();
  //   }
  // }

  // // ... (your existing imports and component setup)

  // ngAfterViewInit() {
  //   this.ngZone.runOutsideAngular(() => {
  //     // Create the smoother instance
  //     this.smoother = ScrollSmoother.create({
  //       wrapper: '#smooth-wrapper',
  //       content: '#smooth-content',
  //       smooth: 1,
  //       effects: true,
  //       normalizeScroll: true,
  //       ignoreMobileResize: true,
  //       smoothTouch: false,
  //     });

  //     // GSAP ScrollTrigger for parallax effect on each image
  //     gsap.utils.toArray('[data-speed]').forEach((img) => {
  //       // Cast the 'img' variable to HTMLElement to satisfy TypeScript
  //       const element = img as HTMLElement;

  //       gsap.to(element, {
  //         y: (i, target) => -100 * parseFloat(target.getAttribute('data-speed') as string),
  //         ease: 'none',
  //         scrollTrigger: {
  //           trigger: element,
  //           start: 'top bottom',
  //           end: 'bottom top',
  //           scrub: true,
  //         },
  //       });
  //     });
  //   });
  // }

  // // ... (rest of your component code)

}
