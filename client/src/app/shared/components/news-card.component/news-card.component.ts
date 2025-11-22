import { Component, Input } from '@angular/core';
import { ProfileCard } from "../profile-card/profile-card";

@Component({
  selector: 'app-news-card',
  imports: [ProfileCard],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  @Input() cardType: string = ''; // Default value
}
