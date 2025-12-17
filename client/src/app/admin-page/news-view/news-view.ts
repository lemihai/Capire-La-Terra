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
    currentSortKey: 'date',

    urlSort: false,
    titleSort: false,
    dateSort: true,
    authorSort: false,

    urlSortingVisualFlag: 'sort-inactive',
    titleSortingVisualFlag: 'sort-inactive',
    dateSortingVisualFlag: 'sort-active',
    authorSortingVisualFlag: 'sort-inactive',

    sortUIupdate(key: string) {
      if (key == 'url') {
        this.urlSortingVisualFlag = 'sort-active';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'title') {
        this.urlSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-active';
        this.dateSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'author') {
        this.urlSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-active';
      }
      if (key == 'date') {
        this.urlSortingVisualFlag = 'sort-inactive';
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
this.sort('date');
      this.cdr.detectChanges(); // Manually trigger change detection if needed
    });
  }

  showarticles() {}

  ngAfterViewInit(): void {}

  navigateToNewsArticlePage(articleId: string, articleData: any) {
    this.adminService.triggerViewChange('news-article-view', 'news-view', articleId, articleData);
    // console.log();
  }

  // Inside export class NewsView implements OnInit, AfterViewInit { ... }

  sort(key: string) {
    this.sorting.sortUIupdate(key);

    // 1. Determine if this is a new sort column
    const isNewKey = this.sorting.currentSortKey !== key;

    // 2. Determine the new sort direction
    if (isNewKey) {
        // If a new key is clicked, default to the desired starting direction.
        // Date usually defaults to 'desc' (newest first). Others default to 'asc'.
        this.sorting.sortDirection = key === 'date' ? 'desc' : 'asc';
    } else {
        // If the same key is clicked, flip the current direction.
        this.sorting.sortDirection = this.sorting.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    // 3. Update the current sort key
    this.sorting.currentSortKey = key;

    // Optional: Keep your boolean flags for UI visual states (but they are not used for logic anymore)
    this.sorting.urlSort = key === 'url';
    this.sorting.titleSort = key === 'title';
    this.sorting.dateSort = key === 'date';
    this.sorting.authorSort = key === 'author';


    // 4. Perform the sort (Keep this as is - it's correct)
    const direction = this.sorting.sortDirection === 'asc' ? 1 : -1;

    this.sorting.sortedListView.sort((a: any, b: any) => {
        let valA = a[key];
        let valB = b[key];

        if (key === 'date') {
            const dateA = new Date(valA).getTime();
            const dateB = new Date(valB).getTime();
            return (dateA - dateB) * direction;
        } else {
            valA = String(valA).toLowerCase();
            valB = String(valB).toLowerCase();

            if (valA < valB) return -1 * direction;
            if (valA > valB) return 1 * direction;
            return 0;
        }
    });

    this.newsList = this.sorting.sortedListView;

    console.log(`Sorted by ${key} in ${this.sorting.sortDirection} order.`);
    this.cdr.detectChanges(); // Update the view after sorting
}

  deleteThisArticle(articleId: string) {
    this.adminService.deleteOneNewsArticle(articleId).subscribe(
      (response) => {
        const activeSortKey = this.getCurrentSortKey();
        this.adminService.getAllNews().subscribe((data) => {
          this.newsList = data;
          this.sorting.sortedListView = [...this.newsList];
          this.sorting.sortDirection = this.sorting.sortDirection === 'asc' ? 'desc' : 'asc';
          
          this.sort(activeSortKey);
          this.cdr.detectChanges(); // Update the view
        });
      },
      (error) => {
        // Error: Handle the error (e.g., show an error message)
        console.error('Error deleting article:', error);
        alert(`Failed to delete article: ${error.message || error}`);
      }
    );
  }

  getCurrentSortKey(): string {
  if (this.sorting.urlSort) return 'url';
  if (this.sorting.titleSort) return 'title';
  if (this.sorting.authorSort) return 'author';
  // Default to 'date' if none other is active (based on your initial state)
  return 'date';
}
}
