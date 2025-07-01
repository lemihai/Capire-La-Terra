import { Component } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { LandingPage } from './landing-page/landing-page';
import { LoginPage } from './login-page/login-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AboutUs } from './about-us/about-us';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'client';
}
