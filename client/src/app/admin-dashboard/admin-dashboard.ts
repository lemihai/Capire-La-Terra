import { Component } from '@angular/core';
import { EpisodesView } from './episodes-view/episodes-view';
import { MainView } from './main-view/main-view';
import { NewsView } from './news-view/news-view';
import { RobotsView } from './robots-view/robots-view';
import { Settings } from './settings/settings';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [EpisodesView, MainView, NewsView, RobotsView, Settings, RouterOutlet, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {

}
