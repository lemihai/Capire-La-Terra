import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { Episode, EpisodesService } from '../service/episodes-service/episodes-service';
import { NewsService } from '../service/news-service/news-service';
import { Router, RouterOutlet } from '@angular/router';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { EpisodeCard } from '../../shared/components/episode-card/episode-card';
import { Button } from '../../shared/buttons/button/button';
import { AdminEpisodeCard } from './admin-episode-card/admin-episode-card';

@Component({
  selector: 'app-episodes-view',
  imports: [RouterOutlet, EpisodeCard, Button, AdminEpisodeCard],
  templateUrl: './episodes-view.html',
  styleUrl: './episodes-view.scss',
})
export class EpisodesView {
  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private newsService: EpisodesService,
    private ngZone: NgZone,
    private router: Router
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
    // 1. Determine the current direction and update the specific key flag

    this.sorting.sortUIupdate(key);
    // Reset all key sort flags except the current one
    this.sorting.seasonSort = key === 'season';
    this.sorting.episodeSort = key === 'number';
    this.sorting.postedSort = key === 'posted';
    this.sorting.titleSort = key === 'title';
    this.sorting.dateSort = key === 'date';
    this.sorting.authorSort = key === 'author';

    // If the *same* key is clicked, flip the direction. Otherwise, default to 'asc'.
    // NOTE: Your date logic is inverted (see notes below), so for date, we default to 'desc' (newest first)
    if (this.sorting.dateSort && this.sorting.sortDirection === 'desc') {
      this.sorting.sortDirection = 'asc'; // Oldest first
    } else if (this.sorting.dateSort) {
      this.sorting.sortDirection = 'desc'; // Newest first (default)
    } else if (this.sorting.sortDirection === 'asc') {
      this.sorting.sortDirection = 'desc';
    } else {
      this.sorting.sortDirection = 'asc';
    }

    const direction = this.sorting.sortDirection === 'asc' ? 1 : -1;

    // 2. Perform the sort
    this.sorting.sortedListView.sort((a: any, b: any) => {
      // Use 'any' for the list items here
      let valA = a[key];
      let valB = b[key];
      console.log('****** ', valA, valB);
      if (key === 'date') {
        // Date comparison:
        // For 'desc' (newest first), the result of (dateA - dateB) should be negative
        // if A is newer than B (and thus A should come first).
        // (dateA - dateB) is negative if A is earlier (older) than B.
        // So, for 'desc' (newest first), we use (dateB - dateA)
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();

        // NOTE: The direction is handled by the sorting function itself,
        // so if 'asc' (oldest first) is 1, we use (dateA - dateB) * 1
        // if 'desc' (newest first) is -1, we use (dateA - dateB) * -1 = (dateB - dateA)
        return (dateA - dateB) * direction;
      } else {
        // String comparison (case-insensitive for alphabetical sort)
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();

        if (valA < valB) return -1 * direction;
        if (valA > valB) return 1 * direction;
        return 0; // values must be equal
      }
    });

    console.log(this.sorting.sortedListView[32]);

    this.episodes = this.sorting.sortedListView;

    console.log(`Sorted by ${key} in ${this.sorting.sortDirection} order.`);
    this.cdr.detectChanges(); // Update the view after sorting
  }

  ngOnInit(): void {
    this.adminService.getAllEpisodes().subscribe((data) => {
      this.episodes = data;
      this.sorting.sortedListView = [...this.episodes];
      console.log('Episodes result ', this.episodes);
      this.cdr.detectChanges(); // Manually trigger change detection if needed
    });
  }

  navigateToNewEpisodeView() {
    this.adminService.triggerViewChange('new-episode', 'episodes-view');
  }

  navigateToEpisodePage(episodeId: string, episodeData: any, editMode?: boolean) {
    this.adminService.triggerViewChange(
      'episode-page',
      'episodes-view',
      episodeId,
      episodeData,
      editMode
    );
  }

  postEpisode(episode: Episode) {
    console.log(episode._id);
    if (episode.posted === true) {
      episode.posted = false;
      // console.log(article);
      // this.adminService.patchEpisodePostedStatus(episode._id, episode.posted).subscribe({
      //   next: (response) => {
      //     // console.log('Posted status updated successfully:', response);
      //   },
      //   error: (error) => {
      //     // console.error('Error :', error);
      //   },
      // });
    } else {
      episode.posted = true;
      // this.adminService.patchEpisodePostedStatus(episode._id, episode.posted).subscribe({
      //   next: (response) => {
      //     // console.log('Posted status updated successfully:', response);
      //   },
      //   error: (error) => {
      //     // console.error('Error updating posted status:', error);
      //   },
      // });
    }
    console.log('from view', episode);
  }

  editEpisode(id: string, ep: Episode, editMode: boolean) {
    // this.navigateToEpisodePage(id, ep, editMode)
  }

  deleteEpisode(_id: string) {
    // this.adminService.deleteEpisode(_id).subscribe(
    //   (response) => {
    //     console.log('Article deleted successfully', response);
    //     // Re-fetch the articles after deletion
    //     this.adminService.getAllEpisodes().subscribe((data) => {
    //       this.episode = data;
    //       this.sorting.sortedListView = [...this.episode];
    //       this.cdr.detectChanges(); // Update the view
    //     });
    //   },
    //   (error) => {
    //     console.error('Error deleting article', error);
    //   }
    // );
  }
}

// db.episodes.insertOne({ title: "The Future of AI in 2025", about: "Exploring the latest advancements in artificial intelligence and their impact on society in 2025.", author: "Sofia Lutteri", date: "09 Dec 2025", number: 1, season: 3, imageUrl: '', audioUrl: '', sources: ["the guardian", "iea", "euronews"], transcript: "Welcome to today's episode, where we dive into the future of AI in 2025. The landscape of artificial intelligence has evolved dramatically over the past few years...", posted: true });
