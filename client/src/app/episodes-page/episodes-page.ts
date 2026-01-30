import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  inject,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AudioTrack } from '../shared/components/audio-track/audio-track';
import { Button } from '../shared/buttons/button/button';
import { EpisodeCard } from '../shared/components/episode-card/episode-card';

import { NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';
import { Footer } from '../footer/footer';
import { EpisodesService } from '../../services/episodes-service/episodes-service';

@Component({
  selector: 'app-episodes-page',
  imports: [NgOptimizedImage, AudioTrack, Button, EpisodeCard, Footer],
  templateUrl: './episodes-page.html',
  styleUrl: './episodes-page.scss',
})
export class EpisodesPage implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  @ViewChild('playerWidth') playerWidth!: ElementRef<HTMLDivElement>;
  @ViewChild('largeCard') largeCard!: ElementRef<HTMLDivElement>;
  @ViewChild('seasonComponent') seasonComponent!: ElementRef<HTMLDivElement>;
  private smoother: ScrollSmoother | null = null;
  private episodesService = inject(EpisodesService);

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  focused = 'on-s1';
  se1active = 'seactive';
  se2active = '';
  se3active = '';
  isPlaying = 'true';
  topPartDisabled = '';
  expandButton = '';
  numberOfSeasons = 1;

  // For animations in gsap
  time = 1.24;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');
  // ease = 'power3.out';

  play() {
    if (this.isPlaying == 'true') {
      this.isPlaying = 'false';
    } else if (this.isPlaying == 'false') {
      this.isPlaying = 'true';
    }
  }

  focuss1() {
    this.focused = 'on-s1';
    this.se1active = 'seactive';
    this.se2active = '';
    this.se3active = '';
  }
  focuss2() {
    this.focused = 'on-s2';
    this.se1active = '';
    this.se2active = 'seactive';
    this.se3active = '';
  }
  focuss3() {
    this.focused = 'on-s3';
    this.se1active = '';
    this.se2active = '';
    this.se3active = 'seactive';
  }

  episodes: any = [];
  sortedListView: any = [];

  ngOnInit() {
    this.episodesService.getAllEpisodes().subscribe(
      (data) => {
        this.episodes = data;
        // console.log(this.episodes);
        this.sort();
        this.cdr.detectChanges();
      },
      (error) => {
        this.cdr.detectChanges();
        // console.log(error);
      },
    );
    this.cdr.detectChanges();
    // this.episodesService.getAllEpisodes().subscribe((data) => {
    //   // let dataList = data;
    //   //  for (const article of data){
    //     //   console.log(data);
    //     //  }
    //     //  for(const a of data ){
    //       //   console.log(a);
    //       //  }
    //       // this.articles = [...data];
    //       this.articles = data;
    //   // this.sorting.sortedListView = [...this.articles];
    //   // this.sort('date');
    //   // this.cdr.detectChanges(); // Manually trigger change detection if needed
    // });
    // Register GSAP plugins here once
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.largeCard);
    console.log(changes);
  }

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }
  }

  async ngAfterViewInit() {
    this.cdr.detectChanges();
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
        gsap.to('.hero-h1', {
          height: '120px',
          width: '48rem',
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.episodes-list', {
          height: 'auto',
          opacity: 1,
          minHeight: '100vh',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.hero-h1A', {
          height: '120px',
          width: '26rem',
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.season-h1', {
          height: '120px',
          width: '128px',
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.header-dropdown', {
          height: '120px',
          width: '22rem',
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        // --------------------------------
        // Episode Card
        // --------------------------------
        gsap.to('.medium', {
          height: '8rem',
          minWidth: '40rem',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });

        gsap.to('.episode-number', {
          width: 'auto',
          height: 'auto',
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.episode-dash', {
          width: '1.6rem',
          height: 'auto',
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.episode-title', {
          width: '100%',
          height: 'auto',
          // color: 'red',
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.app-profile-card-wrapper-for-transform', {
          width: 'auto',
          height: 'auto',
          translateX: 0,
          translateY: 0,
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.date', {
          width: 'auto',
          height: 'auto',
          translateX: 0,
          translateY: 0,
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.topic', {
          width: 'auto',
          height: 'auto',
          translateX: 0,
          translateY: 0,
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.bottom-container', {
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.episode-image', {
          width: '6.4rem',
          minWidth: '6.4rem',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.separator-line', {
          height: '1rem',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.audio-track-wrapper', {
          translateX: 0,
          translateY: 0,
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: 'auto',
        });
        // INTRODUCE SCALE TO AVOID THE WEIRD WARPS
        gsap.to('.audio-track-wrapper-large', {
          // width: '100%',
          translateX: 0,
          translateY: 0,
          skewX: 0,
          skewY: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: 'auto',
        });

        ScrollTrigger.create({
        trigger: '.large',
        start: 'top top',
        end: 'top top',
        // pin: '.text-container',
        // pinType: 'fixed',
        pinSpacing: false,
        markers: false,
      });
      }, 900);
    });

    const largeCards = gsap.utils.toArray('.episode-wrapper[cardType="large"]');
    console.log(largeCards);
  }

  sort() {
    // 1. Determine the current direction and update the specific key flag
    // can be -1 or 1
    const asc = 1;
    const desc = -1;
    let numberOfSeasons = 1;
    let episodesArray: any[] = [];

    for (const episode of this.episodes) {
      if (episode.season > numberOfSeasons) {
        numberOfSeasons = episode.season;
        this.numberOfSeasons = numberOfSeasons;
      }
    }

    // Iterating through the episodes array to create an array of seasons.
    // WHY? to make it easier to arrange afterwards
    for (let season = 1; season <= numberOfSeasons; season++) {
      let seasonArray: any[] = [];
      for (const episode of this.episodes) {
        if (season === episode.season) {
          seasonArray.push(episode);
        }
      }
      episodesArray.push(seasonArray);

      // Then, sorting the array
      episodesArray[season - 1].sort((a: any, b: any) => {
        // Use 'any' for the list items here
        let valA = a['number'];
        let valB = b['number'];

        const numA = Number(valA);
        const numB = Number(valB);
        return (numA - numB) * desc;
      });
    }

    // Make a list of lists
    // for each season add an array inside of the array
    // Sort each season array individually,
    // spread the arrays

    // 2. Perform the sort
    this.episodes.sort((a: any, b: any) => {
      // Use 'any' for the list items here
      let valA = a['number'];
      let valB = b['number'];

      const numA = Number(valA);
      const numB = Number(valB);
      return (numA - numB) * asc;
    });

    // console.log(episodesArray);
    this.episodes = [];
    for (let i = episodesArray.length - 1; i >= 0; i--) {
      this.episodes.push(...episodesArray[i]);
    }

    // console.log(this.numberOfSeasons);
    this.cdr.detectChanges(); // Update the view after sorting
  }
}
