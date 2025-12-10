import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileCard } from '../../../shared/components/profile-card/profile-card';
import { EditBar } from '../../edit-bar/edit-bar';
import { Article, ArticlesService } from '../../service/articles-service/articles-service';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin-service';
import { Button } from '../../../shared/buttons/button/button';
import { last } from 'rxjs';
import { SourceComponent } from '../../../shared/components/source.component/source.component';

@Component({
  selector: 'app-new-article',
  imports: [ProfileCard, EditBar, Button, SourceComponent],
  templateUrl: './new-article.html',
  styleUrls: ['./new-article.scss'],
})
export class NewArticle implements OnInit {
  editBarComponents: string = 'new-article';
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChildren('textInputField')
  textInputFields!: QueryList<ElementRef>;
  @ViewChild('inputOverlay') inputOverlay!: ElementRef;

  @HostListener('keydown', ['$event'])
  handleTabKey(event: KeyboardEvent) {
    this.addSources();
    const focusedElement = document.activeElement;
    const lastInputField = this.textInputFields.last?.nativeElement;
    // console.log(lastInputField);
    // console.log(focusedElement);
    let innerHTML = focusedElement?.textContent;
    // console.log('Focused element:', focusedElement);
    if (event.key === 'Tab') {
      if (focusedElement == lastInputField) {
        // console.log('flag');
        if (focusedElement?.id === 'article-text-field') {
          // console.log('flag 2');
          event.preventDefault();
          this.article.text.push('');

          setTimeout(() => {
            const newLastInputField = this.textInputFields.last?.nativeElement;
            newLastInputField?.focus();
          }, 1);
        }
      }
    }
    if (event.key === 'Backspace') {
      if (focusedElement?.id === 'article-text-field') {
        if (innerHTML === '') {
          // console.log('backspace key pressed');
          this.article.text.pop();
        }
      }
    }
  }

  article: Article = {
    _id: '',
    title: 'This is a title',
    date: '19 Dec 2025',
    author: 'Sofia Lutteri',
    url: '',
    imageUrl: '',
    text: ['This is a paragraph'],
    sources: [],
    summary: '',
    posted: false,
  };

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.myForm = this.fb.group({
      title: [''],
      date: [''],
      author: [''],
      url: [''],
      text: [''],
      sources: [''],
      summary: [''],
    });
  }

  ngOnInit() {
    this.myForm.patchValue(this.article);
    this.article.date = this.getTodayDate();
  }

  updateTitle(event: Event) {
    const newTitle = (event.target as HTMLElement).innerText;
    this.article.title = newTitle;
    this.myForm.get('title')?.setValue(newTitle);
  }

  updateParagraph(event: Event, index: number) {
    const newParagraph = (event.target as HTMLElement).innerText;
    this.article.text[index] = newParagraph;
    this.myForm.get('text')?.setValue(this.article.text);
  }

  getTodayDate() {
    const today = new Date();

    // 2. Extract Year, Month, and Day
    const year = today.getFullYear();
    // Months are 0-indexed (0 = January, 11 = December), so we add 1
    const month = today.toLocaleString('en-US', { month: 'short' });
    const day = today.getDate();

    // 3. Helper function to ensure single digits (1-9) are zero-padded (01-09)
    const pad = (num: number): string => (num < 10 ? '0' + num : String(num));

    let finalDate = `${pad(day)} ${month} ${year}`;
    console.log(finalDate);
    // 4. Combine the parts with the specified separator
    return finalDate;
  }

  submitCurrentArticle() {
    this.article.posted = true;
    this.postArticle();
  }

  saveCurrentArticle() {
    // If the article already has the posted flag up and the person saves, then the flag stays up.
    if (this.article.posted == true) {
      this.article.posted = true;
    } else if (this.article.posted == false) {
      this.article.posted = false;
    }
    this.postArticle();
  }

  postArticle() {
    this.formatArticle();
    this.adminService.postArticle(this.article).subscribe(
      (response) => {
        console.log('Success:', response);
        this.router.navigate(['/admin-page/articles-view']);
      },
      (error) => {
        console.error('Error details:', error);
        if (error.status) {
          console.error('Status:', error.status);
          console.error('Message:', error.message);
        }
        if (error.error) {
          console.error('Backend error:', error.error);
        }
      }
    );
  }

  formatArticle() {
    let array = this.article.text;
    console.log(array);

    // Filter out empty strings
    array = array.filter((element: string) => element !== '');

    this.article.text = array;
  }

  switchFlag() {
    if (this.article.posted == true) {
      this.article.posted = false;
    } else if (this.article.posted == false) {
      this.article.posted = true;
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
    console.log('fweiuabfueiws');
  }

  // Image upload

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(file);

      // Read the file as a Data URL for an immediate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.article.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.cdr.detectChanges();

      // Optionally, send the file to a backend service for permanent storage
      // this.uploadService.uploadImage(file).subscribe(imageUrl => this.article.imageUrl = imageUrl);
    }
    setTimeout(() => {
      this.inputOverlay.nativeElement.style.bottom = '1.2rem';
      this.cdr.detectChanges();
    }, 1600);
  }

  addSources() {
    let fullText = this.article.text.join(' ');
    console.log(fullText);

    if (fullText.toLowerCase().includes('aljazera') && !this.article.sources.includes('aljazera')) {
      this.article.sources.push('aljazera');
    }
    if (
      fullText.toLowerCase().includes('cleantechnica') &&
      !this.article.sources.includes('cleantechnica')
    ) {
      this.article.sources.push('cleantechnica');
    }
    if (
      fullText.toLowerCase().includes('climatechange') &&
      !this.article.sources.includes('climatechange')
    ) {
      this.article.sources.push('climatechange');
    }
    if (fullText.toLowerCase().includes('euronews') && !this.article.sources.includes('euronews')) {
      this.article.sources.push('euronews');
    }
    if (
      fullText.toLowerCase().includes('greenpeace') &&
      !this.article.sources.includes('greenpeace')
    ) {
      this.article.sources.push('greenpeace');
    }
    if (fullText.toLowerCase().includes('iea') && !this.article.sources.includes('iea')) {
      this.article.sources.push('iea');
    }
    if (fullText.toLowerCase().includes('mongabay') && !this.article.sources.includes('mongabay')) {
      this.article.sources.push('mongabay');
    }
    if (fullText.toLowerCase().includes('nature') && !this.article.sources.includes('nature')) {
      this.article.sources.push('nature');
    }
    if (
      fullText.toLowerCase().includes('the guardian') &&
      !this.article.sources.includes('the guardian')
    ) {
      this.article.sources.push('the guardian');
    }
    if (
      fullText.toLowerCase().includes('woodcentral') &&
      !this.article.sources.includes('woodcentral')
    ) {
      this.article.sources.push('woodcentral');
    }
  }

  // ... (inside NewArticle class)

  removeImage() {
    // 1. Reset the imageUrl property
    this.article.imageUrl = '';

    // 2. Reset the file input element so the same file can be selected again
    // The ViewChild reference is 'fileInput'
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = null;
    }

    // 3. (Optional) Reset the position of the input overlay
    // The ViewChild reference is 'inputOverlay'
    if (this.inputOverlay && this.inputOverlay.nativeElement) {
      this.inputOverlay.nativeElement.style.bottom = '3.2rem'; // Or whatever value hides it
    }

    // 4. Force change detection to update the view immediately
    this.cdr.detectChanges();
    console.log('Image removed.');
  }
}
