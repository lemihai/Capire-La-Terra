import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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

  @Output() navigateToArticle = new EventEmitter<{ id: string; article: Article }>();
  @Output() submitArticle = new EventEmitter<any>();
  @Output() editArticle = new EventEmitter<any>();
  @Output() deleteArticle = new EventEmitter<any>();

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
    // console.log('OFIRNEBJUVI', this.date);

    this.cdr.detectChanges();

    // console.log(this.article);
  }

  ngAfterViewInit(): void {}

  navigateToArticlePage(event: MouseEvent) {
    event.stopPropagation();
    this.navigateToArticle.emit({ id: this.article._id, article: this.article });
  }

  postClickedArticle(event: MouseEvent) {
    this.submitArticle.emit();
  }

  editClickedArticle(event: MouseEvent) {
    this.editArticle.emit();
  }

  deleteClickedArticle(event: MouseEvent) {
    this.deleteArticle.emit();
  }
}
