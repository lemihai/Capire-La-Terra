import { Component, ChangeDetectionStrategy} from '@angular/core';
import { gsap } from 'gsap';

// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // ScrollSmoother requires ScrollTrigger
// import { ScrollSmoother } from 'gsap/ScrollSmoother';

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

@Component({
  selector: 'app-background',
  imports: [],
  templateUrl: './background.html',
  styleUrl: './background.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Background {
  
}
