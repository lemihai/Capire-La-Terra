import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { NewsWebsite, RobotsService } from '../service/robots-service/robots-service';
import { Router, RouterOutlet } from '@angular/router';
import { RobotCard } from './robot-card/robot-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-robots-view',
  imports: [RouterOutlet, RobotCard, CommonModule],
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
    status: '',
  };
  status = 'active';

  robots: NewsWebsite[] = [];

  sorting = {
    sortDirection: 'desc',

    activeSort: false,
    nameSort: true,
    urlSort: false,

    activeSortingVisualFlag: 'sort-inactive',
    nameSortingVisualFlag: 'sort-inactive',
    urlSortingVisualFlag: 'sort-inactive',

    sortUIupdate(key: string) {
      if (key == 'active') {
        this.activeSortingVisualFlag = 'sort-active';
        this.nameSortingVisualFlag = 'sort-inactive';
        this.urlSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'name') {
        this.activeSortingVisualFlag = 'sort-inactive';
        this.nameSortingVisualFlag = 'sort-active';
        this.urlSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'url') {
        this.activeSortingVisualFlag = 'sort-inactive';
        this.nameSortingVisualFlag = 'sort-inactive';
        this.urlSortingVisualFlag = 'sort-active';
      }
    },

    sortedListView: [] as NewsWebsite[],
  };

  sort(key: string) {
    // 1. Determine the current direction and update the specific key flag

    this.sorting.sortUIupdate(key);
    // Reset all key sort flags except the current one
    this.sorting.activeSort = key === 'active';
    this.sorting.nameSort = key === 'name';
    this.sorting.urlSort = key === 'url';

    // If the *same* key is clicked, flip the direction. Otherwise, default to 'asc'.
    // NOTE: Your date logic is inverted (see notes below), so for date, we default to 'desc' (newest first)
    if (this.sorting.sortDirection === 'asc') {
      this.sorting.sortDirection = 'desc';
    } else {
      this.sorting.sortDirection = 'asc';
    }

    const direction = this.sorting.sortDirection === 'asc' ? 1 : -1;

    // 2. Perform the sort
    this.sorting.sortedListView.sort((a: any, b: any) => {
      // Use 'any' for the list items here
      let valA = a[key];
      let valB = b[key];

      if (key === 'number' || key === 'season') {
        // Numeric comparison for episode/season numbers
        const numA = Number(valA);
        const numB = Number(valB);
        return (numA - numB) * direction;
      } else {
        // String comparison (case-insensitive for alphabetical sort)
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();

        if (valA < valB) return -1 * direction;
        if (valA > valB) return 1 * direction;
        return 0; // values must be equal
      }
    });

    this.robots = this.sorting.sortedListView;

    this.cdr.detectChanges(); // Update the view after sorting
  }

  ngOnInit(): void {
    this.adminService.getRobots().subscribe((data) => {
      this.robots = data;
      this.sorting.sortedListView = [...this.robots];
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {}
}
