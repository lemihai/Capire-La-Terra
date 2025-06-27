import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { LandingPage } from './landing-page/landing-page';
import { AboutUs } from './about-us/about-us';

export const routes: Routes = [
    { path: '', component: LandingPage, title: 'Home Page' },
    { path: 'login', component: LoginPage, title: 'Login Page' },
    { path: 'admin', component: AdminDashboard, title:'Admin Page' },
    { path: 'about-us', component: AboutUs, title:'About Us Page' }
];