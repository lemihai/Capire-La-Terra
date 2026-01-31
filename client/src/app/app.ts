import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { GlobalAudioPlayerComponent } from './global-audio-player.component/global-audio-player.component';
import { UIStatContainer } from './ui-stat-container/ui-stat-container';
import { BrowserFrameComponent } from './browser-frame-component/browser-frame-component';

@Component({
  selector: 'app-root',
  standalone: true, // Use standalone components
  imports: [
    RouterOutlet,
    Navbar,
    GlobalAudioPlayerComponent,
    UIStatContainer,
    BrowserFrameComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
