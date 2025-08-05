import { Component, NgZone } from '@angular/core';
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
})
export class Background {
  a = 'image';

  // DO NOT DELETE
  // Initilizing the constructor and the ngafterviewInit thing in here leads
  // to better performance. 

  // constructor(private ngZone: NgZone) {}

  // ngAfterViewInit() {
  //   this.ngZone.runOutsideAngular(() => {
  //     console.log("Triggered")
  //     // Initialize ScrollSmoother after the view has been initialized
  //     ScrollSmoother.create({
  //       wrapper: '#smooth-wrapper',
  //       content: '#smooth-content',
  //       smooth: 2,
  //       effects: true,
  //       normalizeScroll: true,
  //     });
  //   });
  // }
}
