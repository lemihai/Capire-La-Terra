import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Episode } from '../../service/episodes-service/episodes-service';
import { AdminService } from '../../service/admin-service';
import { Router } from '@angular/router';
import { ProfileCard } from '../../../shared/components/profile-card/profile-card';
import { GlobalAudioPlayerService } from '../../../global-audio-player.component/global-audio-player-service';

@Component({
  selector: 'app-admin-episode-card',
  imports: [ProfileCard],
  templateUrl: './admin-episode-card.html',
  styleUrl: './admin-episode-card.scss',
})
export class AdminEpisodeCard {
  @Input() episode!: Episode;
  @Input() viewMode!: string;

  @Output() navigateToEpisode = new EventEmitter<{ id: string; episode: Episode }>();
  @Output() submitEpisode = new EventEmitter<any>();
  @Output() editEpisode = new EventEmitter<any>();
  @Output() deleteEpisode = new EventEmitter<any>();

  seasonStarter = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private router: Router,
    private globalPlayer: GlobalAudioPlayerService
  ) {}

  date = '';

  ngOnInit(): void {
    // console.log(this.episode.author);
    let date = new Date(this.episode.date);
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    this.date = day + '-' + month + '-' + year;
    // console.log('OFIRNEBJUVI', this.date);
    if(this.episode.number == 1){
      this.seasonStarter = 'seasonStarter'
    }
    this.cdr.detectChanges();

    // console.log(this.episode);

    // console.log(this.article);
  }

  ngAfterViewInit(): void {}

  playEpisode() {
    this.globalPlayer.playEpisode(this.episode);
  }

  navigateToEpisodePage(event: MouseEvent) {
    event.stopPropagation();
    if (this.episode._id) {
      this.navigateToEpisode.emit({ id: this.episode._id, episode: this.episode });
    }
  }

  postClickedEpisode(event: MouseEvent) {
    this.submitEpisode.emit();
  }

  editClickedEpisode(event: MouseEvent) {
    this.editEpisode.emit();
  }

  deleteClickedEpisode(event: MouseEvent) {
    this.deleteEpisode.emit();
  }
}
