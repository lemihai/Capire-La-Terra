import { Component } from '@angular/core';
import { EpisodeComponent } from './episode-component/episode-component';

@Component({
  selector: 'app-episodes-view',
  imports: [EpisodeComponent],
  templateUrl: './episodes-view.html',
  styleUrl: './episodes-view.scss'
})
export class EpisodesView {

}
