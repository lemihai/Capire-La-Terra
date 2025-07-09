import { Component, Input, OnInit, inject } from '@angular/core';

export interface Article {
  _id: string;
  name: string;
  title: string;
  author: string;
  date: string; 
  text: string;
  url: string;
}

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class Article {
  @Input() article!: Article;
  // private articleService = inject(NewsService)

  // articles: any[] = []

  // ngOnInit() {
  //   this.articleService.getArticles().subscribe({
  //     next: (response) => {
  //       this.articles = response
  //       console.log(this.articles);
  //     },
  //     error: (error) => {
  //       console.error('There was an error!', error);
  //     }
  //   });
  // }
}
