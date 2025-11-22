import {
  Component,
  AfterViewInit,
  DestroyRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Navbar } from './navbar/navbar';
import { LandingPage } from './landing-page/landing-page';
import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AboutUs } from './about-us/about-us';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { Background } from './background/background';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Background],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements AfterViewInit {
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    // No need for NgZone.runOutsideAngular in zoneless mode
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2,
      effects: true,
      ease: "ease.out",
      normalizeScroll: true,
    });

    // Clean up on component destruction
    this.destroyRef.onDestroy(() => {
      smoother.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
  }
}