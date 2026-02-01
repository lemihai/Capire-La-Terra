import {
  Component,
  NgZone,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';

import { Footer } from '../../footer/footer';
import { SourceComponent } from '../../shared/components/source.component/source.component';
import { ProfileCard } from '../../shared/components/profile-card/profile-card';
import { NewsCardComponent } from '../../shared/components/news-card.component/news-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../../services/articles-service/articles-service';

export interface Article {
  _id: string;
  title: string;
  date: string;
  author: string;
  url: string;
  imageUrl: string;
  text: string[];
  sources: string[];
  summary: string;
  posted: boolean;
}

@Component({
  selector: 'app-article-page',
  imports: [Footer, SourceComponent, ProfileCard, NewsCardComponent],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss',
})
export class ArticlePage {
  private smoother: ScrollSmoother | null = null;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticlesService);

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

  paragraphs: string[] = [];

  ngOnInit() {
    // Register GSAP plugins here once
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null || id != undefined) {
      this.articleService.getOneArticle(id).subscribe(
        (data) => {
          this.article = data;
          console.log('Article data:', this.article);
          this.cdr.detectChanges();

          // Initialize GSAP after data is loaded
          this.ngZone.runOutsideAngular(() => {
            gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

            this.smoother = ScrollSmoother.create({
              wrapper: '#smooth-wrapper',
              content: '#smooth-content',
              smooth: 1,
              effects: true,
              normalizeScroll: false,
              ignoreMobileResize: true,
              smoothTouch: false,
            });

            // --------------------------------
            // START FROM THE OTP OF THE PAGE NO MATTER WHERE YOU'RE COMING FROM
            // --------------------------------
            this.smoother.scrollTo(0, false);

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
              gsap.to('.transition-image', {
                minHeight: '40rem',
                maxHeight: '40rem',
                scale: 1,
                rotate: 0,
                duration: this.timeFast,
                ease: this.ease,
                overwrite: true,
              });
              gsap.to('.transition-horizontal-line', {
                width: '100%',
                maxWidth: '100%',
                rotate: 0,
                duration: this.time,
                ease: this.ease,
                overwrite: true,
              });
              gsap.to('.transition-vertical-line', {
                maxHeight: '100%',
                y: 0,
                rotate: 0,
                duration: this.time,
                ease: this.ease,
                overwrite: true,
              });
            }, 400);
          });
        },
        (error) => {
          console.error('Error fetching article:', error);
        },
      );
    }
  }

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }
  }

  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  ngAfterViewInit() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 2000);
  }
}
