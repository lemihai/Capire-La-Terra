import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin-service';
import { News } from '../../service/news-service/news-service';
import { EditBar } from '../../edit-bar/edit-bar';
import { SourceComponent } from '../../../shared/components/source.component/source.component';
import { lastValueFrom } from 'rxjs'; // <-- New Import
@Component({
  selector: 'app-news-article-page',
  imports: [EditBar, SourceComponent],
  templateUrl: './news-article-page.html',
  styleUrl: './news-article-page.scss',
})
export class NewsArticlePage implements OnInit, AfterViewInit {
  articleId: string | null = '';
  editBarComponents: string = 'news-article';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  paragraphs: string[] = [];

  news: any = {
    _id: '',
    title: '',
    author: '',
    date: '',
    text: '',
    summary: '',
    url: '',
    // Add other fields as needed
  };

  newsArticleText: string[] = [];

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id');
    // console.log(this.articleId);
    // let innersource = '';
    if (!this.articleId) {
      // Redirect or handle missing ID
      this.router.navigate(['/admin-page/news-view']);
      return;
    }
    try {
      const navigation = this.router.getCurrentNavigation();
      let articleData = navigation?.extras.state?.['data'];
      if (articleData != undefined) {
        this.news = articleData;
        // innersource = articleData.url;
      } else {
        this.callForArticle(this.articleId);
      }
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error accessing article data or ID:', error);
    }
    
  }

  // news-article-page.component.ts

  async callForArticle(id: string): Promise<void> {
  try {
    const response = await lastValueFrom(this.adminService.getOneNewsArticle(id));
    this.news = response;
    this.separateParagraphs(this.news.text);
    console.log('Article source URL:', this.news.url);
    this.cdr.detectChanges();
  } catch (error) {
    console.error('Error fetching article:', error);
    // Optionally, re-throw the error if you want the caller to handle it
    // throw error;
  }
  // this.cdr.detectChanges();
}

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('URL after delay:', this.news.url);
      this.cdr.detectChanges();
    }, 1000);
  }

  separateParagraphs(text: string) {
    // console.log(text);
    let wholeText = text;
    let parts = wholeText.split('.');
    for (let i = 0; i < parts.length; i += 2) {
      let part = parts
        .slice(i, i + 2)
        .join('.')
        .trim();
      if (part) this.paragraphs.push(part);
    }
    for (let i = 0; i <= parts.length; i ++) {
      this.paragraphs[i] = parts[i];
      // console.log(this.paragraphs[i]);
    }
    // console.log(this.paragraphs, parts.length);
  }
}
