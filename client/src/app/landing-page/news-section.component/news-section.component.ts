import { Component, inject, Input, OnInit } from '@angular/core';
import { NewsCardComponent } from '../../shared/components/news-card.component/news-card.component';
import { Article } from '../../news-page/article-page/article-page';
import { ArticlesService } from '../../../services/articles-service/articles-service';

@Component({
  selector: 'app-news-section',
  imports: [NewsCardComponent],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.scss',
})
export class NewsSectionComponent implements OnInit {
  @Input() article: Article = {
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

  private articlesService = inject(ArticlesService);

  articles: any = [];

  ngOnInit() {
    this.articlesService.getAllArticles().subscribe((data) => {
      // let dataList = data;
      //  for (const article of data){
        //   console.log(data);
        //  }
        //  for(const a of data ){
          //   console.log(a);
          //  }
          // this.articles = [...data];
          this.articles = data;
      // this.sorting.sortedListView = [...this.articles];
      // this.sort('date');
      // this.cdr.detectChanges(); // Manually trigger change detection if needed
    });
  }
}
