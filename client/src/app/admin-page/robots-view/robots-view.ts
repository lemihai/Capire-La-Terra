import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { NewsWebsite, RobotsService } from '../service/robots-service/robots-service';
import { Router, RouterOutlet } from '@angular/router';
import { RobotCard } from './robot-card/robot-card';

@Component({
  selector: 'app-robots-view',
  imports: [RouterOutlet, RobotCard],
  templateUrl: './robots-view.html',
  styleUrl: './robots-view.scss',
})
export class RobotsView implements OnInit, AfterViewInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private robotsService: RobotsService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  robot: NewsWebsite = {
    _id: '',
    name: '',
    url: '',
  };
  status = 'active';

  robots: any[] = [];

  ngOnInit(): void {
    this.adminService.getRobots().subscribe((data) => {
      this.robots = data as any[];
      console.log(this.robots);
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    console.log('afterviewinit');
  }
}
