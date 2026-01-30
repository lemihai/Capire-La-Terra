import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
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
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-episode-view',
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
  templateUrl: './admin-episode-view.html',
  styleUrl: './admin-episode-view.scss',
})
export class AdminEpisodeView implements OnChanges, OnInit, AfterViewInit {
  episodeId: string | null = '';
  editBarComponents: string = 'episode-page-view';
  editMode = false;
  editModeFromState: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChildren('textInputField')
  textInputFields!: QueryList<ElementRef>;
  @ViewChild('audioFileInput') audioFileInput!: ElementRef;
  @ViewChild('audioInputOverlay') audioInputOverlay!: ElementRef;
  @ViewChild('inputOverlay') inputOverlay!: ElementRef;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  // episodeAuthor = '';

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  duration = {
    initial: 0,
    minutes: '00',
    seconds: '00',
  };

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
        if (focusedElement?.id === 'episode-text-field') {
          // console.log('flag 2');
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
          // console.log('backspace key pressed');
          this.episode.about.pop();
        }
      }
    }
  }

  addSources() {
    let fullText = this.episode.about.join(' ');
    // let fullText = this.episode.about;
    // console.log(fullText);

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
    // private router: Router,
    // private route: ActivatedRoute,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private globalPlayer: GlobalAudioPlayerService
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
    _id: '',
    title: '',
    about: [''],
    author: '',
    date: '',
    number: 0,
    season: 0,
    imageUrl: '',
    audioUrl: '',
    sources: [],
    transcript: '',
    posted: false,
  };

  episodeText: string[] = [];

  readonly navigationState = computed(() => {
    const nav = this.router.currentNavigation();
    return nav?.extras.state as { editMode: any; data: any } | undefined;
  });

  private queryParams = toSignal(this.route.queryParamMap);

  ngOnInit() {
    this.episodeId = this.route.snapshot.paramMap.get('id');
    // const state = this.navigationState();
    // const navigation = this.router.getCurrentNavigation();
    // console.log(99, this.route);

    // let innersource = '';
    if (!this.episodeId) {
      // Redirect or handle missing ID
      this.router.navigate(['/admin-page/episodes-view']);
      return;
    }

    this.route.queryParams.subscribe((params) => {
      const editModeParam = params['editMode'];
      // Convert string 'true' to boolean true
      this.editMode = editModeParam === 'true';
      this.editModeFromState = this.editMode;

      // console.log('Edit Mode sync from URL:', params);
      this.cdr.detectChanges();
    });

    try {
      // this.route.queryParams.subscribe((params) => {
      //   // Query parameters are always strings, so you must convert 'true'/'false' to boolean
      //   const editModeParam = params['editMode'];

      //   // Check if the parameter exists and is explicitly 'true'
      //   this.editModeFromState = editModeParam === 'true';

      //   console.log('THIS IS THE EDIT MODE FROM QUERY PARAMS', this.editModeFromState);

      //   // Now you can safely use the 'this.editMode' property elsewhere.
      // });
      const navigation = this.router.getCurrentNavigation();
      let episodeData = navigation?.extras.state?.['data'];

      
      if (episodeData != undefined) {
        this.episode = episodeData;
        // innersource = episodeData.url;
      } else {
        this.callForEpisode(this.episodeId);
      }
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error accessing episode data or ID:', error);
    }

    if (this.editModeFromState == true) {
      this.editModeFromState = true;
      this.editMode = true;
      this.cdr.detectChanges();
    }
  }

  async callForEpisode(id: string): Promise<void> {
    try {
      const response = await lastValueFrom(this.adminService.getOneEpisode(id));
      // console.log(response);
      this.episode = response;
      // this.separateParagraphs(this.episode.text);
      // console.log('episode source URL:', this.episode);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching episode:', error);
      // Optionally, re-throw the error if you want the caller to handle it
      // throw error;
    }

    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    const audioElement = this.audioPlayer.nativeElement;
    console.log('&&&&&');
    console.log(audioElement);
    console.log('&&&&&');

    audioElement.addEventListener('loadedmetadata', () => {
      this.duration.initial = audioElement.duration;
      this.formatDuration(audioElement.duration, this.duration);
      this.cdr.detectChanges();
    });

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  async deleteEpisode() {
    try {
      if (!this.episode._id) {
        console.error('Cannot delete episode: Episode ID is missing.');
        return; // Exit the function if no ID is available
      }

      await lastValueFrom(this.adminService.deleteEpisode(this.episode._id));
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
    // console.log(this.editMode);
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
    if (!this.episode._id) {
      console.error('Cannot delete episode: Episode ID is missing.');
      return; // Exit the function if no ID is available
    }
    this.adminService.updateEpisode(this.episode._id, this.episode).subscribe(
      (response) => {
        // console.log('Success:', response);
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
      }
    );
  }

  formatEpisode() {
    let array = this.episode.about;
    // console.log(array);

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
    // console.log('fweiuabfueiws');
  }
  triggerAudioFileInput(): void {
    this.audioFileInput.nativeElement.click();
    // console.log('fweiuabfueiws');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // console.log(file);

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
        // console.log(reader);
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
    // console.log('Image removed.');
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
    // console.log('Image removed.');
  }

  playEpisode() {
    this.globalPlayer.playEpisode(this.episode);
  }

  formatDuration(
    time: number,
    finaltime: {
      minutes: string;
      seconds: string;
    },
  ) {
    let min = 0;
    let sec = 0;
    let test = 0;

    let fmin = '0';
    let fsec = '0';
    if (time < 60) {
      sec = Math.trunc(time);
    } else {
      // test = time/60;
      while (time >= 60) {
        min += 1;
        time -= 60;
        if (time <= 60) {
          sec = Math.trunc(time);
        }
      }
    }
    fmin = min.toString();
    fsec = sec.toString();
    if (sec < 10) {
      fsec = '0' + fsec;
      // sec = '0' + sec;
    }
    if (min < 10) {
      fmin = '0' + fmin;
      // sec = '0' + sec;
    }
    
    finaltime.minutes = fmin;
    finaltime.seconds = fsec;
  }
}
