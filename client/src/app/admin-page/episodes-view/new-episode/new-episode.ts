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
import { Episode } from '../../service/episodes-service/episodes-service';
import { ProfileCard } from '../../../shared/components/profile-card/profile-card';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Button } from '../../../shared/buttons/button/button';
import { AudioPlayer } from '../../../shared/components/audio-player/audio-player';
import { EpisodeCard } from '../../../shared/components/episode-card/episode-card';
import { AudioTrack } from '../../../shared/components/audio-track/audio-track';
import { PlayButton } from '../../../shared/buttons/play-button/play-button';
import { GlobalAudioPlayerService } from '../../../global-audio-player.component/global-audio-player-service';
import { GlobalAudioPlayerComponent } from '../../../global-audio-player.component/global-audio-player.component';

@Component({
  selector: 'app-new-episode',
  imports: [
    EditBar,
    SourceComponent,
    ProfileCard,
    NgOptimizedImage,
    Button,
    AudioPlayer,
    EpisodeCard,
    AudioTrack,
    PlayButton,
  ],
  templateUrl: './new-episode.html',
  styleUrl: './new-episode.scss',
})
export class NewEpisode {
  episodeId: string | null = '';
  editBarComponents: string = 'new-episode';
  editMode = true;
  editModeFromState: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChildren('textInputField')
  textInputFields!: QueryList<ElementRef>;
  @ViewChild('audioFileInput') audioFileInput!: ElementRef;
  @ViewChild('audioInputOverlay') audioInputOverlay!: ElementRef;
  @ViewChild('inputOverlay') inputOverlay!: ElementRef;
  // episodeAuthor = '';

  authorShow = 'Sofia Lutteri';

  @HostListener('keydown', ['$event'])
  handleTabKey(event: KeyboardEvent) {
    this.addSources();
    const focusedElement = document.activeElement;
    const lastInputField = this.textInputFields.last?.nativeElement;
    //
    //
    let innerHTML = focusedElement?.textContent;
    //
    if (event.key === 'Tab') {
      if (focusedElement == lastInputField) {
        //
        if (focusedElement?.id === 'episode-text-field') {
          //
          event.preventDefault();
          this.episode.about.push('');

          setTimeout(() => {
            const newLastInputField = this.textInputFields.last?.nativeElement;
            newLastInputField?.focus();
          }, 1);
        }
      }
    }
    if (event.key === 'Backspace') {
      if (focusedElement?.id === 'episode-text-field') {
        if (innerHTML === '') {
          //
          this.episode.about.pop();
        }
      }
    }
  }

  addSources() {
    let fullText = this.episode.about.join(' ');
    // let fullText = this.episode.about;

    if (fullText.toLowerCase().includes('aljazera') && !this.episode.sources.includes('aljazera')) {
      this.episode.sources.push('aljazera');
    }
    if (
      fullText.toLowerCase().includes('cleantechnica') &&
      !this.episode.sources.includes('cleantechnica')
    ) {
      this.episode.sources.push('cleantechnica');
    }
    if (
      fullText.toLowerCase().includes('climatechange') &&
      !this.episode.sources.includes('climatechange')
    ) {
      this.episode.sources.push('climatechange');
    }
    if (fullText.toLowerCase().includes('euronews') && !this.episode.sources.includes('euronews')) {
      this.episode.sources.push('euronews');
    }
    if (
      fullText.toLowerCase().includes('greenpeace') &&
      !this.episode.sources.includes('greenpeace')
    ) {
      this.episode.sources.push('greenpeace');
    }
    if (fullText.toLowerCase().includes('iea') && !this.episode.sources.includes('iea')) {
      this.episode.sources.push('iea');
    }
    if (fullText.toLowerCase().includes('mongabay') && !this.episode.sources.includes('mongabay')) {
      this.episode.sources.push('mongabay');
    }
    if (fullText.toLowerCase().includes('nature') && !this.episode.sources.includes('nature')) {
      this.episode.sources.push('nature');
    }
    if (
      fullText.toLowerCase().includes('the guardian') &&
      !this.episode.sources.includes('the guardian')
    ) {
      this.episode.sources.push('the guardian');
    }
    if (
      fullText.toLowerCase().includes('woodcentral') &&
      !this.episode.sources.includes('woodcentral')
    ) {
      this.episode.sources.push('woodcentral');
    }
  }

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private globalPlayer: GlobalAudioPlayerService,
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

  episode: Episode = {
    // _id: '',
    title: 'This is a title',
    about: ['Write you description here', 'add sources'],
    author: 'Sofia Lutteri',
    date: '',
    number: 0,
    season: 0,
    imageUrl: '',
    audioUrl: '',
    sources: [],
    transcript: '',
    posted: false,
  };

  // test = 'Briana Cirstea';

  episodeText: string[] = [];

  ngOnInit() {
    this.myForm.patchValue(this.episode);
    this.episode.date = this.getTodayDate();
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

    // 4. Combine the parts with the specified separator
    return finalDate;
  }

