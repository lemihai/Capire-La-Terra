import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Api } from '../../../environments/api';

@Component({
  selector: 'app-main-view',
  imports: [],
  templateUrl: './main-view.html',
  styleUrl: './main-view.scss',
})
export class MainView implements OnInit, AfterViewInit {
  text: any;
  title: any;
  date: any;
  author: any;
  url: any;
  id: any;

  private api = inject(Api);

  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.api.getArticle().subscribe((data) => {
      let t = data; // Assign the actual data
      this.text = t; // Assign the actual data
      console.log('test', this.text[0].text); // Now logs the API response
    });

    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    let a = this.text;
    this.id = a[0].id;
    this.text = a[0].text;
    this.title = a[0].title;
    this.author = a[0].author;
    this.url = a[0].url;
    this.date = a[0].date;

    this.cdr.detectChanges();
  }

  tt() {
    let a = this.text;
    this.id = a[0].id;
    this.text = a[0].text;
    this.title = a[0].title;
    this.author = a[0].author;
    this.url = a[0].url;
    this.date = a[0].date;
    console.log(this.text, a);
  }
}
