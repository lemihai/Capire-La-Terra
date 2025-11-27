import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Footer } from '../../footer/footer';
import { SourceComponent } from "../../shared/components/source.component/source.component";
import { ProfileCard } from '../../shared/components/profile-card/profile-card';
import { NewsCardComponent } from "../../shared/components/news-card.component/news-card.component";

interface Article {
  _id: string;
  url: string;
  title: string;
  author: string;
  date: string;
  text: string;
  // source: string;
  summary: string;
}

@Component({
  selector: 'app-article-page',
  imports: [Footer, SourceComponent, ProfileCard, NewsCardComponent],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss',
})
export class ArticlePage {
  private smoother: ScrollSmoother | null = null;

  constructor(private ngZone: NgZone) {}

  articles: Article[] = [
    {
      _id: '3243223', // Changed from `id` to `_id` and made it a string
      url: 'https://example.com/article1', // Added `url`
      title: 'This is an article example', // Changed from `name` to `title`
      author: 'Sofia', // Added `author`
      date: '2025-11-26', // Added `date`
      text: "Ecco il pilot del nostro podcast, oggi parliamo,  in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.", // Changed from `description` to `text`
      summary:
        'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,', // Added `summary`
    },
  ];

  ngOnInit() {
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
    });
  }
}
