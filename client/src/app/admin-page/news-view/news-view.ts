import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { News, NewsService } from '../service/news-service/news-service';
import { NewsCardComponent } from '../../shared/components/news-card.component/news-card.component';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-news-view',
  imports: [NewsCardComponent, RouterOutlet],
  templateUrl: './news-view.html',
  styleUrl: './news-view.scss',
})
export class NewsView implements OnInit, AfterViewInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private newsService: NewsService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  sorting = {
    sortDirection: 'desc',

    outletSort: false,
    titleSort: false,
    dateSort: true,
    authorSort: false,

    outletSortingVisualFlag: 'sort-inactive',
    titleSortingVisualFlag: 'sort-inactive',
    dateSortingVisualFlag: 'sort-active',
    authorSortingVisualFlag: 'sort-inactive',

    sortUIupdate(key: string) {
      if (key == 'outlet') {
        this.outletSortingVisualFlag = 'sort-active';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'title') {
        this.outletSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-active';
        this.dateSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'author') {
        this.outletSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-active';
      }
      if (key == 'date') {
        this.outletSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-active';
        this.authorSortingVisualFlag = 'sort-inactive';
      }
    },

    sortedListView: [{}],
  };

  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  private smoother: ScrollSmoother | null = null;

  news: News = {
    author: '',
    date: '2010-01-17',
    summary: '',
    text: '',
    title: '',
    url: '',
    _id: '',
  };

  newsList: any = [];

  ngOnInit(): void {
    this.adminService.getAllNews().subscribe((data) => {
      this.newsList = data;
      this.sorting.sortedListView = [...this.newsList];

    

      this.cdr.detectChanges(); // Manually trigger change detection if needed
    });
    
  }

  

  showarticles() {}

  ngAfterViewInit(): void {}

  navigateToNewsArticlePage(articleId: string, articleData: any) {
    this.adminService.triggerViewChange('news-article-view', 'news-view', articleId, articleData);
  }

  // Inside export class NewsView implements OnInit, AfterViewInit { ... }

  sort(key: string) {
    // 1. Determine the current direction and update the specific key flag

    this.sorting.sortUIupdate(key);
    // Reset all key sort flags except the current one
    this.sorting.outletSort = key === 'outlet';
    this.sorting.titleSort = key === 'title';
    this.sorting.dateSort = key === 'date';
    this.sorting.authorSort = key === 'author';

    // If the *same* key is clicked, flip the direction. Otherwise, default to 'asc'.
    // NOTE: Your date logic is inverted (see notes below), so for date, we default to 'desc' (newest first)
    if (this.sorting.dateSort && this.sorting.sortDirection === 'desc') {
      this.sorting.sortDirection = 'asc'; // Oldest first
    } else if (this.sorting.dateSort) {
      this.sorting.sortDirection = 'desc'; // Newest first (default)
    } else if (this.sorting.sortDirection === 'asc') {
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

      if (key === 'date') {
        // Date comparison:
        // For 'desc' (newest first), the result of (dateA - dateB) should be negative
        // if A is newer than B (and thus A should come first).
        // (dateA - dateB) is negative if A is earlier (older) than B.
        // So, for 'desc' (newest first), we use (dateB - dateA)
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();

        // NOTE: The direction is handled by the sorting function itself,
        // so if 'asc' (oldest first) is 1, we use (dateA - dateB) * 1
        // if 'desc' (newest first) is -1, we use (dateA - dateB) * -1 = (dateB - dateA)
        return (dateA - dateB) * direction;
      } else {
        // String comparison (case-insensitive for alphabetical sort)
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();

        if (valA < valB) return -1 * direction;
        if (valA > valB) return 1 * direction;
        return 0; // values must be equal
      }
    });

    console.log(this.sorting.sortedListView[32]);

    this.newsList = this.sorting.sortedListView;

    console.log(`Sorted by ${key} in ${this.sorting.sortDirection} order.`);
    this.cdr.detectChanges(); // Update the view after sorting
  }
}
