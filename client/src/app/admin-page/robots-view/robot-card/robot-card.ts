import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PlayButton } from "../../../shared/buttons/play-button/play-button";

@Component({
  selector: 'app-robot-card',
  imports: [PlayButton],
  templateUrl: './robot-card.html',
  styleUrl: './robot-card.scss',
})
export class RobotCard implements OnInit{
  @Input() status: string = '';
  @Input() robot: any = '';

  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log(this.status);
    console.log(this.robot);
    // this.cdr.detectChanges();
  }

}
