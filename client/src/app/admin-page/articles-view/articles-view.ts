import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { Article, ArticlesService } from '../service/articles-service/articles-service';
import { Router, RouterOutlet } from '@angular/router';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { ArticleCard } from './article-card/article-card';
import { Button } from "../../shared/buttons/button/button";

@Component({
  selector: 'app-articles-view',
  imports: [RouterOutlet, ArticleCard, Button],
  templateUrl: './articles-view.html',
  styleUrl: './articles-view.scss',
})
export class ArticlesView {
  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private newsService: ArticlesService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  private smoother: ScrollSmoother | null = null;

  article: Article = {
    _id: '',
    title: '',
    date: '',
    author: '',
    text: '',
    sources: [],
    summary: '',
  };

  articles: any = [];

  ngOnInit(): void {
    this.adminService.getAllArticles().subscribe((data) => {
      this.articles = data;
      console.log('This is the Articles response: ', data);
      this.cdr.detectChanges(); // Manually trigger change detection if needed
    });
  }

  navigateToArticlePage() {
    this.adminService.triggerViewChange('admin-article-page', 'articles-view');
  }
}
