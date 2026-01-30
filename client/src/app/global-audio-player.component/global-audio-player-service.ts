import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs'; // Use Subject for broadcasting values
import { Episode } from '../admin-page/service/episodes-service/episodes-service';
import { EpisodesService } from '../../services/episodes-service/episodes-service';

@Injectable({
  providedIn: 'root',
})
export class GlobalAudioPlayerService {
  private episodeSource = new Subject<Episode>(); // Replace 'any' with your Episode type
  private episodeService = inject(EpisodesService);

  // 2. Public observable for components to subscribe to
  episode$ = this.episodeSource.asObservable();

  constructor() {}

  // 3. Method called by the Episode Card/View when playback is requested
  playEpisode(episode: Episode) {
    // Replace 'any' with your Episode type
    console.log(episode);
    this.episodeSource.next(episode);
    
    // setTimeout(() => {
    //   this.episodeSource.next(episode);
    //   console.log(episode);
    // }, 10);
  }
}
