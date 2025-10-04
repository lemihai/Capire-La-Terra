import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  imports: [NgOptimizedImage],
  templateUrl: './audio-player.html',
  styleUrl: './audio-player.scss',
})
export class AudioPlayer {
  isPlaying = 'true';
  audioPlayerContainerDisabled = '';
  buttonCssDissapear = '';
  separatorLineDisabled = '';
  captionDisabled = '';
  captionsDisabled = '';
  progressBarDisabled = '';
  topPartDisabled = '';
  bottomControlsDisabled = '';
  controlsContainerDisabled = '';
  expandButton = '';
  collapseButtonCollapsed = '';
  a = 'disabled';
  play() {
    if (this.isPlaying == 'true') {
      this.isPlaying = 'false';
    } else if (this.isPlaying == 'false') {
      this.isPlaying = 'true';
    }
  }

  test() {
    console.log('Hello There');
    if (this.a == 'disabled') {
      this.a = 'activated';
      this.audioPlayerContainerDisabled = 'audio-player-container-disabled';
      this.buttonCssDissapear = 'control-disabled';
      this.separatorLineDisabled = 'separator-line-disabled';
      this.captionDisabled = 'caption-disabled';
      this.captionsDisabled = 'captions-disabled';
      this.progressBarDisabled = 'progress-bar-disabled';
      this.topPartDisabled = 'top-part-disabled';
      this.bottomControlsDisabled = 'bottom-controls-disabled';
      this.controlsContainerDisabled = 'controls-container-disabled';
      this.expandButton = 'expand-button-collapsed';
      this.collapseButtonCollapsed = 'collapse-button-collapsed';
    } else {
      this.a = 'disabled';
      this.audioPlayerContainerDisabled = '';
      this.buttonCssDissapear = '';
      this.separatorLineDisabled = '';
      this.captionDisabled = '';
      this.captionsDisabled = '';
      this.progressBarDisabled = '';
      this.topPartDisabled = '';
      this.bottomControlsDisabled = '';
      this.controlsContainerDisabled = '';
      this.expandButton = '';
      this.collapseButtonCollapsed = '';
    }
  }
}
