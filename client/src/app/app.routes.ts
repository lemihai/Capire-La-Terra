import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { EpisodesPage } from './episodes-page/episodes-page';
import { NewsPage } from './news-page/news-page';
import { Component } from '@angular/core';
import { LoginPage } from './login-page/login-page';


export const routes: Routes = [
  { path: '', component: LandingPage, title: 'Home Page' },
  { path: 'episodes-page', component: EpisodesPage, title: 'Episodes Page' },
  { path: 'news-page', component: NewsPage, title: 'News Page' },
  { path: 'login-page', component: LoginPage, title: 'Login Page' },
];
