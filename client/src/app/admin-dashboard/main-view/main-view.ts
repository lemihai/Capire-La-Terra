import { Component } from '@angular/core';
import { EpisodeComponent } from '../episodes-view/episode-component/episode-component';
import { Article } from '../news-view/article/article';
import { RobotsComponent } from '../robots-view/robots-component/robots-component';

@Component({
  selector: 'app-main-view',
  imports: [Article, RobotsComponent, EpisodeComponent],
  templateUrl: './main-view.html',
  styleUrl: './main-view.scss'
})
export class MainView {

}
