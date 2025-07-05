import { Component } from '@angular/core';
import { Article } from './article/article';

@Component({
  selector: 'app-news-view',
  imports: [Article],
  templateUrl: './news-view.html',
  styleUrl: './news-view.scss'
})
export class NewsView {

}
