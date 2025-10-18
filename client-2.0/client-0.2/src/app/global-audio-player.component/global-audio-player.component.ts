import { Component } from '@angular/core';
// import { AudioPlayer } from "../shared/components/audio-player/audio-player";
import { PlayButton } from '../shared/buttons/play-button/play-button';

@Component({
  selector: 'app-global-audio-player',
  imports: [PlayButton],
  templateUrl: './global-audio-player.component.html',
  styleUrl: './global-audio-player.component.scss',
})
export class GlobalAudioPlayerComponent {
  extended = '';
  extend() {
    if (this.extended == 'player-wrapper-extended') {
      this.extended = '';
    } else if (this.extended == '') {
      this.extended = 'player-wrapper-extended';
    }
  }
}
