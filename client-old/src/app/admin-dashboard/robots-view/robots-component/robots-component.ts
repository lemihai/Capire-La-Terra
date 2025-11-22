import { Component,Input, OnInit } from '@angular/core';

export interface Robot {
  _id: string;
  name: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'app-robots-component',
  imports: [],
  templateUrl: './robots-component.html',
  styleUrl: './robots-component.scss'
})
export class RobotsComponent{
  @Input() robot!: Robot;

}
