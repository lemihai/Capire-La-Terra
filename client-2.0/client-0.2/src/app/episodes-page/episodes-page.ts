import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AudioTrack } from '../shared/components/audio-track/audio-track';

import { NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

@Component({
  selector: 'app-episodes-page',
  imports: [NgOptimizedImage, AudioTrack],
  templateUrl: './episodes-page.html',
  styleUrl: './episodes-page.scss',
})
export class EpisodesPage implements AfterViewInit, OnInit, OnDestroy {
  private smoother: ScrollSmoother | null = null;

  constructor(private ngZone: NgZone) {}

  focused = 'on-s1';
  se1active = 'seactive';
  se2active = '';
  se3active = '';
  isPlaying = 'true';
  topPartDisabled = '';
  expandButton = '';

  play() {
    if (this.isPlaying == 'true') {
      this.isPlaying = 'false';
    } else if (this.isPlaying == 'false') {
      this.isPlaying = 'true';
    }
  }

  focuss1() {
    this.focused = 'on-s1';
    this.se1active = 'seactive';
    this.se2active = '';
    this.se3active = '';
  }
  focuss2() {
    this.focused = 'on-s2';
    this.se1active = '';
    this.se2active = 'seactive';
    this.se3active = '';
  }
  focuss3() {
    this.focused = 'on-s3';
    this.se1active = '';
    this.se2active = '';
    this.se3active = 'seactive';
  }

  episodes = [
    {
      id: 3243223,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 1,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243224,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 2,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243225,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 3,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243226,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 4,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243227,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 5,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243228,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 6,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243229,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 7,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243230,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 8,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243231,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 9,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
  ];

  ngOnInit() {
    // Register GSAP plugins here once
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    });
  }

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Create the smoother instance
      this.smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        normalizeScroll: false,
        ignoreMobileResize: true,
        smoothTouch: false,
      });
    });
  }
}
