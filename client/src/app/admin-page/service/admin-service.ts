import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NewsService } from './news-service/news-service';
import { Router } from '@angular/router';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { RobotsService } from './robots-service/robots-service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}`;

  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  constructor(
    private http: HttpClient,
    private newsService: NewsService,
    private robotsService: RobotsService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  // --------------------------
  // PAGE TRANSITION
  // --------------------------

  public triggerViewChange(url: string, fromRoute: string) {
    const customEase = 'cubic-bezier(0,.55,.52,.96)';
    // console.log('THIS IS the route we are coming from', fromRoute);
    console.log('this is url: ', url);
    const adminURL = '/admin-page' + '/news-view' + '/' + url;
    console.log('this is final rul: ' + adminURL);
    this.ngZone.runOutsideAngular(() => {
      // 1. Create a new GSAP Timeline
      const exitTimeline = gsap.timeline({
        // 2. Place the navigation logic in the timeline's main onComplete
        onComplete: () => {
          // --- Single Navigation Point ---
          this.ngZone.run(() => {
            this.router.navigate([adminURL]);
          });
        },
      });

      // ******************************************
      // TRIGGER FOR GLOBAL ELEMENTS THAT ARE EVERYWHERE
      // ******************************************

      exitTimeline.to(
        '.hero-h1',
        {
          rotate: 0,
          duration: 0,
          ease: this.ease,
        },
        0
      );

      // ******************************************
      // TRIGGER FOR HOME PAGE
      // ******************************************
      if (fromRoute == '/admin-page') {
        // this.navbarGsapService.exitFrontPage(exitTimeline);
      }

      // ******************************************
      // TRIGGER FOR EPISODES PAGE
      // ******************************************
      if (fromRoute == '/admin-page/news-view') {
        // this.navbarGsapService.exitEpisodesPage();
      }
    });
  }

  // --------------------------
  // News Service
  // --------------------------

  getAllNews() {
    return this.newsService.getAllNews(); // Calls NewsService's method
  }

  // Example: Use NewsService to delete an article
  deleteArticleForAdmin(articleId: string) {
    return this.newsService.deleteArticle(articleId); // Delegates to NewsService
  }

  // Example: Admin-specific POST method
  addAdminUser(user: { name: string; role: string }) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  // --------------------------
  // Articles Service
  // --------------------------

  // --------------------------
  // Episodes Service
  // --------------------------

  // --------------------------
  // Robots Service
  // --------------------------

  getRobots() {
    return this.robotsService.getRobots();
  }
}
