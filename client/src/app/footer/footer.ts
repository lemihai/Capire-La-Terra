import {
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProfileCard } from '../shared/components/profile-card/profile-card';
import { Router } from '@angular/router';
import { NavbarGsapService } from '../navbar/navbar-gsap-service';

import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';

@Component({
  selector: 'app-footer',
  imports: [ProfileCard],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  date: Date = new Date();
  year: number = this.date.getFullYear();
  private navbarGsapService = inject(NavbarGsapService);

  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
    // private navbar: Navbar,
  ) {}
  ngOnInit(): void {
    console.log('started');
  }

  socials = {
    capireLaTerraInsta: 'https://www.instagram.com/capirelaterrapodcast/',
    capireLaTerraSpotify: 'https://open.spotify.com/show/0lBbMLBVG9USZhiTZeOU8E',

    sofiaInsta: 'https://www.instagram.com/sofialutteri/',
    brianaInsta: 'https://www.instagram.com/colibrianaa/',
    mihaiInsta: 'https://www.instagram.com/le_mihai/',

    sofiaLinkedIn: 'https://www.linkedin.com/in/sofia-lutteri-62a1b6195/',
    brianaLinkedIn: 'https://www.LinkedIngram.com/colibrianaa/',
    mihaiLinkedIn: 'https://www.linkedin.com/in/mihai-butnariu/',

    mihaiGithub: 'https://github.com/lemihai',
  };

  navigateToPage(page: string) {
    let currentPage = this.router.url;
    console.log(currentPage);

    if(currentPage != page)
    this.ngZone.runOutsideAngular(() => {
      const exitTimeline = gsap.timeline({
        onComplete: () => {
          this.ngZone.run(() => {
            this.router.navigate([page]);
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

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // ******************************************
      // TRIGGER FOR HOME PAGE
      // ******************************************
      if (currentPage == '/') {
        this.navbarGsapService.exitFrontPage();
      }

      // ******************************************
      // TRIGGER FOR EPISODES PAGE
      // ******************************************
      if (currentPage == '/episodes-page') {
        this.navbarGsapService.exitEpisodesPage();
      }

      // ******************************************
      // TRIGGER FOR NEWS PAGE
      // ******************************************
      if (currentPage == '/news-page') {
        this.navbarGsapService.exitNewsPage();
      }

      if (currentPage.includes('/article-page')) {
        this.navbarGsapService.exitArticlePage();
      }

      if (currentPage == '/admin-page') {
        this.navbarGsapService.exitAdminPage();
      }

      if (currentPage == '/login-page') {
        this.navbarGsapService.exitLoginPage();
      }
    });
  }
}