  async callForEpisode(id: string): Promise<void> {
    try {
      const response = await lastValueFrom(this.adminService.getOneEpisode(id));

      this.episode = response;
      // this.separateParagraphs(this.episode.text);

      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching episode:', error);
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

  async deleteEpisode() {
    try {
      if (this.episode._id) {
        await lastValueFrom(this.adminService.deleteEpisode(this.episode._id));
      }
      // After successful deletion, navigate back to the episodes list
      this.router.navigate(['/admin-page/episodes-view']);
    } catch (error) {
      console.error('Error deleting episode:', error);
      // Optionally, show an error message to the user
    }
  }

  submitCurrentEpisode() {
    this.episode.posted = true;
    this.postEpisode();
  }

  toggleEditMode() {
    if (this.editMode == false) {
      this.editMode = true;
    } else if ((this.editMode = true)) {
      this.editMode = false;
    }
  }

  updateEpisodeDetails(details: { season: number; number: number }) {
    this.episode.season = Number(details.season);
    this.episode.number = Number(details.number);

    // You might want to force change detection if the display is not updating,
    // although for simple property updates it's usually automatic.
    this.cdr.detectChanges();
  }

  saveCurrentEpisode() {
    if (this.episode.posted == true) {
      this.episode.posted = true;
    } else if (this.episode.posted == false) {
      this.episode.posted = false;
    }
    this.postEpisode();
  }

  postEpisode() {
    this.formatEpisode();
    this.adminService.postEpisode(this.episode).subscribe(
      (response) => {
        this.router.navigate(['/admin-page/episodes-view']);
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
      },
    );
  }

  formatEpisode() {
    let array = this.episode.about;

    // Filter out empty strings
    array = array.filter((element: string) => element !== '');

    this.episode.about = array;
  }

  switchFlag() {
    if (this.episode.posted == true) {
      this.episode.posted = false;
    } else if (this.episode.posted == false) {
      this.episode.posted = true;
    }
  }

  updateTitle(event: Event) {
    const newTitle = (event.target as HTMLElement).innerText;
    this.episode.title = newTitle;
    this.myForm.get('title')?.setValue(newTitle);
  }

  updateParagraph(event: Event, index: number) {
    const newParagraph = (event.target as HTMLElement).innerText;
    this.episode.about[index] = newParagraph;
    this.myForm.get('text')?.setValue(this.episode.about);
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  triggerAudioFileInput(): void {
    this.audioFileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Read the file as a Data URL for an immediate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.episode.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.cdr.detectChanges();

      // Optionally, send the file to a backend service for permanent storage
      // this.uploadService.uploadImage(file).subscribe(imageUrl => this.episode.imageUrl = imageUrl);
    }
    setTimeout(() => {
      this.inputOverlay.nativeElement.style.bottom = '1.2rem';
      this.cdr.detectChanges();
    }, 1600);
  }

  onAudioFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Check if the file is indeed an audio file
      if (file.type.startsWith('audio/')) {
        // Read the file as a Data URL for immediate use/preview
        const reader = new FileReader();
        //
        reader.onload = () => {
          // Assign to the audioUrl property
          this.episode.audioUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
        this.cdr.detectChanges();
      } else {
        console.error('Selected file is not an audio file.');
      }
    }

    // Optional: Update the visual state of the overlay after selection (if you keep the overlay logic)
    setTimeout(() => {
      if (this.audioInputOverlay) {
        this.audioInputOverlay.nativeElement.style.bottom = '1.2rem';
      }
      this.cdr.detectChanges();
    }, 1600);
  }

  removeImage() {
    // 1. Reset the imageUrl property
    this.episode.imageUrl = '';

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
  }

  removeAudio() {
    // 1. Reset the imageUrl property
    this.episode.audioUrl = '';

    // 2. Reset the file input element so the same file can be selected again
    // The ViewChild reference is 'fileInput'
    if (this.audioFileInput && this.audioFileInput.nativeElement) {
      this.audioFileInput.nativeElement.value = null;
    }

    // 3. (Optional) Reset the position of the input overlay
    // The ViewChild reference is 'inputOverlay'
    if (this.audioInputOverlay && this.audioInputOverlay.nativeElement) {
      this.audioInputOverlay.nativeElement.style.bottom = '3.2rem'; // Or whatever value hides it
    }

    // 4. Force change detection to update the view immediately
    this.cdr.detectChanges();
  }

  playEpisode() {
    this.globalPlayer.playEpisode(this.episode);
  }

  changeAuthor() {
    console.log('test');
    if (this.authorShow === 'Sofia Lutteri') {
      this.authorShow = 'Briana Cirstea';
      this.episode.author = 'Briana Cirstea';
      this.myForm.patchValue({
        author: this.authorShow,
      });
      // this.myForm.controls['author'].value = 'Briana Cirstea';
    } else if (this.authorShow === 'Briana Cirstea') {
      this.authorShow = 'Sofia Lutteri';
      this.episode.author = 'Sofia Lutteri';
      this.myForm.patchValue({
        author: this.authorShow,
      });
    }
    console.log(this.episode.author);
    console.log(this.myForm);
    console.log(99, this.myForm.controls['author'].value);
  }
}
