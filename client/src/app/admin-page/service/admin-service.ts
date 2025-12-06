import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NewsService } from './news-service/news-service';
import { Router } from '@angular/router';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { RobotsService } from './robots-service/robots-service';
import { EpisodesService } from './episodes-service/episodes-service';
import { ArticlesService } from './articles-service/articles-service';

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
    private episodesService: EpisodesService,
    private articlesService: ArticlesService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  // --------------------------
  // PAGE TRANSITION
  // --------------------------

  public triggerViewChange(url: string, fromRoute: string, Id?: string, data?: any) {
    const customEase = 'cubic-bezier(0,.55,.52,.96)';

    if (Id) {
    }
    const adminURL = '/admin-page' + '/' + fromRoute + '/' + url + '/' + Id;

    this.ngZone.runOutsideAngular(() => {
      // 1. Create a new GSAP Timeline
      const exitTimeline = gsap.timeline({
        // 2. Place the navigation logic in the timeline's main onComplete
        onComplete: () => {
          // --- Single Navigation Point ---
          this.ngZone.run(() => {
            const navigationExtras = data ? { state: { data } } : {};
            this.router.navigate([adminURL], navigationExtras);
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
    return this.newsService.getAllNews();
  }

  getOneNewsArticle(id:string){
    return this.newsService.getOneNewsArticle(id);
  }

  deleteOneNewsArticle(id:string){
    return this.newsService.deleteNewsArticle(id);
  }

  // --------------------------
  // Articles Service
  // --------------------------

  getAllArticles() {
    return this.articlesService.getAllArticles(); // Calls NewsService's method
  }

  deleteArticle(articleId: string) {
    return this.articlesService.deleteArticle(articleId);
  }

  // --------------------------
  // Episodes Service
  // --------------------------

  getAllEpisodes() {
    return this.episodesService.getAllEpisodes(); // Calls NewsService's method
  }

  // --------------------------
  // Robots Service
  // --------------------------

  getRobots() {
    return this.robotsService.getRobots();
  }
}
