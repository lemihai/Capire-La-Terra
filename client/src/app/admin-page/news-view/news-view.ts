import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { Article, NewsService } from '../service/news-service/news-service';
import { NewsCardComponent } from '../../shared/components/news-card.component/news-card.component';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-news-view',
  imports: [NewsCardComponent, RouterOutlet],
  templateUrl: './news-view.html',
  styleUrl: './news-view.scss',
})
export class NewsView implements OnInit, AfterViewInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private newsService: NewsService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  private smoother: ScrollSmoother | null = null;

  article: Article = {
    author: '',
    date: '2010-01-17',
    summary: '',
    text: '',
    title: '',
    url: '',
    _id: '',
  };

  articles: any = [];

  ngOnInit(): void {
    this.adminService.getAllNews().subscribe((data) => {
      this.articles = data;
      // console.log('Articles loaded:', this.articles); // Now safe to use
      this.cdr.detectChanges(); // Manually trigger change detection if needed
    });
  }

  showarticles() {
    console.log(this.articles);
  }

  ngAfterViewInit(): void {
    console.log('test');
    console.log(this.articles);
  }

  navigateToNewsArticlePage() {
    this.adminService.triggerViewChange('news-article-view', 'news-view');
  }
}
