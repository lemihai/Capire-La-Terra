import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { NgOptimizedImage } from '@angular/common';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { LandingPage } from './landing-page/landing-page';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';

import { Router, RouterOutlet } from '@angular/router';
import { GlobalAudioPlayerComponent } from './global-audio-player.component/global-audio-player.component';
import { UIStatContainer } from './ui-stat-container/ui-stat-container';
import { BrowserFrameComponent } from './browser-frame-component/browser-frame-component';

@Component({
  selector: 'app-root',
  standalone: true, // Use standalone components
  imports: [
    RouterOutlet,
    LandingPage,
    Navbar,
    Footer,
    GlobalAudioPlayerComponent,
    UIStatContainer,
    BrowserFrameComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
