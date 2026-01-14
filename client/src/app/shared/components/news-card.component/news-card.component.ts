import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { ProfileCard } from '../profile-card/profile-card';
import { SourceComponent } from '../source.component/source.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarGsapService } from '../../../navbar/navbar-gsap-service';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { News } from '../../../admin-page/service/news-service/news-service';
import { AdminService } from '../../../admin-page/service/admin-service';

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
export class NewsCardComponent implements OnInit {
  @Input() article: News = {
    _id: '',
    url: '',
    title: '',
    author: '',
    date: '',
    text: '',
    summary: '',
  };
  @Input() cardType: string = ''; // Default value
  @Input() cardDirection: string = ''; // Default value

  @Output() deleteArticle = new EventEmitter<{ id: string}>();
  @Output() navigateToArticle = new EventEmitter<{ id: string}>();

  source = '';
  currentRoute: string = '';

  articlesGG: News[] = [
    {
      _id: '3243223', // Changed from `id` to `_id` and made it a string
      url: 'https://example.com/article1', // Added `url`
      title: 'This is an article example', // Changed from `name` to `title`
      author: 'Sofia', // Added `author`
      date: '2010-01-17', // Added `date`
      text: "Ecco il pilot del nostro podcast, oggi parliamo,  in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.", // Changed from `description` to `text`
      summary:
        'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,', // Added `summary`
    },
  ];

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private navbarGsapService: NavbarGsapService
  ) {
    gsap.registerPlugin(CustomEase);
  }

  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  ngOnInit(): void {
    // this.defineSource(this.article.url);
    this.source = this.article.url;
    console.log(this.article);
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
            this.router.navigate([url]);
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
        0
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
        0
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
        0
      );
      exitTimeline.to(
        '.transition-horizontal-line',
        {
          maxWidth: '0rem',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0
      );
      exitTimeline.to(
        '.transition-vertical-line',
        {
          maxHeight: '0rem',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0
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
        0
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
        0
      );
    });
  }

  navigateToArticlePage() {
    this.updateRoute();
    this.triggerPageTransition('/article-page', this.currentRoute);
    // Update this so that it navigates to the article page but with the specific ID
  }

  onDeleteArticle() {
    this.deleteArticle.emit();
  }

  onNavigateToArticle(){
    this.navigateToArticle.emit();
  }

  // defineSource(url: string) {
  //   // console.log(url);
  //   if (url.includes('aljazeera')) {
  //     this.source = 'aljazeera';
  //   }
  //   if (url.includes('cleantechnica')) {
  //     this.source = 'cleantechnica';
  //   }
  //   if (url.includes('climatechange')) {
  //     this.source = 'climatechange';
  //   }
  //   if (url.includes('euronews')) {
  //     this.source = 'euronews';
  //   }
  //   if (url.includes('greenpeace')) {
  //     this.source = 'greenpeace';
  //   }
  //   if (url.includes('iea')) {
  //     this.source = 'iea';
  //   }
  //   if (url.includes('mongabay')) {
  //     this.source = 'mongabay';
  //   }
  //   if (url.includes('nature.')) {
  //     this.source = 'nature';
  //   }
  //   if (url.includes('theguardian')) {
  //     this.source = 'theguardian';
  //   }
  //   if (url.includes('woodcentral')) {
  //     this.source = 'woodcentral';
  //   }
  // }
}
