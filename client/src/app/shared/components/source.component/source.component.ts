import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-source',
  imports: [NgOptimizedImage],
  templateUrl: './source.component.html',
  styleUrl: './source.component.scss'
})
export class SourceComponent {
  @Input() source: string = ''; // Default value
}
