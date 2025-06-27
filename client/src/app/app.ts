import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AboutUs } from './about-us/about-us';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'client';
}
