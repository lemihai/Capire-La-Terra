import { Component } from '@angular/core';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@Component({
  selector: 'app-last-episode',
  imports: [AudioPlayerComponent],
  templateUrl: './last-episode.html',
  styleUrl: './last-episode.scss'
})
export class LastEpisode {

}
