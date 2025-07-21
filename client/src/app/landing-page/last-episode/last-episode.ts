import { Component } from '@angular/core';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import {AudioPlayerComponentA } from "../audio-player.component/audio-player.component";

@Component({
  selector: 'app-last-episode',
  imports: [AudioPlayerComponent, AudioPlayerComponentA],
  templateUrl: './last-episode.html',
  styleUrl: './last-episode.scss'
})
export class LastEpisode {

}
