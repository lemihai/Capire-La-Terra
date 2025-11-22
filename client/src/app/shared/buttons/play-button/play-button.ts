import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
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
      // Optionally, emit the change back to the parent
      // this.triggeredThroughTrackChange.emit(false);
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
