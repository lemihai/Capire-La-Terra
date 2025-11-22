import {
  Component,
  ViewChild,
  ElementRef,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-volume-button',
  imports: [],
  templateUrl: './volume-button.html',
  styleUrl: './volume-button.scss',
})
export class VolumeButton {
  @ViewChild('trackDiv') trackDiv!: ElementRef<HTMLInputElement>;
  @ViewChild('trackDial') trackDial!: ElementRef<HTMLDivElement>;
  
  @Output() volumeSet = new EventEmitter<string>();
  mouseOver = false;
  volume = '100';
  volReminder = this.volume;


  onVolumeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.volume = value;
 
    this.trackDiv.nativeElement.style.background = `
      linear-gradient(to right,
        var(--main-color) 0%,
        var(--main-color) ${value}%,
        var(--main-color-16) ${value}%,
        var(--main-color-16) 100%
      )`;

    this.changeVolume();
    
  }

  volumePressed() {
    let volNum = Number(this.volume);
    if (volNum > 0) {
      this.volReminder = this.volume;
      let toSet = '0';
      this.volume = toSet;
      this.trackDiv.nativeElement.style.background = `
        linear-gradient(to right,
          var(--main-color) 0%,
          var(--main-color) ${toSet}%,
          var(--main-color-16) ${toSet}%,
          var(--main-color-16) 100%
        )`;
      this.trackDiv.nativeElement.value = toSet;
      volNum = 0;
    } else if (volNum == 0) {
      let toSet = this.volReminder;
      this.volume = toSet;
      this.trackDiv.nativeElement.style.background = `
        linear-gradient(to right,
          var(--main-color) 0%,
          var(--main-color) ${toSet}%,
          var(--main-color-16) ${toSet}%,
          var(--main-color-16) 100%
        )`;
      this.trackDiv.nativeElement.value = toSet;
      volNum = Number(this.volReminder);
    }
    this.changeVolume();
  }

  changeVolume() {
    this.volumeSet.emit(this.volume);
    // Change Volume State
  }
}
