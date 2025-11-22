import { Component, inject, OnInit } from '@angular/core';
import { Episode, EpisodeComponent } from './episode-component/episode-component';
import { EpisodesService } from './episode.service';

@Component({
  selector: 'app-episodes-view',
  imports: [EpisodeComponent],
  templateUrl: './episodes-view.html',
  styleUrl: './episodes-view.scss'
})
export class EpisodesView implements OnInit{
  private episodesService = inject(EpisodesService);

  episodes: Episode[] = [];

  ngOnInit(){
    this.episodesService.getEpisodes().subscribe({
      next: (response) => {
        this.episodes = response;
        console.log(this.episodes);
      }, 
      error: (error) => {
        console.log('there was an error!' + error);
      }
    })
  }
}