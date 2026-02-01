import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { Episode, EpisodesService } from '../service/episodes-service/episodes-service';

import { Router, RouterOutlet } from '@angular/router';

import CustomEase from 'gsap/CustomEase';
import { Button } from '../../shared/buttons/button/button';
import { AdminEpisodeCard } from './admin-episode-card/admin-episode-card';
import { GlobalAudioPlayerService } from '../../global-audio-player.component/global-audio-player-service';

@Component({
  selector: 'app-episodes-view',
  imports: [RouterOutlet, Button, AdminEpisodeCard],
  templateUrl: './episodes-view.html',
  styleUrl: './episodes-view.scss',
})
export class EpisodesView {
  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
  ) {}

  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  private smoother: ScrollSmoother | null = null;

  episode: Episode = {
    _id: '',
    title: '',
    about: [],
    author: '',
    date: '',
    number: 0,
    season: 0,
    imageUrl: '',
    audioUrl: '',
    sources: [],
    transcript: '',
    posted: false,
  };
  episodes: any = [];

  sorting = {
    sortDirection: 'desc',

    seasonSort: false,
    episodeSort: false,
    titleSort: false,
    postedSort: false,
    authorSort: false,
    dateSort: true,

    seasonSortingVisualFlag: 'sort-inactive',
    episodeSortingVisualFlag: 'sort-inactive',
    postedSortingVisualFlag: 'sort-inactive',
    titleSortingVisualFlag: 'sort-inactive',
    dateSortingVisualFlag: 'sort-active',
    authorSortingVisualFlag: 'sort-inactive',

    sortUIupdate(key: string) {
      if (key == 'season') {
        this.seasonSortingVisualFlag = 'sort-active';
        this.episodeSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.postedSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'number') {
        this.seasonSortingVisualFlag = 'sort-inactive';
        this.episodeSortingVisualFlag = 'sort-active';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.postedSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'title') {
        this.seasonSortingVisualFlag = 'sort-inactive';
        this.episodeSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-active';
        this.postedSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'posted') {
        this.seasonSortingVisualFlag = 'sort-inactive';
        this.episodeSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.postedSortingVisualFlag = 'sort-active';
        this.authorSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'author') {
        this.seasonSortingVisualFlag = 'sort-inactive';
        this.episodeSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.postedSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-active';
        this.dateSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'date') {
        this.seasonSortingVisualFlag = 'sort-inactive';
        this.episodeSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.postedSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-active';
      }
    },

    sortedListView: [{}],
  };

  sort(key: string) {
    this.sorting.sortUIupdate(key);
    this.sorting.seasonSort = key === 'season';
    this.sorting.episodeSort = key === 'number';
    this.sorting.postedSort = key === 'posted';
    this.sorting.titleSort = key === 'title';
    this.sorting.dateSort = key === 'date';
    this.sorting.authorSort = key === 'author';

    if (this.sorting.sortDirection === 'asc') {
      this.sorting.sortDirection = 'desc';
    } else {
      this.sorting.sortDirection = 'asc';
    }

    const direction = this.sorting.sortDirection === 'asc' ? 1 : -1;

    this.sorting.sortedListView.sort((a: any, b: any) => {
      let valA = a[key];
      let valB = b[key];
      if (key === 'date') {
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();

        return (dateA - dateB) * direction;
      } else if (key === 'number' || key === 'season') {
        const numA = Number(valA);
        const numB = Number(valB);
        return (numA - numB) * direction;
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();

        if (valA < valB) return -1 * direction;
        if (valA > valB) return 1 * direction;
        return 0; // values must be equal
      }
    });

    this.episodes = this.sorting.sortedListView;

    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.adminService.getAllEpisodes().subscribe((data) => {
      this.episodes = data;
      this.sorting.sortedListView = [...this.episodes];
      this.sort('date');
      this.cdr.detectChanges();
    });
  }

  navigateToNewEpisodeView() {
    this.adminService.triggerViewChange('new-episode', 'episodes-view');
  }

  navigateToEpisodePage(episodeId: string, episodeData: any, editMode?: string) {
    this.adminService.triggerViewChange(
      'episode-page',
      'episodes-view',
      episodeId,
      episodeData,
      editMode,
    );
  }

  postEpisode(episode: Episode) {
    if (episode.posted === true) {
      episode.posted = false;

      if (!episode._id) {
        console.error('Cannot update episode status: Episode ID is missing.');
        return;
      }
      this.adminService.patchEpisodePostedStatus(episode._id, episode.posted).subscribe({
        next: (response) => {},
        error: (error) => {
          console.log(error);
        },
      });
      // }
    } else {
      episode.posted = true;
      // if (this.episode._id) {
      if (!episode._id) {
        console.error('Cannot update episode status: Episode ID is missing.');
        return; // Exit the function if no ID is available
      }
      this.adminService.patchEpisodePostedStatus(episode._id, episode.posted).subscribe({
        next: (response) => {
          // console.log('Posted status updated successfully:', response);
        },
        error: (error) => {
          // console.error('Error updating posted status:', error);
        },
      });
      // }
    }
    // console.log('from view', episode);
  }

  editEpisode(id: string, ep: Episode, editMode: string) {
    this.navigateToEpisodePage(id, ep, editMode);
  }

  deleteEpisode(_id: string) {
    this.adminService.deleteEpisode(_id).subscribe(
      (response) => {
        // console.log('Article deleted successfully', response);
        // Re-fetch the articles after deletion
        const activeSortKey = this.getCurrentSortKey();
        this.adminService.getAllEpisodes().subscribe((data) => {
          this.episodes = data;
          this.sorting.sortedListView = [...this.episodes];
          this.sorting.sortDirection = this.sorting.sortDirection === 'asc' ? 'desc' : 'asc';

          this.sort(activeSortKey);

          this.cdr.detectChanges(); // Update the view
        });
      },
      (error) => {
        console.error('Error deleting article', error);
      },
    );
  }

  getCurrentSortKey(): string {
    if (this.sorting.seasonSort) return 'season';
    if (this.sorting.episodeSort) return 'number';
    if (this.sorting.postedSort) return 'posted';
    if (this.sorting.titleSort) return 'title';
    if (this.sorting.authorSort) return 'author';
    // Default to 'date' if none other is active (based on your initial state)
    return 'date';
  }
}
