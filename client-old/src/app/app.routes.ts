import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { LandingPage } from './landing-page/landing-page';
import { AboutUs } from './about-us/about-us';
import { LatestNewsPage } from './latest-news-page/latest-news-page';

// Routes of the main page view
import { MainView } from './admin-dashboard/main-view/main-view';
import { NewsView } from './admin-dashboard/news-view/news-view';
import { RobotsView } from './admin-dashboard/robots-view/robots-view';
import { Settings } from './admin-dashboard/settings/settings';
import { EpisodesView } from './admin-dashboard/episodes-view/episodes-view';

export const routes: Routes = [
  { path: '', component: LandingPage, title: 'Home Page' },
  { path: 'latest-news', component: LatestNewsPage, title: 'Latest News' },
  { path: 'login', component: LoginPage, title: 'Login Page' },
  { path: 'about-us', component: AboutUs, title: 'About Us Page' },
  {
    path: 'admin',
    component: AdminDashboard,
    title: 'Admin Page',
    children: [
      {
        path: 'admin-dashboard',
        component: MainView,
        title: 'Admin-dashboad',
      },
      {
        path: 'episodes-view',
        component: EpisodesView,
        title: 'Episodes-view',
      },
      {
        path: 'news-view',
        component: NewsView,
        title: 'News-view-page',
      },
      {
        path: 'robots-view',
        component: RobotsView,
        title: 'Robots',
      },
      {
        path: 'settings',
        component: Settings,
        title: 'Settings',
      },
    ],
  },
];
