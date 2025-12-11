import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Episode } from '../../service/episodes-service/episodes-service';
import { AdminService } from '../../service/admin-service';
import { Router } from '@angular/router';
import { ProfileCard } from "../../../shared/components/profile-card/profile-card";
import { PlayButton } from "../../../shared/buttons/play-button/play-button";

@Component({
  selector: 'app-admin-episode-card',
  imports: [ProfileCard, PlayButton],
  templateUrl: './admin-episode-card.html',
  styleUrl: './admin-episode-card.scss'
})
export class AdminEpisodeCard {
@Input() episode!: Episode;

  @Output() navigateToEpisode = new EventEmitter<{ id: string; episode: Episode }>();
  @Output() submitEpisode = new EventEmitter<any>();
  @Output() editEpisode = new EventEmitter<any>();
  @Output() deleteEpisode = new EventEmitter<any>();

  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private router: Router
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

    this.cdr.detectChanges();

    // console.log(this.article);
  }

  ngAfterViewInit(): void {}

  navigateToEpisodePage(event: MouseEvent) {
    event.stopPropagation();
    this.navigateToEpisode.emit({ id: this.episode._id, episode: this.episode });
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
