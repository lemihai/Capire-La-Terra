import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  imports: [NgOptimizedImage],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard implements OnInit, AfterViewInit, OnChanges {
  @Input({ required: true }) profile: string = '';
  @Input() cardMode?: string = '';
  imgsrc: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['profile']);
    if (changes['profile']) {
      console.log(1);
      console.log(this.profile);
      console.log(1);
      if (this.profile.includes('Sofia')) {
        this.imgsrc = 'assets/sofia-lutteri.png';
      }
      if (this.profile.includes('Briana')) {
        this.imgsrc = 'assets/briana-cirstea.png';
      }
    if (this.profile.includes('Mihai')) {
        this.imgsrc = 'assets/mihai-butnariu.png';
      }
    }
  }

  ngOnInit(): void {
    if (this.profile.includes('Sofia')) {
        this.imgsrc = 'assets/sofia-lutteri.png';
      }
    if (this.profile.includes('Briana')) {
        this.imgsrc = 'assets/briana-cirstea.png';
      }
    if (this.profile.includes('Mihai')) {
        this.imgsrc = 'assets/mihai-butnariu.png';
      }
    // this.imgsrc = 'assets/' + this.profile.toLowerCase().replace(' ', '-') + '.png';
    // console.log(this.imgsrc);
    // setTimeout(() => {
    //   if (this.profile.includes('Sofia')) {
    //     this.imgsrc = 'assets/sofia-lutteri.png';
    //   }
    //   // console.log(1, this.imgsrc);
    //   // console.log(2, this.profile);
    //   // this.imgsrc = 'assets/' + this.profile.toLowerCase().replace(' ', '-') + '.png';
    //   this.cdr.detectChanges();
    // }, 40);
  }

  ngAfterViewInit(): void {
    // if (this.profile.includes('Sofia')) {
    //     this.imgsrc = 'assets/sofia-lutteri.png';
    //   }
    // setTimeout(() => {
    //   // console.log(1, this.imgsrc);
    //   // console.log(2, this.profile);
    //   // this.imgsrc = 'assets/' + this.profile.toLowerCase().replace(' ', '-') + '.png';
    //   if (this.profile.includes('Sofia')) {
    //     this.imgsrc = 'assets/sofia-lutteri.png';
    //   }
    //   this.cdr.detectChanges();
    // }, 40);
  }
  // ngSrc="assets/sofia-lutteri.png"
}
