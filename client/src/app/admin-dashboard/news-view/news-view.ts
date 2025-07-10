import { Component, inject, OnInit } from '@angular/core';
import { Article, ArticleComponent } from './article/article';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news-view',
  imports: [ArticleComponent],
  templateUrl: './news-view.html',
  styleUrl: './news-view.scss',
})
export class NewsView implements OnInit {
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
