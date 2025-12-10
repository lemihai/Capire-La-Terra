import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-source',
  imports: [NgOptimizedImage],
  templateUrl: './source.component.html',
  styleUrl: './source.component.scss',
})
export class SourceComponent implements OnInit {
  @Input() source: string = ''; // Default value
  @Input() size?: string = ''; // Default value
  newsSourceImage = ``;
  outletName = '';

  // constructor(
  //   private cdr: ChangeDetectorRef,
  // ) {}

  ngOnInit(): void {
    // console.log(this.source);
    this.source = this.source.replace(' ', '');
    this.defineSource(this.source);
    this.newsSourceImage = `/assets/news_websites_images/${this.outletName}.png`;
    // this.newsSourceImage = `/assets/${this.source}.png`;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.cdr.detectChanges()
  // }

  defineSource(url: string) {
    // console.log(url);
    if (url.includes('aljazeera')) {
      this.outletName = 'aljazeera';
    }
    if (url.includes('cleantechnica')) {
      this.outletName = 'cleantechnica';
    }
    if (url.includes('climatechange')) {
      this.outletName = 'climatechange';
    }
    if (url.includes('euronews')) {
      this.outletName = 'euronews';
    }
    if (url.includes('greenpeace')) {
      this.outletName = 'greenpeace';
    }
    if (url.includes('iea')) {
      this.outletName = 'iea';
    }
    if (url.includes('mongabay')) {
      this.outletName = 'mongabay';
    }
    if (url.includes('nature')) {
      this.outletName = 'nature';
    }
    if (url.includes('guardian')) {
      this.outletName = 'the guardian';
    }
    if (url.includes('woodcentral')) {
      this.outletName = 'woodcentral';
    }
  }
}
