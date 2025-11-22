import { Component } from '@angular/core';

@Component({
  selector: 'app-one-forward-button',
  imports: [],
  templateUrl: './one-forward-button.html',
  styleUrl: './one-forward-button.scss'
})
export class OneForwardButton {
oneforward(){
    console.log('the previous video is being player')
  }
}
