import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs'; // Use Subject for broadcasting values
import { Episode } from '../admin-page/service/episodes-service/episodes-service';
import { EpisodesService } from '../../services/episodes-service/episodes-service';

// GSAP
import { gsap } from 'gsap'; // 3. Import gsap (assuming it's installed)
import CustomEase from 'gsap/CustomEase';

@Injectable({
  providedIn: 'root',
})
export class GlobalAudioPlayerService {
  private episodeSource = new Subject<Episode>(); // Replace 'any' with your Episode type
  private episodeService = inject(EpisodesService);

  // 2. Public observable for components to subscribe to
  episode$ = this.episodeSource.asObservable();

  constructor() {}

  // 3. Method called by the Episode Card/View when playback is requested
  playEpisode(episode: Episode) {
    // Replace 'any' with your Episode type
    console.log(episode);
    this.episodeSource.next(episode);

    // setTimeout(() => {
    //   this.episodeSource.next(episode);
    //   console.log(episode);
    // }, 10);
  }

  // GSAP STUFF
  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');
  viewportWidth = window.innerWidth;

  mobileBigState() {
    // ************************************
    // Main Group
    // ************************************

    gsap.to('.mobile-player-wrapper', {
      height: '211.59px',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });

    // ************************************
    // Top Group
    // ************************************

    gsap.to('.mobile-player-details-wrapper', {
      translateY: '0rem',
      translateX: '0rem',
      alignItems: 'flex-start',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-title-wrapper', {
      width: '100%',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-image-wrapper', {
      width: '6.4rem',
      height: '6.4rem',
      minWidth: '6.4rem',
      minHeight: '6.4rem',
      borderRadius: '1.2rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });

    gsap.to('.mobile-player-episode-text', {
      width: 'auto',
      height: 'auto',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-profile-card-wrapper', {
      width: 'auto',
      height: 'auto',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-vertical-separator-line', {
      height: '1.2rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });

    // ************************************
    // Middle Group
    // ************************************

    gsap.to('.mobile-player-track-wrapper', {
      padding: '0rem',
      justifyContent: 'space-evenly',
      marginBottom: '7.2rem',
      gap: '0rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-timer-text', {
      fontSize: '1.6rem !important',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });

    // ************************************
    // Bottom Group
    // ************************************

    gsap.to('.mobile-player-controls-wrapper', {
      width: '100%',
      height: '5.6rem',
      translateX: '0vw',
      padding: '0rem .8rem',
      right: 0,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(1)', {
      width: '4.8rem',
      height: '4.8rem',
      // display: 'none',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(2)', {
      width: '4.8rem',
      height: '4.8rem',
      // display: 'none',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(3)', {
      margin: '0rem .8rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(4)', {
      width: '4.8rem',
      height: '4.8rem',
      // display: 'none',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(5)', {
      width: '4.8rem',
      height: '4.8rem',
      // display: 'none',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
  }

  mobileMediumState() {
    // ************************************
    // Main Group
    // ************************************

    gsap.to('.mobile-player-wrapper', {
      height: '7.4rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });

    // ************************************
    // Top Group
    // ************************************

    gsap.to('.mobile-player-details-wrapper', {
      translateY: '5rem',
      translateX: '-0.8rem',
      alignItems: 'flex-start',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-title-wrapper', {
      width: '80%',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-image-wrapper', {
      width: '5.6rem',
      height: '5.6rem',
      minWidth: '5.6rem',
      minHeight: '5.6rem',
      borderRadius: '1.6rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });

    gsap.to('.mobile-player-episode-text', {
      width: '0rem',
      height: '0rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-profile-card-wrapper', {
      width: '0rem',
      height: '0rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-vertical-separator-line', {
      height: '0rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });

    // ************************************
    // Middle Group
    // ************************************
    gsap.to('.mobile-player-track-wrapper', {
      translateY: '0rem',
      padding: '0rem 0rem 0rem 6.6rem',
      justifyContent: 'flex-start',
      marginBottom: '0rem',
      gap: '.8rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    // if (this.viewportWidth <= 440 && this.viewportWidth > 400) {
    //   gsap.to('.mobile-player-track-wrapper', {
    //     width: '72%',
    //     translateY: '0rem',
    //     rotate: 0,
    //     duration: 1,
    //     ease: this.ease,
    //     overwrite: true,
    //   });
    // }
    // if (this.viewportWidth <= 400) {
    //   gsap.to('.mobile-player-track-wrapper', {
    //     width: '64%',
    //     translateY: '0rem',
    //     rotate: 0,
    //     duration: 1,
    //     ease: this.ease,
    //     overwrite: true,
    //   });
    // }
    gsap.to('.mobile-player-timer-text', {
      fontSize: '1.2rem !important',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });

    // ************************************
    // Bottom Group
    // ************************************

    gsap.to('.mobile-player-controls-wrapper', {
      width: '5.6rem',
      height: '5.6rem',
      // translateX: '37vw',
      position: 'absolute',
      padding: '0rem',
      right: '2.4rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(1)', {
      width: '0rem',
      height: '0rem',
      // display: 'none',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(2)', {
      width: '0rem',
      height: '0rem',
      // display: 'none',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(3)', {
      margin: '0rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(4)', {
      width: '0rem',
      height: '0rem',
      // display: 'none',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.mobile-player-button-wrapper:nth-child(5)', {
      width: '0rem',
      height: '0rem',
      // display: 'none',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
  }
  mobileCollapsedState() {}
}
