import { Component } from '@angular/core';

@Component({
  selector: 'app-one-backward-button',
  imports: [],
  templateUrl: './one-backward-button.html',
  styleUrl: './one-backward-button.scss'
})
export class OneBackwardButton {
onebackward(){
    console.log('the previous video is being player')
  }
}
