import { Component } from '@angular/core';
import { PlayButton } from "../../buttons/play-button/play-button";
import { AudioTrack } from "../audio-track/audio-track";

@Component({
  selector: 'app-audio-player',
  imports: [PlayButton, AudioTrack],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.scss'
})
export class AudioPlayer {

}
