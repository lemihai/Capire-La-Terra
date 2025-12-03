import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import CustomEase from 'gsap/CustomEase';

import { Footer } from '../../footer/footer';
import { SourceComponent } from '../../shared/components/source.component/source.component';
import { ProfileCard } from '../../shared/components/profile-card/profile-card';
import { NewsCardComponent } from '../../shared/components/news-card.component/news-card.component';

interface Article {
  _id: string;
  url: string;
  title: string;
  author: string;
  date: string;
  text: string;
  // source: string;
  summary: string;
}

@Component({
  selector: 'app-article-page',
  imports: [Footer, SourceComponent, ProfileCard, NewsCardComponent],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss',
})
export class ArticlePage {
  private smoother: ScrollSmoother | null = null;

  constructor(private ngZone: NgZone) {}

  articles = [
    {
      _id: '3243223',
      url: 'https://example.com/article1',
      title: 'This is an article example',
      author: 'Sofia',
      date: '2025-11-26',
      text: `
Ecco il pilot del nostro podcast. Oggi vogliamo approfondire un tema che ci sta particolarmente a cuore: la responsabilità che tutti noi abbiamo nel definire correttamente la crisi climatica. Spesso sentiamo parlare di "cambiamento climatico", un'espressione che, seppur corretta, non rende giustizia alla gravità e all'urgenza della situazione attuale. Chiamare le cose con il loro nome è il primo passo per affrontarle con la serietà che meritano. La crisi climatica non è un fenomeno lontano o astratto, ma una realtà tangibile che sta già influenzando la vita di milioni di persone in tutto il mondo.

Nel corso di questo episodio, cercheremo di spiegare perché è fondamentale utilizzare il termine "crisi climatica" anziché "cambiamento climatico". Il linguaggio che usiamo ha un potere enorme: può sensibilizzare, mobilitare o, al contrario, minimizzare e distogliere l'attenzione da problemi gravi. Parlando di "crisi", trasmettiamo un senso di urgenza e di necessità di agire, che è esattamente ciò che serve in questo momento storico. Non si tratta solo di una questione semantica, ma di una scelta consapevole che può fare la differenza nel modo in cui le persone percepiscono la situazione e decidono di agire.

Ammetto che in questo pilot potrei sembrare un po' meno simpatica del solito. La ragione è semplice: la consapevolezza della gravità della crisi climatica ci carica di una responsabilità che non possiamo permetterci di prendere alla leggera. Siamo molto emozionate all'idea di condividere questo progetto con voi e speriamo che possa essere l'inizio di un dialogo costruttivo e di una maggiore consapevolezza collettiva. Ogni piccolo gesto conta, e il primo passo è informarsi e informare gli altri, usando le parole giuste per descrivere ciò che sta accadendo.

Nel podcast, affronteremo anche alcune delle conseguenze più immediate della crisi climatica, come l'aumento delle temperature, gli eventi meteorologici estremi sempre più frequenti e la perdita di biodiversità. Questi fenomeni non sono più proiezioni future, ma realtà che stiamo già vivendo. Parleremo di come ognuno di noi può contribuire a mitigare questi effetti, adottando stili di vita più sostenibili e facendo pressione sulle istituzioni affinché prendano provvedimenti concreti e tempestivi. La crisi climatica è una sfida globale che richiede un impegno collettivo, e ognuno di noi ha un ruolo da giocare.

Infine, vorremmo invitare tutti voi a partecipare attivamente a questa conversazione. Il vostro feedback è prezioso per noi: raccontateci le vostre opinioni, le vostre paure e le vostre speranze. Solo attraverso un confronto aperto e costruttivo possiamo sperare di trovare soluzioni efficaci e durature. Siamo convinte che, lavorando insieme, possiamo fare la differenza. Non vediamo l'ora di sentire le vostre voci e di costruire una comunità sempre più consapevole e unita nella lotta contro la crisi climatica.

Grazie per averci seguito in questo primo episodio. Restate sintonizzati per i prossimi appuntamenti, in cui approfondiremo ulteriormente questi temi e cercheremo di dare spazio a voci esperte e a storie di chi sta già agendo per un futuro più sostenibile. Ricordate: ogni azione conta, e il cambiamento parte da ognuno di noi.
    `,
      summary:
        'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    },
  ];

  paragraphs: string[] = [];

  separateParagraphs() {
    let wholeText = this.articles[0].text;
    let parts = wholeText.split('.');
    for (let i = 0; i < parts.length; i += 2) {
      let part = parts
        .slice(i, i + 2)
        .join('.')
        .trim();
      if (part) this.paragraphs.push(part);
    }
    for (let i = 0; i < parts.length - 1; i += 2) {
      this.paragraphs[i] = parts[i];
      console.log(this.paragraphs[i]);
    }
    // console.log(this.paragraphs, parts.length);
  }

  ngOnInit() {
    // Register GSAP plugins here once
    this.separateParagraphs();
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    });
  }

  ngOnDestroy() {
    // Kill the smoother and triggers to prevent memory leaks
    if (this.smoother) {
      this.smoother.kill();
    }
  }

  time = 1.24;
  timeFast = 0.64;
  ease = CustomEase.create('custom', 'M0,0 C0.119,1.118 0.437,0.964 1,1 ');

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Create the smoother instance
      this.smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        normalizeScroll: false,
        ignoreMobileResize: true,
        smoothTouch: false,
      });

      // --------------------------------
      // START FROM THE OTP OF THE PAGE NO MATTER WHERE YOU'RE COMING FROM
      // --------------------------------
      this.smoother.scrollTo(0, false);

      setTimeout(() => {
        // --------------------------------
        // TEXT SECTION
        // --------------------------------

        gsap.to('.transition-A', {
          height: 'auto',
          x: 0,
          y: 0,
          skewX: 0,
          skewY: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-image', {
          minHeight: '40rem',
          maxHeight: '40rem',
          scale: 1,
          rotate: 0,
          duration: this.timeFast,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-horizontal-line', {
          width: '100%',
          maxWidth: '100%',
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
        gsap.to('.transition-vertical-line', {
          maxHeight: '100%',
          y: 0,
          rotate: 0,
          duration: this.time,
          ease: this.ease,
          overwrite: true,
        });
      }, 400);
    });
  }
}
