import {
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EpisodeCard } from '../../shared/components/episode-card/episode-card';
import { EpisodesService } from '../../../services/episodes-service/episodes-service';

@Component({
  selector: 'app-episodes-list-component',
  imports: [EpisodeCard],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent implements OnInit, OnChanges {
  isPlaying = 'true';
  topPartDisabled = '';
  expandButton = '';
  private episodesService = inject(EpisodesService);
  private cdr = inject(ChangeDetectorRef);
  numberOfSeasons = 1;
  viewportWidth = window.innerWidth;

  episodes: any = [];
  sortedListView: any = [];

  play() {
    if (this.isPlaying == 'true') {
      this.isPlaying = 'false';
    } else if (this.isPlaying == 'false') {
      this.isPlaying = 'true';
    }
  }

  ngOnInit(): void {
    this.episodesService.getAllEpisodes().subscribe(
      (data) => {
        this.episodes = data;
        // console.log(this.episodes);
        this.sort();
        this.cdr.detectChanges();
      },
      (error) => {
        this.cdr.detectChanges();
        // console.log(error);
      },
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  sort() {
    // 1. Determine the current direction and update the specific key flag
    // can be -1 or 1
    const asc = 1;
    const desc = -1;
    let numberOfSeasons = 1;
    let episodesArray: any[] = [];

    for (const episode of this.episodes) {
      if (episode.season > numberOfSeasons) {
        numberOfSeasons = episode.season;
        this.numberOfSeasons = numberOfSeasons;
      }
    }

    // Iterating through the episodes array to create an array of seasons.
    // WHY? to make it easier to arrange afterwards
    for (let season = 1; season <= numberOfSeasons; season++) {
      let seasonArray: any[] = [];
      for (const episode of this.episodes) {
        if (season === episode.season) {
          seasonArray.push(episode);
        }
      }
      episodesArray.push(seasonArray);

      // Then, sorting the array
      episodesArray[season - 1].sort((a: any, b: any) => {
        // Use 'any' for the list items here
        let valA = a['number'];
        let valB = b['number'];

        const numA = Number(valA);
        const numB = Number(valB);
        return (numA - numB) * desc;
      });
    }

    // Make a list of lists
    // for each season add an array inside of the array
    // Sort each season array individually,
    // spread the arrays

    // 2. Perform the sort
    this.episodes.sort((a: any, b: any) => {
      // Use 'any' for the list items here
      let valA = a['number'];
      let valB = b['number'];

      const numA = Number(valA);
      const numB = Number(valB);
      return (numA - numB) * asc;
    });

    // console.log(episodesArray);
    this.episodes = [];
    for (let i = episodesArray.length - 1; i >= 0; i--) {
      this.episodes.push(...episodesArray[i]);
    }

    // console.log(this.numberOfSeasons);
    this.cdr.detectChanges(); // Update the view after sorting
  }
}
