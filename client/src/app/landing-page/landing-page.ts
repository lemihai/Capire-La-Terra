import { Component } from '@angular/core';
import { Background } from './background/background';
import { IntroText } from './intro-text/intro-text';

@Component({
  selector: 'app-landing-page',
  imports: [Background, IntroText],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

}
