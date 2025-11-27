import { Component, Input } from '@angular/core';
import { ProfileCard } from '../profile-card/profile-card';
import { SourceComponent } from '../source.component/source.component';
import { Router } from '@angular/router';

export interface Article {
  _id: string;
  url: string;
  title: string;
  author: string;
  date: string;
  text: string;
  // source: string;
  summary: string;
}

@Component({
  selector: 'app-news-card',
  imports: [ProfileCard, SourceComponent],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  @Input() article!: Article;

  @Input() cardType: string = ''; // Default value
  @Input() cardDirection: string = ''; // Default value

  articles: Article[] = [
    {
      _id: '3243223', // Changed from `id` to `_id` and made it a string
      url: 'https://example.com/article1', // Added `url`
      title: 'This is an article example', // Changed from `name` to `title`
      author: 'Sofia', // Added `author`
      date: '2025-11-26', // Added `date`
      text: "Ecco il pilot del nostro podcast, oggi parliamo,  in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.", // Changed from `description` to `text`
      summary:
        'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,', // Added `summary`
    },
  ];

  constructor(private router: Router) {}

  /**
   * Handles navigation when the card is clicked.
   * Navigates to the Article Detail page using the article's unique ID (_id).
   */
  navigateToArticle(): void {
    // Check if the article data is available before navigating
    // if (this.article && this.article._id) {
      // The path should match your configured route for the article detail page,
      // e.g., defined as: { path: 'article/:id', component: ArticleDetailComponent }
      this.router.navigate(['/article-page']);

      // Optional: If you want to navigate to the external URL:
      // window.open(this.article.url, '_blank');
    // } else {
    //   console.error('Cannot navigate: Article ID is missing.');
    // }
  }
  //   const person = {
  //   firstName: "John",
  //   lastName: "Doe",
  //   age: 30,
  //   greet: function() {
  //     console.log("Hello, " + this.firstName);
  //   }
  // };
}
