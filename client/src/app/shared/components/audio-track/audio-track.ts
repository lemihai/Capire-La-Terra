import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-audio-track',
  imports: [],
  templateUrl: './audio-track.html',
  styleUrl: './audio-track.scss',
})
export class AudioTrack implements OnInit, OnChanges, AfterViewInit {
  @Input() audioTrackWidth: number = 0;
  @Input() audioTime: number = 100;
  @Input() currentTimeMin: string = '0';
  @Input() currentTimeSec: string = '0';
  @Output() audioTrackClicked = new EventEmitter<number>();
  @ViewChild('trackDiv') trackDiv!: ElementRef<HTMLDivElement>;
  hovererLeft: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  numberOfLines: number = Math.floor(this.audioTrackWidth / 8);
  numberOfLinesArray: { n: number; type: string }[] = [];
  //is hovered not fully needed, delete later
  isHovered = false;
  titalTimeB = 0;

  timeHovered = {
    toCalculate: 0,
    minutes: '0',
    seconds: '0',
  };

  // **************************
  // ***** Calculating how long should the audio track be
  // **************************
  ngOnInit() {
    this.numberOfLines = Math.floor(this.audioTrackWidth / 4.4);

    for (let i = 0; i <= this.numberOfLines; i++) {
      let a = Math.floor(Math.random() * 4) + 1;
      let n = i;
      if (a === 1) {
        let type = 'a';
        this.numberOfLinesArray[i] = { n, type };
      }
      if (a === 2) {
        let type = 'b';
        this.numberOfLinesArray[i] = { n, type };
      }
      if (a === 3) {
        let type = 'c';
        this.numberOfLinesArray[i] = { n, type };
      }
      if (a === 4) {
        let type = 'd';
        this.numberOfLinesArray[i] = { n, type };
      }
    }
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {}

  // **************************
  // ***** Code for moving the timer container
  // **************************

  onMouseMove(event: MouseEvent) {
    if (this.trackDiv) {
      const trackRect = this.trackDiv.nativeElement.getBoundingClientRect();
      this.hovererLeft = event.clientX - trackRect.left - 17;
    }
  }

  // **************************
  // ***** just an event to check when the mouse loeaves the hover
  // **************************

  onMouseLeaveTrack() {}

  // **************************
  // ***** Code for mouse leaving the line and returning it to the normal color
  // **************************

  onMouseLeaveLine() {
    let children = this.trackDiv.nativeElement as HTMLElement;
    const firstChild = this.trackDiv.nativeElement.children[0] as HTMLElement;
    this.isHovered = false;
    let ratio = this.audioTime / this.numberOfLines;

    let currentTime = this.titalTimeB;
    const index = Math.floor(currentTime / ratio);

    if (index <= 1) {
      for (let i = 0; i <= this.numberOfLines; i++) {
        let pp = children.children[i].firstChild as HTMLElement;
        pp.style.backgroundColor = '#323d0664';
      }
    } else {
      for (let i = 0; i <= index; i++) {
        let pp = children.children[i].firstChild as HTMLElement;
        pp.style.backgroundColor = '#9cc40a';
      }
      for (let i = index; i <= this.numberOfLines; i++) {
        let pp = children.children[i].firstChild as HTMLElement;
        pp.style.backgroundColor = '#323d0664';
      }
    }
  }

  // **************************
  // ***** Coloring the lines to the left of the current hovered line in the track
  // **************************
  // TODO: Switch this online hover to be triggered on the parent of the line not on the line

  onLineHover(index: number) {
    let ratio = this.audioTime / this.numberOfLines;
    this.timeHovered.toCalculate = Math.trunc(index * ratio);
    this.formatDuration(this.timeHovered.toCalculate, this.timeHovered);
    this.isHovered = true;

    let children = this.trackDiv.nativeElement as HTMLElement;
    const firstChild = this.trackDiv.nativeElement.children[0] as HTMLElement;
    const test = firstChild.parentElement;

    for (let i = 0; i <= index; i++) {
      let pp = children.children[i].firstChild as HTMLElement;
      pp.style.backgroundColor = '#9cc40a';
    }

    for (let i = index; i <= this.numberOfLines; i++) {
      let pp = children.children[i].firstChild as HTMLElement;
      pp.style.backgroundColor = '#323d0664';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['audioTrackWidth']) {
    }
    if (changes['audioTime']) {
      this.audioTime = changes['audioTime'].currentValue;
      this.timeHovered.toCalculate = this.audioTime;
    }
    let totaltime = this.formatDurationInverse(this.currentTimeMin, this.currentTimeSec);
    this.titalTimeB = totaltime;
    const widthChange = changes['audioTrackWidth'];

    if (!this.trackDiv) {
      return;
    }

    let children = this.trackDiv.nativeElement as HTMLElement;
    const firstChild = this.trackDiv.nativeElement.children[0] as HTMLElement;
    const test = firstChild.parentElement;

    let ratio = this.audioTime / this.numberOfLines;
    const index = Math.floor(totaltime / ratio);

    // Divide by 3.15 for no of lines)
    if (this.isHovered == false) {
      for (let i = 0; i <= index; i++) {
        let pp = children.children[i].firstChild as HTMLElement;
        pp.style.backgroundColor = '#9cc40a';
      }
      for (let i = index; i <= this.numberOfLines; i++) {
        let pp = children.children[i].firstChild as HTMLElement;
        pp.style.backgroundColor = '#323d0664';
      }
    }
  }

  playFromHere() {
    console.log(1, this.timeHovered.toCalculate);
    this.audioTrackClicked.emit(this.timeHovered.toCalculate);
  }

  // **************************
  // ***** Calculating min and seconds from the totaltime
  // **************************
  formatDuration(
    time: number,
    finaltime: {
      minutes: string;
      seconds: string;
    },
  ) {
    let min = 0;
    let sec = 0;
    let test = 0;

    let fmin = '0';
    let fsec = '0';
    if (time < 60) {
      sec = Math.trunc(time);
    } else {
      // test = time/60;
      while (time >= 60) {
        min += 1;
        time -= 60;
        if (time <= 60) {
          sec = Math.trunc(time);
        }
      }
    }
    fmin = min.toString();
    fsec = sec.toString();
    if (sec < 10) {
      fsec = '0' + fsec;
      // sec = '0' + sec;
    }
    if (min < 10) {
      fmin = '0' + fmin;
      // sec = '0' + sec;
    }

    finaltime.minutes = fmin;
    finaltime.seconds = fsec;
  }

  // **************************
  // ***** Calculation total time from minutes and seconds
  // **************************
  formatDurationInverse(min: string, sec: string) {
    let finalTimer = 0;
    let minNumber = Number(min);
    let secNumber = Number(sec);

    finalTimer = minNumber * 60 + secNumber;

    return finalTimer;
  }
}
