import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';
import { NewsCardComponent } from '../shared/components/news-card.component/news-card.component';
import { Footer } from '../footer/footer';
import { ArticlesService } from '../../services/articles-service/articles-service';

@Component({
  selector: 'app-news-page',
  imports: [NewsCardComponent, Footer],
  templateUrl: './news-page.html',
  styleUrl: './news-page.scss',
})
export class NewsPage implements AfterViewInit, OnInit, OnDestroy {
  private smoother: ScrollSmoother | null = null;
  private articlesService = inject(ArticlesService);

  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  constructor(private ngZone: NgZone) {}

  articles: any = [];

  ngOnInit() {
    this.articlesService.getAllArticles().subscribe((data) => {
      this.articles = data;
    });
    // Register GSAP plugins here once
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    });
  }

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }
  }

  navigateToArticlePage(articleId: string, articleData: any) {
    console.log(articleId, articleData);
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Create the smoother instance
      this.smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        normalizeScroll: false,
        ignoreMobileResize: true,
        smoothTouch: false,
      });

      setTimeout(() => {
        // --------------------------------
        // TEXT SECTION
        // --------------------------------

        gsap.to('.transition-A', {
          height: 'auto',
          x: 0,
          y: 0,
          skewX: 0,
          skewY: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.news-card-wrapper.right .image', {
          height: '128%',
          minHeight: '48rem',
          maxHeight: '48rem',
          scale: 1,
          rotate: 0,
          duration: this.timeFast,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.news-card-wrapper.left .image', {
          height: '110%',
          minHeight: '42rem',
          maxHeight: '42rem',
          scale: 1,
          rotate: 0,
          duration: this.timeFast,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-horizontal-line', {
          maxWidth: '100%',
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-vertical-line', {
          maxHeight: '100%',
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-vertical-line-inside-card', {
          maxHeight: '1.2rem',
          y: 0,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-image-A ', {
          maxHeight: '25.2rem',
          y: 0,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
      }, 400);
    });
  }
}
