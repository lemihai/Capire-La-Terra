import { Component, inject, Input } from '@angular/core';
import {
  Episode,
  EpisodeComponent,
} from '../episodes-view/episode-component/episode-component';
import { Article, ArticleComponent } from '../news-view/article/article';
import {
  Robot,
  RobotsComponent,
} from '../robots-view/robots-component/robots-component';
import { NewsService } from '../news-view/news.service';
import { EpisodesService } from '../episodes-view/episode.service';
import { RobotsService } from '../robots-view/robots.service';

@Component({
  selector: 'app-main-view',
  imports: [ArticleComponent, RobotsComponent, EpisodeComponent],
  templateUrl: './main-view.html',
  styleUrl: './main-view.scss',
})
export class MainView {
  private articleService = inject(NewsService);
  private episodesService = inject(EpisodesService);
  private robotsService = inject(RobotsService);

  articles: Article[] = [];
  episodes: Episode[] = [];
  robots: Robot[] = [];

  ngOnInit() {
    // Getting the articles
    this.articleService.getArticles().subscribe({
      next: (response: Article[]) => {
        this.articles = response;
        console.log(this.articles);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
    // Getting the Robots
    this.robotsService.getRobots().subscribe({
      next: (response) => {
        this.robots = response;
        console.log(this.robots);
      },
      error: (error) => {
        console.log('There was an error!' + error);
      },
    });
    // Getting the episodes
    this.episodesService.getEpisodes().subscribe({
      next: (response) => {
        this.episodes = response;
        console.log(this.episodes);
      },
      error: (error) => {
        console.log('there was an error!' + error);
      },
    });
  }
}
