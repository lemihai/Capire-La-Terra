import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NewsService } from './news-service/news-service';
import { NavigationExtras, Router } from '@angular/router';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { RobotsService } from './robots-service/robots-service';
import { Episode, EpisodesService } from './episodes-service/episodes-service';
import { Article, ArticlesService } from './articles-service/articles-service';

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

  public triggerViewChange(
    url: string,
    fromRoute: string,
    Id?: string | undefined,
    data?: any | undefined,
    editMode?: boolean
  ) {
    const customEase = 'cubic-bezier(0,.55,.52,.96)';

    let adminURL = '/admin-page' + '/' + fromRoute + '/' + url + '/' + Id;
    adminURL = adminURL.replace('/undefined', '');

    //
    this.ngZone.runOutsideAngular(() => {
      // 1. Create a new GSAP Timeline
      const exitTimeline = gsap.timeline({
        // 2. Place the navigation logic in the timeline's main onComplete
        onComplete: () => {
          // --- Single Navigation Point ---
          this.ngZone.run(() => {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                editMode: editMode, // Will be '?editMode=true' or '?editMode=false'
              },
              // You can still keep the 'data' in the state if you only need it for the initial load
              state: data ? { data } : undefined,
            };
            this.router.navigate([adminURL], navigationExtras);
            //
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

  getOneNewsArticle(id: string) {
    return this.newsService.getOneNewsArticle(id);
  }

  deleteOneNewsArticle(id: string) {
    return this.newsService.deleteNewsArticle(id);
  }

  // --------------------------
  // Articles Service
  // --------------------------

  getAllArticles() {
    return this.articlesService.getAllArticles();
  }

  getOneArticle(articleId: string) {
    return this.articlesService.getOneArticle(articleId);
  }

  postArticle(body: Article) {
    return this.articlesService.postArticle(body);
  }

  patchArticlePostedStatus(articleId: string, body: boolean) {
    return this.articlesService.updatePostedArticle(articleId, body);
  }

  updateArticle(articleId: string, body: Article) {
    return this.articlesService.updateArticle(articleId, body);
  }

  deleteArticle(articleId: string) {
    return this.articlesService.deleteArticle(articleId);
  }

  // --------------------------
  // Episodes Service
  // --------------------------

  getAllEpisodes() {
    return this.episodesService.getAllEpisodes();
  }

  getOneEpisode(episodeId: string) {
    return this.episodesService.getOneEpisode(episodeId);
  }

  postEpisode(body: Episode) {
    return this.episodesService.postEpisode(body);
  }

  patchEpisodePostedStatus(episodeId: string, body: boolean) {
    return this.episodesService.updatePostedEpisode(episodeId, body);
  }

  updateEpisode(episodeId: string, body: Episode) {
    return this.episodesService.updateEpisode(episodeId, body);
  }

  deleteEpisode(episodeId: string) {
    return this.episodesService.deleteEpisode(episodeId);
  }

  // --------------------------
  // Robots Service
  // --------------------------

  getRobots() {
    return this.robotsService.getRobots();
  }
}
