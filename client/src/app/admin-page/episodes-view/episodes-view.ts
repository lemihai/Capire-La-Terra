import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { Episode, EpisodesService } from '../service/episodes-service/episodes-service';
import { NewsService } from '../service/news-service/news-service';
import { Router, RouterOutlet } from '@angular/router';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { EpisodeCard } from "../../shared/components/episode-card/episode-card";

@Component({
  selector: 'app-episodes-view',
  imports: [RouterOutlet, EpisodeCard],
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
    about: '',
    date: '',
    number: 0,
    season: 0,
    sources: [],
    transcript: '',
    episode: '',
  };

  episodes: any = [];

  ngOnInit(): void {
    this.adminService.getAllEpisodes().subscribe((data) => {
      this.episodes = data;
      console.log('Episodes result ', this.episodes);
      this.cdr.detectChanges(); // Manually trigger change detection if needed
    });
  }
}
