import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  ChangeDetectorRef,
  SimpleChanges,
  ApplicationRef,
  OnInit,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { AudioTrack } from '../audio-track/audio-track';
import { ProfileCard } from '../profile-card/profile-card';
import { PlayButton } from '../../buttons/play-button/play-button';
import { NgOptimizedImage } from '@angular/common';
import { SourceComponent } from '../source.component/source.component';

@Component({
  selector: 'app-episode-card',
  imports: [AudioTrack, ProfileCard, PlayButton, NgOptimizedImage, SourceComponent],
  templateUrl: './episode-card.html',
  styleUrl: './episode-card.scss',
})
export class EpisodeCard implements OnChanges, OnInit, AfterViewInit {
  @ViewChild('playerWidth') playerWidth!: ElementRef<HTMLDivElement>;
  @ViewChild('audioTrackWrapper') audioTrackWrapper!: ElementRef<HTMLDivElement>;
  @Input() cardType = '';
  @Input() episode: any = {};
  // episode card can be 'small', 'medium', 'large'

  viewportWidth = window.innerWidth;
  audioTrackWidth = this.calculateTrack(this.viewportWidth, 'medium');
  audioTrackWidthLarge = this.calculateTrack(this.viewportWidth, 'large');
  currentAudioTrackWidth!: number;
  imageUrl = '../../../../../public/assets/article-illustration-1.jpg';

  calculateTrack(wpWidth: number, cardType: string) {
    let width: number = 0;
    // 1500px
    // 1300-1500px
    // 800-1300px
    if (wpWidth > 1500) {
      if (cardType === 'medium') {
        width = 200;
      } else if (cardType === 'large') {
        width = 528;
      }
    } else if (wpWidth > 1300 && wpWidth <= 1500) {
      if (cardType === 'medium') {
        width = 164;
      } else if (cardType === 'large') {
        width = 446;
      }
    } else if (wpWidth > 800 && wpWidth <= 1300) {
      if (cardType === 'medium') {
        width = 132;
      } else if (cardType === 'large') {
        width = 408;
      }
    }
    // console.log('This is the viewport', wpWidth, typeof wpWidth);
    return width;
  }

  private smoother: ScrollSmoother | null = null;
  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {}

  ngOnInit() {
    // for (let i = 0; i <= 10; i++) {
    //   this.triggerChange();
    //   this.cdr.detectChanges();
    //   this.appRef.tick();
    // }
    // this.calculateTrack(this.viewportWidth);
    // console.log('this is the audio track width', this.audioTrackWidth);
    if (this.audioTrackWrapper) {
      // console.log(this.audioTrackWrapper.nativeElement.clientWidth);
      // console.log('test');
    }
  }

  ngAfterViewInit() {
    // setTimeout(()=>{

    // this.currentAudioTrackWidth = this.audioTrackWrapper.nativeElement.clientWidth;
    // this.audioTrackWidth = this.currentAudioTrackWidth;
    // console.log('teawfw', this.currentAudioTrackWidth, this.audioTrackWidth);

    /*
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
        gsap.to('.hero-h1', {
          height: '120px',
          width: '48rem',
          skewX: 0,
          skewY: 0,
          rotate: 0,
          duration: 1.6,
          ease: 'power2.out',
          overwrite: true,
        });
        gsap.to('.hero-h1A', {
          height: '120px',
          width: '26rem',
          skewX: 0,
          skewY: 0,
          rotate: 0,
          duration: 1.6,
          ease: 'power2.out',
          overwrite: true,
        });
        gsap.to('.season-h1', {
          height: '120px',
          width: '128px',
          skewX: 0,
          skewY: 0,
          rotate: 0,
          duration: 1.1,
          // delay: 1,
          ease: 'power2.out',
          overwrite: true,
        });
        gsap.to('.header-dropdown', {
          height: '120px',
          width: '22rem',
          skewX: 0,
          skewY: 0,
          rotate: 0,
          duration: 0.64,
          ease: CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 '),
          overwrite: true,
        });

        // gsap.to(
        //   '.episode-wrapper',
        //   {
        //     height: '120px',
        //     width: 'auto',
        //     skewX: 0,
        //     skewY: 0,
        //     rotate: 0,
        //     duration: 1.6,
        //     ease: 'power2.out',
        //     overwrite: true,
        //   }
        // );
        console.log('AAAAAAAA', '09999999');
      }, 800);
    }); 
    */

    this.cdr.detectChanges();
    // }, 1000)
  }

  triggerChange() {
    // console.log('This is a change');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.cdr.detectChanges();
  }
}
