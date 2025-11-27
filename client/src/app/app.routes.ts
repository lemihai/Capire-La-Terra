import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { EpisodesPage } from './episodes-page/episodes-page';
import { NewsPage } from './news-page/news-page';
import { Component } from '@angular/core';
import { LoginPage } from './login-page/login-page';
import { AdminPage } from './admin-page/admin-page';
import { ArticlePage } from './news-page/article-page/article-page';

export const routes: Routes = [
  { path: '', component: LandingPage, title: 'Home' },
  { path: 'episodes-page', component: EpisodesPage, title: 'Episodes' },
  { path: 'news-page', component: NewsPage, title: 'News' },
  { path: 'article-page', component: ArticlePage, title: 'Article'},
  { path: 'login-page', component: LoginPage, title: 'Login' },
  { path: 'admin-page', component: AdminPage, title: 'Admin' },
];
