import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
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
  @Output() deleteArticle = new EventEmitter<any>();

  @Output() submitEpisode = new EventEmitter<any>();
  @Output() saveEpisode = new EventEmitter<any>();
  @Output() deleteEpisode = new EventEmitter<any>();

  @Output() switchFlagEvent = new EventEmitter<any>();
  @Output() editModeEmitter = new EventEmitter<any>();

  @Output() episodeDetailsUpdated = new EventEmitter<{ season: number; number: number }>();

  @ViewChild('episodeSeasonInputField') seasonInputRef!: ElementRef;
  @ViewChild('episodeNumbersInputField') numberInputRef!: ElementRef;

  editMode = 'hidden';
  editModeArticleStatus = 'statusNoEdit';
  seasonEditMode = false;
  numberEditMode = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {


    // USE THIS TO PASS INTO THE BUTTON
    this.route.queryParams.subscribe((params) => {
      // Query parameters are always strings, so you must convert 'true'/'false' to boolean
      const editModeParam = params['editMode'];

      // Check if the parameter exists and is explicitly 'true'
      let editModeFromState = editModeParam === 'true';
      this.externalEditActivation = editModeFromState;



      // Now you can safely use the 'this.editMode' property elsewhere.
    });
  }

  ngOnChanges(changes: SimpleChanges) {



    if (this.externalEditActivation == true) {
      this.editMode = 'editMode';
      this.editModeArticleStatus = '';
    } else if (this.externalEditActivation == false) {
      this.editMode = 'hidden';
      this.editModeArticleStatus = 'statusNoEdit';
    }

  }

  navigateToPage() {

    window.open(this.componentData?.url, '_blank');
  }

  // --------------------------
  // ARTICLES
  // --------------------------

  deleteCurrentArticle() {
    this.router.navigate(['/admin-page/news-view']);
    if (this.mode === 'news-article') {
      if (this.componentData?._id) {
        this.adminService.deleteOneNewsArticle(this.componentData?._id).subscribe(
          (response) => {

          },
          (error) => {
            // Error: Handle the error (e.g., show an error message)
            console.error('Error deleting article:', error);
            alert(`Failed to delete article: ${error.message || error}`);
          }
        );
      }

    }
  }

  onDeleteArticle() {
    this.deleteArticle.emit();
  }

  submitCurrentArticle() {

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

  emitEpisodeDetails() {
    const seasonValue = this.seasonInputRef?.nativeElement?.textContent;
    const numberValue = this.numberInputRef?.nativeElement?.textContent;

    this.episodeDetailsUpdated.emit({
      season: seasonValue,
      number: numberValue,
    });
  }

  toggleEditMode(field: 'season' | 'number') {
    const HTMLSeasonEl = this.seasonInputRef?.nativeElement;
    const HTMLNumberEl = this.numberInputRef?.nativeElement;
    // HTMLSeasonEl.preventDefault();
    // HTMLNumberEl.preventDefault();
    if (field === 'season') {
      // Toggle the season field
      this.seasonEditMode = !this.seasonEditMode;

      HTMLSeasonEl?.focus();
      this.numberEditMode = false;
    } else if (field === 'number') {
      // Toggle the number field
      this.numberEditMode = !this.numberEditMode;
      HTMLNumberEl?.focus();
    }
  }

  // --------------------------
  // Episodes
  // --------------------------

  onDeleteEpisode() {
    this.deleteEpisode.emit();
  }

  submitCurrentEpisode() {
    this.submitEpisode.emit();
  }

  saveCurrentEpisode() {
    this.saveEpisode.emit();
  }
}
