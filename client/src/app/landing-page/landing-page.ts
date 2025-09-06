import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { Background } from './background/background';
import { IntroText } from './intro-text/intro-text';
// import { AudioPlayerComponent } from "./audio-player/audio-player.component";
import { LastEpisode } from './last-episode/last-episode';
import { Seasons } from './seasons/seasons';
import { Information } from './information/information';

@Component({
  selector: 'app-landing-page',
  imports: [IntroText, LastEpisode, Seasons, Information],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {}
