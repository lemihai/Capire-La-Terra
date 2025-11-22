import { Component, Input } from '@angular/core';
import { AudioPlayerComponent } from '../../../landing-page/audio-player/audio-player.component';

export interface Episode {
  _id: string;
  title: string;
  about: string;
  number: number;
  season: number;
  sources: string[];
  transcript: string;
}

@Component({
  selector: 'app-episode-component',
  imports: [AudioPlayerComponent],
  templateUrl: './episode-component.html',
  styleUrl: './episode-component.scss',
})
export class EpisodeComponent {
  @Input() episode!: Episode;
}
