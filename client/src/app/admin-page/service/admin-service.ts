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

import { Observable, Subject } from 'rxjs';

@Injectable()
// {providedIn: 'root',}
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}`;
  private viewChangeSubject = new Subject<{ view: string; extras?: NavigationExtras }>();
  public viewChange$ = this.viewChangeSubject.asObservable();

  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  constructor(
    private http: HttpClient,
    private newsService: NewsService,
    private robotsService: RobotsService,
    private episodesService: EpisodesService,
    private articlesService: ArticlesService,
    private ngZone: NgZone,
    private router: Router,
  ) {}

  // --------------------------
  // PAGE TRANSITION
  // --------------------------

  public triggerViewChange(
    url: string,
    fromRoute: string,
    Id?: string | undefined,
    data?: any | undefined,
    editMode?: string,
  ) {
    const customEase = 'cubic-bezier(0,.55,.52,.96)';
    let sidebarKey = fromRoute;
    let adminURL = 'admin-page' + '/' + fromRoute + '/' + url + '/' + Id;
    adminURL = adminURL.replace('/undefined', '');
    adminURL = adminURL.replace('//', '/');
    // if(editMode == true){
    //   adminURL += '?edit=true';
    // }

    sidebarKey = adminURL;

    // if (url.includes('news-view')) {
    //   sidebarKey = 'news-view';
    // } else if(url.includes('news-article-view')){
    //   sidebarKey = adminURL;
    //   console.log(2);
    // console.log(2);
    // console.log(adminURL);
    // console.log(2);
    // console.log(2);
    // }else if(url.includes('articles-view')){
    //   sidebarKey = 'articles-view';
    // }else if(url.includes('new-article')){
    //   sidebarKey = adminURL;

    // }else if(url.includes("admin-article-page")){
    //   sidebarKey = 'articles-view';
    // }

    // else if(url.includes('episodes-view') || url.includes('new-episode') ||url.includes("episode-page")){
    //   sidebarKey = 'episodes-view';
    // }else if(url.includes('robots-view')){
    //   sidebarKey = 'robots-view';
    // }else if(url.includes('settings')){
    //   sidebarKey = 'settings';
    // }

    // if (adminURL.includes('/admin-page/admin-page')) {
    //   adminURL = adminURL.replace('/admin-page/admin-page', '/admin-page');
    //   console.log(4);
    // }

    //
    this.ngZone.runOutsideAngular(() => {
      // 1. Create a new GSAP Timeline
      const exitTimeline = gsap.timeline({
        // 2. Place the navigation logic in the timeline's main onComplete
        onComplete: () => {
          // --- Single Navigation Point ---
          this.ngZone.run(() => {
            const pathSegments = adminURL.split('/').filter((p) => p !== '');

            const navigationExtras: NavigationExtras = {
              queryParams: {
                editMode: editMode || null,
              },
              state: {
                data: data,
              },
              // This tells Angular to remove the parameter from the URL if it's null
              // queryParamsHandling: 'merge',
            };

            console.log(adminURL);
            console.log(1, navigationExtras);
            console.log(2, pathSegments);
            console.log(3, editMode);
            this.router.navigate(['/', ...pathSegments], navigationExtras);
            // this.router.navigate([adminURL], navigationExtras);
            //
            this.viewChangeSubject.next({
              view: sidebarKey,
              extras: navigationExtras,
            });
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
        0,
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
  // User Service
  // --------------------------

  getUser(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }
  getOneUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updatePassword(id: string, password: string): Observable<any> {
    const body = { password: password };

    return this.http.patch<any>(`${this.apiUrl}/${id}`, body);
  }

  updateDetails(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, body);
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

  startScraper(name: string | undefined) {
    return this.robotsService.startScraper(name);
  }
}
