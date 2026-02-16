import { Injectable } from '@angular/core';
import { gsap } from 'gsap'; // 3. Import gsap (assuming it's installed)
import CustomEase from 'gsap/CustomEase';

// Register the plugin
gsap.registerPlugin(CustomEase);

@Injectable({
  providedIn: 'root',
})
export class NavbarGsapService {
  time = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');
  viewportWidth = window.innerWidth;

  exitFrontPage() {
    gsap.to('.hero-h1', {
      height: '0rem',
      width: '0rem',
      y: -120,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: this.ease,
    });
    gsap.to('.background-wrapper', {
      height: '0px',
      duration: this.time,
      ease: this.ease,
    });
    gsap.to('.episodes-text-h1', {
      height: '0px',
      width: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      rotate: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.latest-news-h1', {
      height: '0px',
      width: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      rotate: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.episode-list-wrapper', {
      // height: '0rem',
      duration: this.time,
      ease: this.ease,
    });
    gsap.to('.about-earth-section', {
      height: '0rem',
      translateY: '-4.8rem',
      duration: this.time,
      ease: this.ease,
    });
    gsap.to('.about-earth-wrapper', {
      // height: '0rem',
      duration: this.time,
      ease: this.ease,
    });
    gsap.to('.left-side-wrapper', {
      height: '0px',
      duration: this.time,
      ease: this.ease,
    });
    gsap.to('.left-side', {
      paddingBottom: '8rem',
      duration: this.time,
      ease: this.ease,
    });
    gsap.to('.right-side-wrapper', {
      height: '0px',
      duration: this.time,
      ease: this.ease,
    });
    gsap.to('.right-side', {
      duration: this.time,
      ease: this.ease,
    });

    // Episodes Components
    //  --------
    gsap.to('.large', {
      // height: '8rem',
      minWidth: '24rem',
      opacity: 0,
      // rotate: 45,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('h2', {
      width: '0rem',
      height: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.app-profile-card-wrapper-for-transform', {
      // clearProps: 'all',
      width: '0rem',
      height: '0rem',
      translateX: '2rem',
      translateY: '-4rem',
      skewX: 32,
      skewY: 8,
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.date', {
      width: '0rem',
      height: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.bottom-container', {
      // width: '100%',
      // height: 'auto',
      skewX: 0,
      skewY: 0,
      rotate: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.episode-image', {
      width: '0rem',
      minWidth: '0rem',
      // height: 'auto',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.separator-line', {
      height: '0rem',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.audio-track-wrapper', {
      translateY: '-1.6rem',
      skewX: 8,
      skewY: 4,
      rotate: 4,
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      // overwrite: 'auto',
    });
    gsap.to('.episode-title', {
      height: '0rem',
      width: '0rem',
      y: -24,
      skewX: 24,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: this.ease,
    });
    gsap.to('.episode-number', {
      height: '0rem',
      width: '0rem',
      y: -24,
      skewX: 24,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: this.ease,
    });
    gsap.to('.episode-duration', {
      height: '0rem',
      width: '0rem',
      y: -24,
      skewX: 24,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: this.ease,
    });
    gsap.to('.profile-wrapper-no-text', {
      y: -24,
      skewX: 24,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: this.ease,
    });
    gsap.to('.season-episode-list', {
      height: '0rem',
      minHeight: '0rem',
      opacity: 0,
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: this.ease,
    });

    // gsap.to('.small-card-audio-track', {
    //   y: -8,
    //   skewX: 8,
    //   skewY: 4,
    //   scale: 1,
    //   rotate: 0,
    //   duration: 2,
    //   ease: this.ease,
    // });

    //  --------
    gsap.to('.episodes-action-container-button', {
      height: '0px',
      width: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.episodes-action-container-button-btn', {
      height: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.news-action-container-button', {
      height: '0px',
      width: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.news-action-container-button-btn', {
      height: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.news-action-container-text', {
      height: '0px',
      width: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.episodes-action-container-text', {
      height: '0px',
      width: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-A', {
      height: '0rem',
      x: 0,
      y: 0,
      skewX: 16,
      skewY: 8,
      opacity: 0,
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium-text', {
      height: '0px',
      width: '0px',
      y: -24,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium-card-image', {
      height: '0rem',
      minHeight: '0rem',
      maxHeight: '0rem',
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium-date', {
      height: '0px',
      width: '0px',
      y: -24,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium-separator-line', {
      height: '0px',
      minHeight: '0px',
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.profile-wrapper', {
      height: '0px',
      width: '0px',
      y: -24,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.source', {
      height: '0px',
      width: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.set('.hero-h1', { clearProps: 'all' });
  }
  /*
  exitFrontPage(exitTimeline: gsap.core.Timeline) {
    exitTimeline
      .to(
        '.hero-h1',
        {
          height: '0rem',
          width: '0rem',
          y: -120,
          skewX: 32,
          skewY: 8,
          scale: 1,
          rotate: 0,
          duration: 2,
          ease: this.ease,
        },
        0,
      )
      .to(
        '.background-wrapper',
        {
          height: '0px',
          duration: this.time,
          ease: this.ease,
        },
        0,
      )
      .to(
        '.episodes-text-h1',
        {
          height: '0px',
          width: '0px',
          y: 0,
          skewX: 32,
          skewY: 8,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      )
      .to(
        '.latest-news-h1',
        {
          height: '0px',
          width: '0px',
          y: 0,
          skewX: 32,
          skewY: 8,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      )
      .to(
        '.episode-list-wrapper',
        {
          height: '0px',
          duration: this.time,
          ease: this.ease,
        },
        0,
      )
      .to(
        '.about-earth-section',
        {
          height: '0rem',
          duration: this.time,
          ease: this.ease,
        },
        0,
      )
      .to(
        '.about-earth-wrapper',
        {
          height: '0rem',
          paddingTop: '8rem',
          duration: this.time,
          ease: this.ease,
        },
        0,
      )
      .to(
        '.left-side-wrapper',
        {
          height: '0px',
          duration: this.time,
          ease: this.ease,
        },
        0,
      )
      .to(
        '.left-side',
        {
          paddingBottom: '8rem',
          duration: this.time,
          ease: this.ease,
        },
        0,
      )
      .to(
        '.right-side-wrapper',
        {
          height: '0px',
          duration: this.time,
          ease: this.ease,
        },
        0,
      )
      .to(
        '.right-side',
        {
          duration: this.time,
          ease: this.ease,
        },
        0,
      )
      .to(
        '.episodes-action-container-button',
        {
          height: '0px',
          width: '0px',
          y: 0,
          skewX: 32,
          skewY: 8,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: this.ease,
          overwrite: true,
        },
        0,
      )
      .to(
        '.episodes-action-container-button-btn',
        {
          height: '0px',
          y: 0,
          skewX: 32,
          skewY: 8,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: this.ease,
          overwrite: true,
        },
        0,
      )
      .to(
        '.news-action-container-button',
        {
          height: '0px',
          width: '0px',
          y: 0,
          skewX: 32,
          skewY: 8,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: this.ease,
          overwrite: true,
        },
        0,
      )
      .to(
        '.news-action-container-button-btn',
        {
          height: '0px',
          y: 0,
          skewX: 32,
          skewY: 8,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: this.ease,
          overwrite: true,
        },
        0,
      )
      .to(
        '.news-action-container-text',
        {
          height: '0px',
          width: '0px',
          y: 0,
          skewX: 32,
          skewY: 8,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: this.ease,
          overwrite: true,
        },
        0,
      )
      .to(
        '.episodes-action-container-text',
        {
          height: '0px',
          width: '0px',
          y: 0,
          skewX: 32,
          skewY: 8,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: this.ease,
          overwrite: true,
        },
        0,
      )
      .to(
        '.transition-A',
        {
          height: '0rem',
          x: 0,
          y: 0,
          skewX: 16,
          skewY: 8,
          opacity: 0,
          scale: 1,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        },
        0,
      );
  }
*/
  exitEpisodesPage() {
    gsap.to('.episodes-list', {
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.hero-h1A', {
      height: '0rem',
      width: '0rem',
      y: 32,
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.hero-h1-A', {
      height: '0rem',
      width: '0rem',
      y: 32,
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.season-h1', {
      height: '0rem',
      width: '0rem',
      y: 32,
      skewX: 32,
      skewY: 8,
      duration: this.time,
      // delay: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium', {
      // height: '6.4rem',
      minWidth: '32rem',
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.large', {
      // height: '8rem',
      minWidth: '32rem',
      opacity: 0,
      // rotate: 45,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.header-dropdown', {
      height: '0rem',
      width: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });

    gsap.to('h2', {
      width: '0rem',
      height: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.app-profile-card-wrapper-for-transform', {
      // clearProps: 'all',
      width: '0rem',
      height: '0rem',
      translateX: '2rem',
      translateY: '-4rem',
      skewX: 32,
      skewY: 8,
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.date', {
      width: '0rem',
      height: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.bottom-container', {
      // width: '100%',
      // height: 'auto',
      skewX: 0,
      skewY: 0,
      rotate: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.episode-image', {
      width: '0rem',
      minWidth: '0rem',
      // height: 'auto',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.separator-line', {
      height: '0rem',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.audio-track-wrapper', {
      // width: 'auto',
      // height: 'auto',
      translateX: '2rem',
      translateY: '-6rem',
      skewX: 32,
      skewY: -8,
      rotate: 4,
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      // overwrite: 'auto',
    });
  }

  exitNewsPage() {
    gsap.to('.transition-A', {
      height: '0rem',
      x: 0,
      y: 0,
      skewX: 16,
      skewY: 8,
      opacity: 0,
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.card-image', {
      height: '0rem',
      minHeight: '0rem',
      maxHeight: '0rem',
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-image-A', {
      height: '0rem',
      minHeight: '0rem',
      maxHeight: '0rem',
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.news-card-wrapper.right .image', {
      height: '0rem',
      minHeight: '0rem',
      maxHeight: '0rem',
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.news-card-wrapper.left .image', {
      height: '0rem',
      minHeight: '0rem',
      maxHeight: '0rem',
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-horizontal-line', {
      maxWidth: '0rem',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-vertical-line', {
      maxHeight: '0rem',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-vertical-line-inside-card', {
      maxHeight: '0rem',
      y: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    // gsap.to('.transition-image-A ', {
    //   height: '0rem',
    //   minHeight: '0rem',
    //   maxHeight: '0rem',
    //   y: -8,
    //   duration: this.time,
    //   ease: this.ease,
    //   overwrite: true,
    // });

    // *****
    // Medium card
    // *****
    gsap.to('h2', {
      width: '0rem',
      height: '0rem',
      skewX: 32,
      skewY: 8,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium-text', {
      height: '0px',
      width: '0px',
      y: -24,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium-card-image', {
      height: '0rem',
      minHeight: '0rem',
      maxHeight: '0rem',
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium-date', {
      height: '0px',
      width: '0px',
      y: -24,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.medium-separator-line', {
      height: '0px',
      minHeight: '0px',
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.profile-wrapper', {
      height: '0px',
      width: '0px',
      y: -24,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.profile-wrapper-no-text', {
      height: '0px',
      width: '0px',
      y: -24,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.source', {
      height: '0px',
      width: '0px',
      y: 0,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });
    // *****
  }

  exitArticlePage() {
    // setTimeout(() => {
    // --------------------------------
    // TEXT SECTION
    // --------------------------------

    gsap.to('.article-page-wrapper', {
      // height: '0rem',
      x: 0,
      y: 0,
      // skewX: -24,
      // skewY: -8,
      opacity: 0,
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-A', {
      // height: '0rem',
      x: 0,
      y: 0,
      skewX: -24,
      skewY: -8,
      opacity: 0,
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.paragraph-transition', {
      // height: '0rem',
      translateY: '-4rem',
      skewX: -24,
      skewY: -8,
      opacity: 0,
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });

    gsap.to('.article-page-wrapper', {
      minHeight: '100vh',
      maxHeight: '100vh',
      height: '100vh',
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-image', {
      minHeight: '0rem',
      maxHeight: '0rem',
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-horizontal-line', {
      width: '0rem',
      maxWidth: '0rem',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-vertical-line', {
      maxHeight: '0rem',
      y: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    // }, 100);
  }

  exitAdminPage() {}

  exitLoginPage() {
    // setTimeout(() => {
    // --------------------------------
    // TEXT SECTION
    // --------------------------------
    gsap.to('.image-wrapper', {
      height: '0%',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.image', {
      height: '90vh',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-A', {
      height: '0rem',
      x: 0,
      y: 0,
      skewX: -24,
      skewY: -8,
      opacity: 0,
      scale: 1,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-B', {
      width: '0%',
      minWidth: '0rem',
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-C', {
      opacity: '0',
      scale: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-login-button', {
      width: '0%',
      minWidth: '0rem',
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    gsap.to('.transition-D', {
      height: '.8rem',
      widows: '.8rem',
      x: '-2.4rem',
      y: '-1.6rem',
      opacity: 0,
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });
    // }, 100);
  }

  // --------------------------------
  // Navbar Collapse
  // --------------------------------
  navbarCollapse() {
    gsap.to('nav', {
      height: 'auto',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });

    gsap.to('.nav-logo-wrapper', {
      height: '4rem',
      padding: '.4rem .8rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
      overwrite: true,
    });

    gsap.to('.nav-small-wrapper', {
      height: '3.2rem',
      // padding: '.4rem .8rem',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });

    // ******************************
    gsap.to('.nav-text', {
      y: -40,
      skewX: 24,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.nav-small-header-text', {
      y: -8,
      skewX: 16,
      skewY: 4,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });

    // ******************************
    gsap.to('.button-hover-background', {
      height: '0rem',
      minHeight: '0rem',
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });

    gsap.to('.nav-small-horizontal-separator-line', {
      width: '0rem',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });

    // ******************************
    gsap.to('.nav-small-icon-active', {
      y: -40,
      skewX: 32,
      skewY: 8,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
  }

  // --------------------------------
  // Navbar Expand
  // --------------------------------

  navbarExpand() {
    gsap.to('nav', {
      height: '100%',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });

    if (this.viewportWidth < 464) {
      gsap.to('.nav-logo-wrapper', {
        height: '100%',
        maxHeight: '100%',
        padding: '1.2rem',
        rotate: 0,
        duration: 1,
        ease: this.ease,
        overwrite: true,
      });
    } else if (this.viewportWidth >= 464) {
      gsap.to('.nav-logo-wrapper', {
        height: '100%',
        maxHeight: '100%',
        padding: '1.6rem',
        rotate: 0,
        duration: 1,
        ease: this.ease,
        overwrite: true,
      });
    }
    gsap.to('.nav-small-wrapper', {
      height: '100%',
      maxHeight: '100%',
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.nav-text', {
      y: 0,
      skewX: 0,
      skewY: 0,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
    gsap.to('.nav-small-header-text', {
      y: 0,
      skewX: 0,
      skewY: 0,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });

    // ******************************
    gsap.to('.button-hover-background', {
      height: '4.8rem',
      minHeight: '4.8rem',
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });

    gsap.to('.nav-small-horizontal-separator-line', {
      width: '100%',
      duration: this.time,
      ease: this.ease,
      overwrite: true,
    });

    // ******************************
    gsap.to('.nav-small-icon-active', {
      y: 0,
      skewX: 0,
      skewY: 0,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: this.ease,
    });
  }
}
