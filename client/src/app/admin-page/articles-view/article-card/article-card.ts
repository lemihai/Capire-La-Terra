import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Article, ArticlesService } from '../../service/articles-service/articles-service';
import { SourceComponent } from '../../../shared/components/source.component/source.component';
import { ProfileCard } from '../../../shared/components/profile-card/profile-card';
import { AdminService } from '../../service/admin-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  imports: [SourceComponent, ProfileCard],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard implements OnInit, AfterViewInit {
  @Input() article!: Article;

  constructor(
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private router: Router
  ) {}

  date = '';

  ngOnInit(): void {
    let date = new Date(this.article.date);
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    this.date = day + '-' + month + '-' + year;
    console.log('OFIRNEBJUVI', this.date);

    this.cdr.detectChanges();

    console.log(this.article);
  }

  ngAfterViewInit(): void {}

  navigateToArticlePage() {
    this.adminService.triggerViewChange('admin-article-page', 'articles-view');
  }

  deleteArticle() {
    console.log('WORKS');
    console.log(this.article._id);
    this.adminService.deleteArticle(this.article._id).subscribe(
      (response) => {
        console.log('Article deleted successfully', response);
      },
      (error) => {
        console.error('Error deleting article', error);
      }
    );
  }
}
