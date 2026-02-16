import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProfileCard } from '../profile-card/profile-card';
import { SourceComponent } from '../source.component/source.component';
import { NavigationExtras, Router } from '@angular/router';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { Article } from '../../../news-page/article-page/article-page';
import { News } from '../../../admin-page/service/news-service/news-service';

@Component({
  selector: 'app-news-card',
  imports: [ProfileCard, SourceComponent],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent implements OnInit, OnChanges {
  @Input() article: Article = {
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

  viewportWidth = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.viewportWidth = window.innerWidth;
    this.cdr.detectChanges();
  }

  @Input() news: News = {
    _id: '',
    title: '',
    author: '',
    date: '',
    text: '',
    summary: '',
    url: '',
  };
  @Input() cardType: string = '';
  @Input() cardDirection: string = '';
  @Output() deleteArticle = new EventEmitter<{ id: string }>();
  @Output() navigateToArticle = new EventEmitter<{ id: string }>();

  source = '';
  currentRoute: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone,
  ) {
    gsap.registerPlugin(CustomEase);
  }

  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  ngOnInit(): void {
    this.source = this.news.url;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardType']) {
      this.cardType = changes['cardType'].currentValue;
      this.cdr.detectChanges();
    }
  }

  updateRoute() {
    this.currentRoute = this.router.url;
  }

  private triggerPageTransition(url: string, fromRoute: string) {
    const customEase = 'cubic-bezier(0,.55,.52,.96)';

    this.ngZone.runOutsideAngular(() => {
      const exitTimeline = gsap.timeline({
        onComplete: () => {
          this.ngZone.run(() => {
            const navigationExtras: NavigationExtras = {
              state: this.article,
            };

            this.router.navigate([url], navigationExtras);
          });
        },
      });

      exitTimeline.to(
        '.transition-A',
        {
          height: '0rem',
          x: 0,
          y: 0,
          skewX: 16,
          skewY: 8,
          opacity: 0,
          scale: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      );
      exitTimeline.to(
        '.news-card-wrapper.right .image',
        {
          height: '0rem',
          minHeight: '0rem',
          maxHeight: '0rem',
          scale: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      );
      exitTimeline.to(
        '.news-card-wrapper.left .image',
        {
          height: '0rem',
          minHeight: '0rem',
          maxHeight: '0rem',
          scale: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      );
      exitTimeline.to(
        '.transition-horizontal-line',
        {
          maxWidth: '0rem',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      );
      exitTimeline.to(
        '.transition-vertical-line',
        {
          maxHeight: '0rem',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      );
      exitTimeline.to(
        '.transition-vertical-line-inside-card',
        {
          maxHeight: '0rem',
          y: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      );
      exitTimeline.to(
        '.transition-image-A ',
        {
          maxHeight: '0rem',
          y: -8,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      );
    });
  }

  navigateToArticlePage() {
    this.updateRoute();

    this.triggerPageTransition(`/article-page/${this.article._id}`, this.currentRoute);
  }

  onDeleteArticle() {
    this.deleteArticle.emit();
  }

  onNavigateToArticle() {
    this.navigateToArticle.emit();
  }
}
