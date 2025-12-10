import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
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
import { Button } from "../../../shared/buttons/button/button";

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
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChildren('textInputField')
  textInputFields!: QueryList<ElementRef>;
  @ViewChild('inputOverlay') inputOverlay!: ElementRef;
  // articleAuthor = '';

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
