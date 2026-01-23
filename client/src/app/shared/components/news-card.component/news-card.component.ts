import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProfileCard } from '../profile-card/profile-card';
import { SourceComponent } from '../source.component/source.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavbarGsapService } from '../../../navbar/navbar-gsap-service';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { AdminService } from '../../../admin-page/service/admin-service';
import { Article } from '../../../news-page/article-page/article-page';
import { News } from '../../../admin-page/service/news-service/news-service';

// export interface Article {
//   _id?: string; // MongoDB ID (optional for new articles)
//   title: string;
//   author?: string;
//   date?:string;
//   text: string;
//   summary: string;
//   url: string;
//   // Add other fields as needed
// }

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

  @Input() news: News = {
    _id: '',
    title: '',
    author: '',
    date: '',
    text: '',
    summary: '',
    url: '',
    // Add other fields as needed
  };
  // define input news if they look like news
  // The errors appear because of two conflicting models inside one component
  @Input() cardType: string = ''; // Default value
  @Input() cardDirection: string = ''; // Default value

  @Output() deleteArticle = new EventEmitter<{ id: string }>();
  @Output() navigateToArticle = new EventEmitter<{ id: string }>();

  source = '';
  currentRoute: string = '';

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private navbarGsapService: NavbarGsapService,
  ) {
    gsap.registerPlugin(CustomEase);
  }

  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  ngOnInit(): void {
    // this.defineSource(this.article.url);
    // console.log(this.news);

    this.source = this.news.url;
    
    // console.log(1, this.article);
    // const spacePositions = [];
    // let index = preview.indexOf(' ');
    // while (index !== -1 && spacePositions.length < 30) {
    //   spacePositions.push(index);
    //   index = preview.indexOf(' ', index + 1);
    // }
    // const cutIndex = spacePositions[29] || preview.length;
    // preview = preview.substring(0, cutIndex);
    // console.log(preview);
    // console.log(this.source);
    // console.log(this.article);
    // console.log(this.article);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    if (changes['article']) {
      // this.article = { ...this.article };
    }
    console.log(1, this.article);
    this.cdr.detectChanges();
  }

  updateRoute() {
    this.currentRoute = this.router.url;
  }

  private triggerPageTransition(url: string, fromRoute: string) {
    const customEase = 'cubic-bezier(0,.55,.52,.96)';
    // console.log('THIS IS the route we are coming from', fromRoute);

    this.ngZone.runOutsideAngular(() => {
      // 1. Create a new GSAP Timeline
      const exitTimeline = gsap.timeline({
        // 2. Place the navigation logic in the timeline's main onComplete
        onComplete: () => {
          // --- Single Navigation Point ---

          this.ngZone.run(() => {
            const navigationExtras: NavigationExtras = {
              state: this.article,
            };

            // console.log(navigationExtras);

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
    // console.log(this.article._id);
    this.triggerPageTransition(`/article-page/${this.article._id}`, this.currentRoute);
    // Update this so that it navigates to the article page but with the specific ID
  }

  onDeleteArticle() {
    this.deleteArticle.emit();
  }

  onNavigateToArticle() {
    this.navigateToArticle.emit();
  }

}
