import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  Input,
  inject,
} from '@angular/core';
// import { AudioPlayer } from "../shared/components/audio-player/audio-player";
import { PlayButton } from '../shared/buttons/play-button/play-button';
import { AudioTrack } from '../shared/components/audio-track/audio-track';
import { NgOptimizedImage } from '@angular/common';
import { ProfileCard } from '../shared/components/profile-card/profile-card';

//CONTROLS BUTTONS
import { OneBackwardButton } from '../shared/buttons/one-backward-button/one-backward-button';
import { OneForwardButton } from '../shared/buttons/one-forward-button/one-forward-button';
import { VolumeButton } from '../shared/buttons/volume-button/volume-button';
import { TensecBackward } from '../shared/buttons/tensec-backward/tensec-backward';
import { TensecForward } from '../shared/buttons/tensec-forward/tensec-forward';
import { Episode } from '../admin-page/service/episodes-service/episodes-service';
import { GlobalAudioPlayerService } from './global-audio-player-service';
import { Subscription } from 'rxjs';
import { EpisodesService } from '../../services/episodes-service/episodes-service';

@Component({
  selector: 'app-global-audio-player',
  imports: [
    PlayButton,
    AudioTrack,
    NgOptimizedImage,
    ProfileCard,
    OneBackwardButton,
    OneForwardButton,
    VolumeButton,
    TensecBackward,
    TensecForward,
  ],
  templateUrl: './global-audio-player.component.html',
  styleUrl: './global-audio-player.component.scss',
})
export class GlobalAudioPlayerComponent implements AfterViewInit, OnInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioTrack') audioTrack!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioTimeContainer') audioTimeContainer!: ElementRef<HTMLAudioElement>;
  @Input() episode: Episode = {
    _id: '',
    title: '',
    about: [],
    author: '',
    date: '',
    number: 0,
    season: 0,
    imageUrl: 'assets/article-illustration-1.jpg',
    audioUrl: 'audio/freepik-sermon-in-folds.mp3',
    sources: [],
    transcript: '',
    posted: false,
  };
  externalFlag = false;

  private episodeSubscription!: Subscription;

  trackTriggeredPlay = false;
  constructor(
    private cdRef: ChangeDetectorRef,
    // private globalPlayerService: GlobalAudioPlayerService
  ) {}

  private globalPlayerService = inject(GlobalAudioPlayerService);
  private episodeService = inject(EpisodesService);

  // Variables of the audio player
  playstate = 0;
  currentTime = {
    minutes: '00',
    seconds: '00',
  };

  duration = {
    initial: 0,
    minutes: '00',
    seconds: '00',
  };

  // AudioTrackWidths
  audioTrackWidth = 365;

  ngAfterViewInit() {
    const audioElement = this.audioPlayer.nativeElement;

    audioElement.addEventListener('loadedmetadata', () => {
      this.duration.initial = audioElement.duration;
      this.formatDuration(audioElement.duration, this.duration);
    });

    audioElement.addEventListener('timeupdate', () => {
      this.formatDuration(audioElement.currentTime, this.currentTime);
      this.cdRef.detectChanges();
    });
  }

  translateX = '0rem';
  translateY = '0rem';
  scale = '.8';
  opacity = '0';

  ngOnInit() {
    this.episodeService.getLastEpisode().subscribe(
      (data) => {
        this.episode = data;
      },
      (error) => {
        console.log(error);
      },
    );
    // console.log(this.playstate);

    this.episodeSubscription = this.globalPlayerService.episode$.subscribe(
      (newEpisode: Episode) => {
        // 2. Update the component's episode data
        this.episode = newEpisode;

        this.externalFlag == true;
        // 3. Set the audio player's source and load the new episode
        this.audioPlayer.nativeElement.src = this.episode.audioUrl;
        this.audioPlayer.nativeElement.load(); // Reload the audio element
        setTimeout(() => {
          // 4. Start playback automatically (optional, but typical for a 'playEpisode' action)
          this.audioPlayer.nativeElement.play();
          this.playstate = 1;

          this.extended = 'player-wrapper-extended';
          // if (this.playstate === 1) {
          // } else {
          //   this.playstate = 0;
          // }

          this.playstate = 1;
          this.trackTriggeredPlay = true;

          // console.log(this.playstate);
          // 1. If it's playing and the play state comes from outside, stay open
          // 2. If it's not playing and the play state comes from uotside, then open
          // 3. Only close if it's closed by hand
          // 4. If I play it from the button then it doesn't matter if it's open or not.

          // Force change detection to update the template bindings
          this.cdRef.detectChanges();
        }, 10);
      },
    );

    // console.log(this.episode);

    setTimeout(() => {
      this.delayedFunction();
    }, 2000);
  }

  delayedFunction() {
    this.translateX = '0rem';
    this.translateY = '-1.6rem';
    this.scale = '1';
    this.opacity = '1';
    this.cdRef.detectChanges();

    // console.log('feawrfer');
  }

  // Handle the emitter from the track
  // public trackHoverPosition: number = 0;

  handleTrackClicked(event: any) {
    this.formatDuration(event, this.currentTime);
    this.audioPlayer.nativeElement.currentTime =
      parseInt(this.currentTime.minutes) * 60 + parseInt(this.currentTime.seconds);
    this.audioPlayer.nativeElement.play();
    this.playstate = 1;
    this.trackTriggeredPlay = true;
    // console.log(
    //   'Received event from app-audio-track:',
    //   event,
    //   this.currentTime.minutes,
    //   this.currentTime.seconds,
    //   this.audioPlayer.nativeElement.currentTime,
    //   this.audioPlayer.nativeElement.volume
    // );
  }

  calculateAudioTrackSize(totalwidth: number, tosubstrack: number) {
    return totalwidth - tosubstrack * 2;
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

  play() {
    console.log(this.playstate);
    // this.globalPlayerService.playEpisode();
    // console.log(this.episode);
    if (this.playstate === 0) {
      this.audioPlayer.nativeElement.play();
      this.playstate = 1;
    } else {
      this.audioPlayer.nativeElement.pause();
      this.playstate = 0;
      this.trackTriggeredPlay = false;
    }
  }

  extended = '';
  extend() {
    // this,sets the volume

    if (this.extended == 'player-wrapper-extended') {
      this.extended = '';
    } else if (this.extended == '') {
      this.extended = 'player-wrapper-extended';
    }
  }

  setVolume(event: any) {
    let volNumber = Number(event) / 100;
    this.audioPlayer.nativeElement.volume = volNumber;
  }

  backTenSec() {
    let min = Number(this.currentTime.minutes);
    let sec = Number(this.currentTime.seconds);
    let b = '0';

    let stringMin = '0';
    let stringSec = '0';

    sec -= 10;
    if (sec < 0) {
      min--;
      sec += 59;
    }

    if (sec < 10) {
      let a = String(sec);
      b += a;
    }

    stringMin += min;

    this.currentTime.minutes = stringMin;
    this.currentTime.seconds = stringSec;
    this.audioPlayer.nativeElement.currentTime = min * 60 + sec;
    this.audioPlayer.nativeElement.play();
    this.trackTriggeredPlay = true;
    this.playstate = 1;
  }

  forwardTenSec() {
    let min = Number(this.currentTime.minutes);
    let sec = Number(this.currentTime.seconds);
    let b = '0';

    let stringMin = '0';
    let stringSec = '0';

    sec += 10;
    if (sec > 60) {
      min++;
      sec -= 60;
    }

    if (sec < 10) {
      let a = String(sec);
      b += a;
    }

    stringMin += min;

    this.currentTime.minutes = stringMin;
    this.currentTime.seconds = stringSec;
    this.audioPlayer.nativeElement.currentTime = min * 60 + sec;
    this.audioPlayer.nativeElement.play();
    this.trackTriggeredPlay = true;
    this.playstate = 1;
  }
}
