import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { LandingPage } from './landing-page/landing-page';
import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AboutUs } from './about-us/about-us';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { Background } from './background/background';

// import { gsap } from 'gsap';

// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // ScrollSmoother requires ScrollTrigger
// import { ScrollSmoother } from 'gsap/ScrollSmoother';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Background],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'client';

  // smoother = ScrollSmoother.create({
  //   smooth: 2,
  //   effects: true,
  //   normalizeScroll: true,
  // });
}
