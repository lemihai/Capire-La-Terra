import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-play-button',
  imports: [],
  templateUrl: './play-button.html',
  styleUrl: './play-button.scss',
})
export class PlayButton implements OnChanges {
  @Input() triggeredThroughTrack: boolean = false;
  @Output() triggeredThroughTrackChange = new EventEmitter<boolean>();

  isPlaying = 'false';
  expandButton = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.triggeredThroughTrack == true) {
      this.isPlaying = 'true';
    }
  }

  play() {
    if (this.isPlaying == 'true') {
      this.isPlaying = 'false';
    } else if (this.isPlaying == 'false') {
      this.isPlaying = 'true';
    }
  }
}
