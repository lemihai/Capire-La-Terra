import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  imports: [NgOptimizedImage],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard implements OnInit, AfterViewInit {
  @Input({ required: true }) profile: string = '';
  imgsrc: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.imgsrc = 'assets/' + this.profile.toLowerCase().replace(' ', '-') + '.png';
    // setTimeout(() => {
    //   this.cdr.detectChanges();
    //   console.log(1, this.imgsrc);
    //   console.log(2, this.profile);
    //   this.imgsrc = 'assets/' + this.profile.toLowerCase().replace(' ', '-') + '.png';
    // }, 1);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
      // console.log(1, this.imgsrc);
      // console.log(2, this.profile);
      this.imgsrc = 'assets/' + this.profile.toLowerCase().replace(' ', '-') + '.png';
    }, 30);
  }
  // ngSrc="assets/sofia-lutteri.png"
}
