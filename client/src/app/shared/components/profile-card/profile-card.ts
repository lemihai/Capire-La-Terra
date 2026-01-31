import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-profile-card',
  imports: [NgOptimizedImage],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard implements OnInit, OnChanges {
  @Input({ required: true }) profile: string = '';
  @Input() cardMode?: string = '';
  imgsrc: string = 'assets/article-illustration-1.jpg';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile']) {
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
  }
}
