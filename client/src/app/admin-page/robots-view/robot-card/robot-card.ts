import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PlayButton } from '../../../shared/buttons/play-button/play-button';
import { AdminService } from '../../service/admin-service';
import { NewsWebsite } from '../../service/robots-service/robots-service';

@Component({
  selector: 'app-robot-card',
  imports: [PlayButton],
  templateUrl: './robot-card.html',
  styleUrl: './robot-card.scss',
})
export class RobotCard implements OnInit {
  @Input() robot?: NewsWebsite;
  constructor(private cdr: ChangeDetectorRef, private adminService: AdminService) {}

  ngOnInit() {
    // Avoid using ngOnInit for @Input() properties
  }
  startScraper(robot: string | undefined) {
      this.adminService.startScraper(robot).subscribe((data) => {
        console.log(data);
        this.cdr.detectChanges();
      });
  }
}
