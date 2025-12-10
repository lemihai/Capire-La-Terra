import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AdminService } from '../service/admin-service';
import { Article, ArticlesService } from '../service/articles-service/articles-service';
import { Router, RouterOutlet } from '@angular/router';

import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { ArticleCard } from './article-card/article-card';
import { Button } from '../../shared/buttons/button/button';

@Component({
  selector: 'app-articles-view',
  imports: [RouterOutlet, ArticleCard, Button],
  templateUrl: './articles-view.html',
  styleUrl: './articles-view.scss',
})
export class ArticlesView {
  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private newsService: ArticlesService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  private smoother: ScrollSmoother | null = null;

  article: Article = {
    _id: '',
    title: '',
    date: '',
    author: '',
    url: '',
    imageUrl: '',
    text: [],
    sources: [],
    summary: '',
    posted: false,
  };

  articles: any = [];

  sorting = {
    sortDirection: 'desc',

    titleSort: false,
    postedSort: false,
    authorSort: false,
    dateSort: true,

    postedSortingVisualFlag: 'sort-inactive',
    titleSortingVisualFlag: 'sort-inactive',
    dateSortingVisualFlag: 'sort-active',
    authorSortingVisualFlag: 'sort-inactive',

    sortUIupdate(key: string) {
      if (key == 'posted') {
        this.postedSortingVisualFlag = 'sort-active';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'title') {
        this.postedSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-active';
        this.dateSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-inactive';
      }
      if (key == 'author') {
        this.postedSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-inactive';
        this.authorSortingVisualFlag = 'sort-active';
      }
      if (key == 'date') {
        this.postedSortingVisualFlag = 'sort-inactive';
        this.titleSortingVisualFlag = 'sort-inactive';
        this.dateSortingVisualFlag = 'sort-active';
        this.authorSortingVisualFlag = 'sort-inactive';
      }
    },

    sortedListView: [{}],
  };

  ngOnInit(): void {
    this.adminService.getAllArticles().subscribe((data) => {
      this.articles = data;
      this.sorting.sortedListView = [...this.articles];

      this.cdr.detectChanges(); // Manually trigger change detection if needed
    });
  }

  navigateToNewArticleView() {
    this.adminService.triggerViewChange('new-article', 'articles-view');
  }

  

  ngAfterViewInit(): void {}

  navigateToArticlePage(articleId: string, articleData: any) {
    this.adminService.triggerViewChange(
      'admin-article-page',
      'articles-view',
      articleId,
      articleData
    );
  }

  //  navigateToNewsArticlePage(articleId: string, articleData: any) {
  //   this.adminService.triggerViewChange('news-article-view', 'news-view', articleId, articleData);
  //   // console.log();
  // }

  // Inside export class NewsView implements OnInit, AfterViewInit { ... }

  sort(key: string) {
    // 1. Determine the current direction and update the specific key flag

    this.sorting.sortUIupdate(key);
    // Reset all key sort flags except the current one
    this.sorting.postedSort = key === 'posted';
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

    this.articles = this.sorting.sortedListView;

    console.log(`Sorted by ${key} in ${this.sorting.sortDirection} order.`);
    this.cdr.detectChanges(); // Update the view after sorting
  }

  postArticle(article: Article) {
    console.log(article._id);
    if (article.posted === true) {
      article.posted = false;
      // console.log(article);
      this.adminService.patchArticlePostedStatus(article._id, article.posted).subscribe({
        next: (response) => {
          // console.log('Posted status updated successfully:', response);
        },
        error: (error) => {
          // console.error('Error :', error);
        },
      });
    } else {
      article.posted = true;
      this.adminService.patchArticlePostedStatus(article._id, article.posted).subscribe({
        next: (response) => {
          // console.log('Posted status updated successfully:', response);
        },
        error: (error) => {
          // console.error('Error updating posted status:', error);
        },
      });
    }
    console.log('from view', article);
  }

  editArticle(article: Article) {
    // 1. Log the change
    console.log(
      `Attempting to update article ID ${article._id} posted status to: ${article.posted}`
    );
  }

  deleteArticle(_id: string) {
    this.adminService.deleteArticle(_id).subscribe(
      (response) => {
        console.log('Article deleted successfully', response);
        // Re-fetch the articles after deletion
        this.adminService.getAllArticles().subscribe((data) => {
          this.articles = data;
          this.sorting.sortedListView = [...this.articles];
          this.cdr.detectChanges(); // Update the view
        });
      },
      (error) => {
        console.error('Error deleting article', error);
      }
    );
  }
}
