import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Button } from '../../shared/buttons/button/button';
import { News } from '../service/news-service/news-service';
import { AdminService } from '../service/admin-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-bar',
  imports: [Button],
  templateUrl: './edit-bar.html',
  styleUrl: './edit-bar.scss',
})
export class EditBar implements OnInit, OnChanges {
  @Input() mode?: string;
  @Input() componentId?: string;
  @Input() componentData?: any;
  @Input() componentActions?: any;
  @Input() externalEditActivation?: boolean;

  @Output() submitArticle = new EventEmitter<any>();
  @Output() saveArticle = new EventEmitter<any>();
  @Output() switchFlagEvent = new EventEmitter<any>();
  @Output() deleteArticle = new EventEmitter<any>();
  @Output() editModeEmitter = new EventEmitter<any>();

  editMode = 'hidden';
  editModeArticleStatus = 'statusNoEdit'

  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.externalEditActivation);

    // USE THIS TO PASS INTO THE BUTTON
    this.route.queryParams.subscribe((params) => {
        // Query parameters are always strings, so you must convert 'true'/'false' to boolean
        const editModeParam = params['editMode'];

        // Check if the parameter exists and is explicitly 'true'
        let editModeFromState = editModeParam === 'true';
        this.externalEditActivation = editModeFromState

        console.log('IN EDIT BAR QUERY ', this.externalEditActivation);

        // Now you can safely use the 'this.editMode' property elsewhere.
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(348778, this.externalEditActivation);
    // this.triggerEditMode();

    if (this.externalEditActivation == true) {
      this.editMode = 'editMode';
      this.editModeArticleStatus = '';
    } else if (this.externalEditActivation == false) {
      this.editMode = 'hidden';
      this.editModeArticleStatus = 'statusNoEdit';
    }

    // if (changes['componentData']) {
    //   // console.log('componentData changed:', this.componentData);
    //   // React to changes here (e.g., update internal state)
    // }
    // if (changes['externalEditActivation']) {
    //   console.log('event received');
    //   this.triggerEditMode();
    // }
  }

  navigateToPage() {
    // console.log('IURBVEIUBERV');
    window.open(this.componentData?.url, '_blank');
  }

  deleteCurrentArticle() {
    this.router.navigate(['/admin-page/news-view']);
    if (this.mode === 'news-article') {
      if (this.componentData?._id) {
        this.adminService.deleteOneNewsArticle(this.componentData?._id).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            // Error: Handle the error (e.g., show an error message)
            console.error('Error deleting article:', error);
            alert(`Failed to delete article: ${error.message || error}`);
          }
        );
      }
      console.log('nom nom', this.mode);
    }
  }

  onDeleteArticle() {
    this.deleteArticle.emit();
  }

  submitCurrentArticle() {
    console.log('works');
    this.submitArticle.emit();
  }

  saveCurrentArticle() {
    this.saveArticle.emit();
  }

  switchFlag() {
    this.switchFlagEvent.emit();
  }

  triggerEditMode() {
    this.editModeEmitter.emit();
    if (this.editMode == 'hidden') {
      this.editMode = 'editMode';
      this.editModeArticleStatus = '';
    } else if (this.editMode == 'editMode') {
      this.editMode = 'hidden';
      this.editModeArticleStatus = 'statusNoEdit';
    }
  }
}
