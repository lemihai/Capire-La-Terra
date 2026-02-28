import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { EpisodeCard } from '../shared/components/episode-card/episode-card';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';
import { Footer } from '../footer/footer';
import { EpisodesService } from '../../services/episodes-service/episodes-service';

@Component({
  selector: 'app-episodes-page',
  imports: [EpisodeCard, Footer],
  templateUrl: './episodes-page.html',
  styleUrl: './episodes-page.scss',
})
export class EpisodesPage implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  @ViewChild('playerWidth') playerWidth!: ElementRef<HTMLDivElement>;
  @ViewChild('largeCard') largeCard!: ElementRef<HTMLDivElement>;
  @ViewChildren('largeCard', { read: ElementRef }) largeCards!: QueryList<ElementRef>;
  @ViewChild('seasonComponent') seasonComponent!: ElementRef<HTMLDivElement>;
  @ViewChild('footer') footer!: ElementRef<HTMLDivElement>;

  private observer: IntersectionObserver | null = null;
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

  viewportWidth = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.viewportWidth = window.innerWidth;
    if (this.viewportWidth > 1100) {
      gsap.to('.hero-h1-A', {
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
        width: '20rem',
        skewX: 0,
        skewY: 0,
        scale: 1,
        rotate: 0,
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
    }
    this.cdr.detectChanges();
  }

  // For animations in gsap
  time = 1.24;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

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
    
    this.cdr.detectChanges();

    // Register GSAP plugins here once
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }
  }

  async ngAfterViewInit() {
    this.cdr.detectChanges();
    // setTimeout(() => {

    

    // }, 500);
    this.ngZone.runOutsideAngular(() => {
      // Create the smoother instance
      this.smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
        smoothTouch: false,
      });

      this.episodesService.getAllEpisodes().subscribe(
      (data) => {
        this.focuss1();
        this.episodes = data;
        this.sort();
        this.cdr.detectChanges();
      
      

      gsap.to('.hero-h1-A', {
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
      this.cdr.detectChanges();
      setTimeout(() => {
        // --------------------------------
        // TEXT SECTION
        // --------------------------------
        // gsap.fromTo(
        //   '.hero-h1',
        //   { skewX: -32, skewY: 8, scale: 0.8, opacity: 0 }, // Start state
        //   { skewX: 0, skewY: 0, scale: 1, opacity: 1, duration: this.time, ease: this.ease }, // End state
        // );
        gsap.to('.hero-h1-A', {
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

        gsap.to('h1', {
          // width: '32rem',
          // height: '4.7rem',
          skewX: 0,
          skewY: 0,
          rotate: 0,
          scale: 1,
          translateY: 0,
          translateX: '-.8rem',
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-horizontal-line', {
          width: '100%',
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
          width: '20rem',
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
        // gsap.to('.episode-dash', {
        //   width: '1.6rem',
        //   height: 'auto',
        //   skewX: 0,
        //   skewY: 0,
        //   scale: 1,
        //   rotate: 0,
        //   duration: this.time,
        //   ease: this.ease,
        //   overwrite: true,
        // });
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
        // gsap.to('.topic', {
        //   width: 'auto',
        //   height: 'auto',
        //   translateX: 0,
        //   translateY: 0,
        //   skewX: 0,
        //   skewY: 0,
        //   scale: 1,
        //   rotate: 0,
        //   duration: this.time,
        //   ease: this.ease,
        //   overwrite: true,
        // });
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
        
      }, 800);
      this.cdr.detectChanges();
      setTimeout(() => {
        this.largeCards.forEach((cardRef, index) => {
          ScrollTrigger.create({
            trigger: cardRef.nativeElement,
            start: 'top 320px',
            end: 'bottom 320px',
            // markers: true,
            onEnter: () => this.entered(index),
            onEnterBack: () => this.entered(index),
            onLeave: () => this.left(index),
            onLeaveBack: () => this.left(index),
          });
          
          this.cdr.detectChanges();
        });
        const last = this.largeCards.last.nativeElement
        console.log(last);
        // console.log(last);
        
        
        ScrollTrigger.create({
            trigger: last,
            start: 'bottom 320px',
            end: '+=300px 320px',
            // markers: true,
            onEnter: () => {
              gsap.to('.hero-h1-A', {
                scale: 1,
                rotate: 0,
                duration: 2,
                ease: this.ease,
                overwrite: 'auto',
              });
            },
            onEnterBack: () => {
              gsap.to('.hero-h1-A', {
                height: '107px',
                y: 0,
                skewX: 0,
                skewY: 0,
                scale: 1,
                rotate: 0,
                duration: 1,
                ease: this.ease,
                overwrite: 'auto',
              });
              gsap.to('.header-dropdown', {
                height: '120px',
                width: '20rem',
                skewX: 0,
                skewY: 0,
                scale: 1,
                rotate: 0,
                duration: 1,
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
                duration: 1,
                ease: this.ease,
                overwrite: true,
              });
            },
            onLeave: () => {
              gsap.to('.hero-h1-A', {
                height: '0px',
                y: -60,
                skewX: 32,
                skewY: 8,
                scale: 1,
                rotate: 0,
                duration: 1,
                ease: this.ease,
                overwrite: 'auto',
              });
              gsap.to('.header-dropdown', {
                height: '0px',
                width: '0rem',
                skewX: 24,
                skewY: 8,
                scale: 1,
                rotate: 0,
                duration: 1,
                ease: this.ease,
                overwrite: true,
              });
              gsap.to('.season-h1', {
                height: '0px',
                width: '0px',
                skewX: 16,
                skewY: 8,
                scale: 1,
                rotate: 0,
                duration: 1,
                ease: this.ease,
                overwrite: true,
              });
            },
            onLeaveBack: () => {
              gsap.to('.hero-h1-A', {
                scale: 1,
                rotate: 0,
                duration: 2,
                ease: this.ease,
                overwrite: 'auto',
              });
            },
          });
      }, 600);
      },
      (error) => {
        console.log(error);
      },
    );
    });
  }

  entered(index: number) {
    // season3 = index 0
    // season2 = index 1
    // season1 = index 2
    if (index === 0) {
      gsap.to('#seasonComponent', {
        translateY: '0rem',
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
    } else if (index === 1) {
      gsap.to('#seasonComponent', {
        translateY: '-12rem',
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
    } else if (index === 2) {
      gsap.to('#seasonComponent', {
        translateY: '-24rem',
        duration: this.time,
        ease: this.ease,
        overwrite: true,
      });
    }
  }
  left(index: number) {}

  sort() {
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

    for (let season = 1; season <= numberOfSeasons; season++) {
      let seasonArray: any[] = [];
      for (const episode of this.episodes) {
        if (season === episode.season) {
          seasonArray.push(episode);
        }
      }
      episodesArray.push(seasonArray);

      episodesArray[season - 1].sort((a: any, b: any) => {
        let valA = a['number'];
        let valB = b['number'];

        const numA = Number(valA);
        const numB = Number(valB);
        return (numA - numB) * desc;
      });
    }

    this.episodes.sort((a: any, b: any) => {
      let valA = a['number'];
      let valB = b['number'];

      const numA = Number(valA);
      const numB = Number(valB);
      return (numA - numB) * asc;
    });

    this.episodes = [];
    for (let i = episodesArray.length - 1; i >= 0; i--) {
      this.episodes.push(...episodesArray[i]);
    }

    this.cdr.detectChanges();
  }
}
