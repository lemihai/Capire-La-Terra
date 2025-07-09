import { Component, inject, Input } from '@angular/core';
import { EpisodeComponent } from '../episodes-view/episode-component/episode-component';
import { Article } from '../news-view/article/article';
import { RobotsComponent } from '../robots-view/robots-component/robots-component';
import { NewsService } from '../news-view/news.service';

@Component({
  selector: 'app-main-view',
  imports: [Article, RobotsComponent, EpisodeComponent],
  templateUrl: './main-view.html',
  styleUrl: './main-view.scss'
})
export class MainView {
  private articleService = inject(NewsService);

  articles: Article[] = [];

  ngOnInit() {
    this.articleService.getArticles().subscribe({
      next: (response: Article[]) => {
        this.articles = response;
        console.log(this.articles);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
