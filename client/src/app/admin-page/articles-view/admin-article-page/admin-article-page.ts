import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin-service';
import { EditBar } from '../../edit-bar/edit-bar';
import { SourceComponent } from '../../../shared/components/source.component/source.component';
import { lastValueFrom } from 'rxjs'; // <-- New Import
import { Article } from '../../service/articles-service/articles-service';
import { ProfileCard } from '../../../shared/components/profile-card/profile-card';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Button } from '../../../shared/buttons/button/button';

@Component({
  selector: 'app-admin-article-page',
  imports: [EditBar, SourceComponent, ProfileCard, NgOptimizedImage, Button],
  templateUrl: './admin-article-page.html',
  styleUrl: './admin-article-page.scss',
})
export class AdminArticlePage {
  articleId: string | null = '';
  editBarComponents: string = 'article-page-view';
  editMode = false;
  editModeFromState: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChildren('textInputField')
  textInputFields!: QueryList<ElementRef>;
  @ViewChild('inputOverlay') inputOverlay!: ElementRef;
  // articleAuthor = '';

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

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
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

  paragraphs: string[] = [];

  article: Article = {
    _id: '',
    title: '',
    date: '',
    author: '',
    url: '',
    imageUrl: '',
    text: [],
    sources: [],
    summary: '',
    posted: false,
  };

  articleArticleText: string[] = [];

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id');

    // let innersource = '';
    if (!this.articleId) {
      // Redirect or handle missing ID
      this.router.navigate(['/admin-page/articles-view']);
      return;
    }
    try {
      this.route.queryParams.subscribe((params) => {
        // Query parameters are always strings, so you must convert 'true'/'false' to boolean
        const editModeParam = params['editMode'];

        // Check if the parameter exists and is explicitly 'true'
        this.editModeFromState = editModeParam === 'true';

        console.log('THIS IS THE EDIT MODE FROM QUERY PARAMS', this.editModeFromState);

        // Now you can safely use the 'this.editMode' property elsewhere.
      });
      const navigation = this.router.getCurrentNavigation();
      let articleData = navigation?.extras.state?.['data'];
      if (articleData != undefined) {
        this.article = articleData;
        // innersource = articleData.url;
      } else {
        this.callForArticle(this.articleId);
      }
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error accessing article data or ID:', error);
    }

    if(this.editModeFromState == true){
      this.editModeFromState = true;
      this.editMode= true;
      this.cdr.detectChanges()
    }
  }

  async callForArticle(id: string): Promise<void> {
    try {
      const response = await lastValueFrom(this.adminService.getOneArticle(id));
      console.log(response);
      this.article = response;
      // this.separateParagraphs(this.article.text);
      console.log('Article source URL:', this.article.url);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching article:', error);
      // Optionally, re-throw the error if you want the caller to handle it
      // throw error;
    }

    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 1000);
  }

  async deleteArticle() {
    try {
      await lastValueFrom(this.adminService.deleteArticle(this.article._id));
      // After successful deletion, navigate back to the articles list
      this.router.navigate(['/admin-page/articles-view']);
    } catch (error) {
      console.error('Error deleting article:', error);
      // Optionally, show an error message to the user
    }
  }

  submitCurrentArticle() {
    this.article.posted = true;
    this.postArticle();
  }

  toggleEditMode() {
    if (this.editMode == false) {
      this.editMode = true;
    } else if ((this.editMode = true)) {
      this.editMode = false;
    }
    console.log(this.editMode);
  }

  saveCurrentArticle() {
    if (this.article.posted == true) {
      this.article.posted = true;
    } else if (this.article.posted == false) {
      this.article.posted = false;
    }
    this.postArticle();
  }

  postArticle() {
    this.formatArticle();
    this.adminService.updateArticle(this.article._id, this.article).subscribe(
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

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
    console.log('fweiuabfueiws');
  }

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
