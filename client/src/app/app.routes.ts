import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { EpisodesPage } from './episodes-page/episodes-page';
import { NewsPage } from './news-page/news-page';
import { Component } from '@angular/core';
import { LoginPage } from './login-page/login-page';
import { AdminPage } from './admin-page/admin-page';
import { ArticlePage } from './news-page/article-page/article-page';
import { MainView } from './admin-page/main-view/main-view';
import { EpisodesView } from './admin-page/episodes-view/episodes-view';
import { NewsView } from './admin-page/news-view/news-view';
import { RobotsView } from './admin-page/robots-view/robots-view';
import { Settings } from './admin-page/settings/settings';
import { ArticlesView } from './admin-page/articles-view/articles-view';
import { NewsArticlePage } from './admin-page/news-view/news-article-page/news-article-page';
import { ArticleCard } from './admin-page/articles-view/article-card/article-card';
import { NewArticle } from './admin-page/articles-view/new-article/new-article';
import { NewEpisode } from './admin-page/episodes-view/new-episode/new-episode/new-episode';
import { AdminArticlePage } from './admin-page/articles-view/admin-article-page/admin-article-page';
import { AdminEpisodeView } from './admin-page/episodes-view/admin-episode-view/admin-episode-view';

export const routes: Routes = [
  { path: '', component: LandingPage, title: 'Home' },
  { path: 'episodes-page', component: EpisodesPage, title: 'Episodes' },
  { path: 'news-page', component: NewsPage, title: 'News' },
  { path: 'article-page', component: ArticlePage, title: 'Article' },
  { path: 'login-page', component: LoginPage, title: 'Login' },
  {
    path: 'admin-page',
    component: AdminPage,
    title: 'Admin',
    children: [
      {
        path: '',
        component: MainView,
        title: 'Admin-dashboad',
      },
      {
        path: 'episodes-view',
        title: 'Episodes-view',
        children: [
          {
            path: '',
            component: EpisodesView,
            title: 'episodes-list',
          },
          {
            path: 'episode-page',
            component: AdminEpisodeView,
            title: 'episode-page',
          },
          {
            path: 'new-episode',
            component: NewEpisode,
            title: 'new-episode',
          },
        ],
      },
      {
        path: 'news-view',
        title: 'News-view',
        children: [
          {
            path: '', // The main News list view (e.g., /admin-page/news-view)
            component: NewsView, // Now NewsView is treated as a child
            title: 'News-list',
          },
          {
            // The News Article view (e.g., /admin-page/news-view/article/123)
            // Note: I renamed the path for clarity, but you can keep 'news-article-view/:id'
            path: 'news-article-view/:id',
            component: NewsArticlePage, // NewsArticlePage replaces NewsView here
            title: 'News-article-view',
          },
        ],
      },
      {
        path: 'articles-view',
        title: 'Articles-view',
        children: [
          {
            path: '',
            component: ArticlesView,
            title: 'article',
          },
          {
            path: 'admin-article-page',
            component: AdminArticlePage,
            title: 'article-page',
          },
          {
            path: '',
            component: NewArticle,
            title: 'new-article',
          },
        ],
      },
      {
        path: 'robots-view',
        component: RobotsView,
        title: 'Robots-view',
      },
      {
        path: 'settings',
        component: Settings,
        title: 'Settings-view',
      },
    ],
  },
];
