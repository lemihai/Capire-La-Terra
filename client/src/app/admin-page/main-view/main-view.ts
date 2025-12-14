import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Api } from '../../../environments/api';
import { Button } from '../../shared/buttons/button/button';
import { EpisodeCard } from '../../shared/components/episode-card/episode-card';
import { AdminEpisodeCard } from '../episodes-view/admin-episode-card/admin-episode-card';
import { AdminService } from '../service/admin-service';
import { forkJoin } from 'rxjs';

import { Article } from '../service/articles-service/articles-service';
import { NewsWebsite } from '../service/robots-service/robots-service';
import { Episode } from '../service/episodes-service/episodes-service';
import { News } from '../service/news-service/news-service';

@Component({
  selector: 'app-main-view',
  imports: [Button, EpisodeCard, AdminEpisodeCard],
  templateUrl: './main-view.html',
  styleUrl: './main-view.scss',
})
export class MainView implements OnInit, AfterViewInit {
  private adminService = inject(AdminService);

  private cdr = inject(ChangeDetectorRef); // You can inject in constructor or as a field

  // --------------------------
  // OBJECT DECLARATIONS
  // --------------------------
  episode: Episode = {
    _id: '',
    title: '',
    about: [],
    author: '',
    date: '',
    number: 0,
    season: 0,
    imageUrl: '',
    audioUrl: '',
    sources: [],
    transcript: '',
    posted: false,
  };

    article: Article = {
    _id: '',
    title: '',
    date: '',
    author: '',
    url: '',
    imageUrl: '',
    text: [],
    sources: [],
    summary: '',
    posted: false,
  };

   news: News = {
    author: '',
    date: '2010-01-17',
    summary: '',
    text: '',
    title: '',
    url: '',
    _id: '',
  };

    robot: NewsWebsite = {
    _id: '',
    name: '',
    url: '',
    status: '',
  };


  newsListMain: any = [];
  articlesListMain: any = [];
  episodesListMain: any = [];
  robotsListMain: any = [];

  articlesLength = 0;
  episodesLength = 0;
  newsLength = 0;
  robotsLength = 0;

  constructor() {}

  ngOnInit(): void {
    // 1. Create an object where keys are the property names and values are the Observables
    const dataSources = {
      articles: this.adminService.getAllArticles(),
      robots: this.adminService.getRobots(),
      episodes: this.adminService.getAllEpisodes(),
      news: this.adminService.getAllNews(),
    };

    // 2. Use forkJoin to wait for all observables to complete
    forkJoin(dataSources).subscribe({
      next: (results) => {
        // results will be an object:
        // { articles: articlesData, robots: robotsData, episodes: episodesData, news: newsData }

        console.log(results);
        let a = results;
        let b = a.articles;
        let articlesArray = results.articles;
        let episodesArray = results.episodes;
        let newsArray = results.news;
        let robotsArray = results.robots;

        console.log('articlesarray', articlesArray, articlesArray);
        console.log(episodesArray);
        console.log(newsArray);
        console.log(robotsArray);
        
        this.articlesListMain = articlesArray;
        this.episodesListMain = episodesArray;
        this.newsListMain = newsArray;
        this.robotsListMain = robotsArray;
        
        this.articlesLength = this.articlesListMain.length;
        this.episodesLength = this.episodesListMain.length;
        this.newsLength = this.newsListMain.length;
        this.robotsLength = this.robotsListMain.length;
        // this.articlesList = articlesArray;
        // this.articlesList = results.articles;
        // this.robotsList = results.robots;
        // this.episodesList = results.episodes;
        // this.newsList = results.news;

        console.log('All data fetched:', results);

        // 3. Manually trigger change detection if the component's strategy requires it
        // This is often needed when subscribing within ngOnInit or when using OnPush
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching data with forkJoin:', err);
        // Handle error appropriately (e.g., show a user notification)
      },
    });
  }

  ngAfterViewInit(): void {}

  // --------------------------
  // EPISODES
  // --------------------------
  navigateToNewEpisodeView() {
    this.adminService.triggerViewChange('new-episode', 'episodes-view');
  }

  navigateToEpisodePage(episodeId: string, episodeData: any, editMode?: boolean) {
    this.adminService.triggerViewChange(
      'episode-page',
      'episodes-view',
      episodeId,
      episodeData,
      editMode
    );
  }

  postEpisode(episode: Episode) {
    console.log(episode._id);
    if (episode.posted === true) {
      episode.posted = false;
      console.log(episode);
      // if (this.episode._id) {
      if (!episode._id) {
        console.error('Cannot update episode status: Episode ID is missing.');
        return; // Exit the function if no ID is available
      }
      this.adminService.patchEpisodePostedStatus(episode._id, episode.posted).subscribe({
        next: (response) => {
          // console.log('Posted status updated successfully:', response);
        },
        error: (error) => {
          // console.error('Error :', error);
        },
      });
      // }
    } else {
      episode.posted = true;
      // if (this.episode._id) {
      if (!episode._id) {
        console.error('Cannot update episode status: Episode ID is missing.');
        return; // Exit the function if no ID is available
      }
      this.adminService.patchEpisodePostedStatus(episode._id, episode.posted).subscribe({
        next: (response) => {
          // console.log('Posted status updated successfully:', response);
        },
        error: (error) => {
          // console.error('Error updating posted status:', error);
        },
      });
      // }
    }
    console.log('from view', episode);
  }

  editEpisode(id: string, ep: Episode, editMode: boolean) {
    this.navigateToEpisodePage(id, ep, editMode);
  }

  deleteEpisode(_id: string) {
    this.adminService.deleteEpisode(_id).subscribe(
      (response) => {
        console.log('Article deleted successfully', response);
        // Re-fetch the articles after deletion
        this.adminService.getAllEpisodes().subscribe((data) => {
          let episodes = data;
          this.episodesListMain = episodes;
          this.cdr.detectChanges(); // Update the view
        });
      },
      (error) => {
        console.error('Error deleting article', error);
      }
    );
  }


  // --------------------------
  // NEWS
  // --------------------------

  // --------------------------
  // ROBOTS
  // --------------------------

  // --------------------------
  // ARTICLES
  // --------------------------
}
