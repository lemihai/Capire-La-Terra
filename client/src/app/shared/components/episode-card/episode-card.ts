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
  inject,
} from '@angular/core';
import { AudioTrack } from '../audio-track/audio-track';
import { ProfileCard } from '../profile-card/profile-card';
import { PlayButton } from '../../buttons/play-button/play-button';
import { Episode } from '../../../../services/episodes-service/episodes-service';
import { GlobalAudioPlayerService } from '../../../global-audio-player.component/global-audio-player-service';

@Component({
  selector: 'app-episode-card',
  imports: [AudioTrack, ProfileCard, PlayButton],
  templateUrl: './episode-card.html',
  styleUrl: './episode-card.scss',
})
export class EpisodeCard implements OnChanges, OnInit, AfterViewInit {
  @Input() episode!: Episode;
  @Input() cardType = '';
  @ViewChild('playerWidth') playerWidth!: ElementRef<HTMLDivElement>;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioTrackWrapper') audioTrackWrapper!: ElementRef<HTMLDivElement>;
  // episode card can be 'small', 'medium', 'large'

  duration = {
    initial: 0,
    minutes: '00',
    seconds: '00',
  };

  private globalPlayer = inject(GlobalAudioPlayerService);

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
        width = 240;
      } else if (cardType === 'large') {
        width = 512;
      }
    } else if (wpWidth > 1300 && wpWidth <= 1500) {
      if (cardType === 'medium') {
        width = 164;
      } else if (cardType === 'large') {
        width = 440;
      }
    } else if (wpWidth > 800 && wpWidth <= 1300) {
      if (cardType === 'medium') {
        width = 132;
      } else if (cardType === 'large') {
        width = 400;
      }
    }

    return width;
  }

  private smoother: ScrollSmoother | null = null;
  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef,
  ) {}

  ngOnInit() {
    // if (this.audioTrackWrapper) {
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['episode']) {
      this.episode = changes['episode'].currentValue;
    }
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    const audioElement = this.audioPlayer.nativeElement;

    audioElement.addEventListener('loadedmetadata', () => {
      this.duration.initial = audioElement.duration;
      this.formatDuration(audioElement.duration, this.duration);
      this.cdr.detectChanges();
    });

    this.cdr.detectChanges();
  }

  triggerChange() {
    console.log('This is a change');
  }

  playEpisode() {
    this.globalPlayer.playEpisode(this.episode);
  }

  formatDuration(
    time: number,
    finaltime: {
      minutes: string;
      seconds: string;
    },
  ) {
    let min = 0;
    let sec = 0;
    let test = 0;

    let fmin = '0';
    let fsec = '0';
    if (time < 60) {
      sec = Math.trunc(time);
    } else {
      // test = time/60;
      while (time >= 60) {
        min += 1;
        time -= 60;
        if (time <= 60) {
          sec = Math.trunc(time);
        }
      }
    }
    fmin = min.toString();
    fsec = sec.toString();
    if (sec < 10) {
      fsec = '0' + fsec;
      // sec = '0' + sec;
    }
    if (min < 10) {
      fmin = '0' + fmin;
      // sec = '0' + sec;
    }

    finaltime.minutes = fmin;
    finaltime.seconds = fsec;
  }
}
