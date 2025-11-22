import { Component, inject, OnInit } from '@angular/core';
import { Robot, RobotsComponent } from './robots-component/robots-component';
import { RobotsService } from './robots.service';

@Component({
  selector: 'app-robots-view',
  imports: [RobotsComponent],
  templateUrl: './robots-view.html',
  styleUrl: './robots-view.scss',
})
export class RobotsView implements OnInit {
  private robotsService = inject(RobotsService);

  robots: Robot[] = [];

  ngOnInit() {
    this.robotsService.getRobots().subscribe({
      next: (response) => {
        this.robots = response;
        console.log(this.robots);
      },
      error: (error) => {
        console.log('There was an error!' + error);
      },
    });
  }
}
