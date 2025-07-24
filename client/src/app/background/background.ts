import { Component } from '@angular/core';
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

@Component({
  selector: 'app-background',
  imports: [],
  templateUrl: './background.html',
  styleUrl: './background.scss',
})
export class Background {
  a = 'image';

  // create the smooth scroller FIRST!
  smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
    normalizeScroll: true,
  });
}
