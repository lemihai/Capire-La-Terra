import {
  Component,
  AfterViewInit,
  NgZone,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { NgOptimizedImage } from '@angular/common';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-landing-page',
  imports: [NgOptimizedImage, Footer],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements AfterViewInit, OnInit, OnDestroy {
  private smoother: ScrollSmoother | null = null;

  constructor(private ngZone: NgZone) {}

  episodes = [
    {
      id: 3243223,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 1,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243224,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 2,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243225,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 3,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243226,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 4,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243227,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 5,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243228,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 6,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243229,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 7,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243230,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 8,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
    {
      id: 3243231,
      name: 'Perchè la chiamiamo crisi climatica?',
      number: 9,
      description:
        "Ecco il pilot del nostro podcast, oggi parliamo, in meno di 5 minuti, di perché è nostra responsabilità chiamare la crisi climatica tale e non solamente con l'espressione cambiamento climatico. Ammetto che so essere più simpatica negli altri episodi. Siamo molto emozionate e speriamo di ricevere tanto feedback da parte vostra.",
    },
  ];

  articles = [
    {
      id: 1110011,
      number: 1,
      title: 'The Future of Renewable Energy: Breakthroughs in Solar Technology',
      date: '15-01-2025',
      source: 'https://green-energy-today.com',
      author: 'Dr. Emily Carter',
      text: 'Scientists at the Global Energy Institute have developed a new type of solar panel that converts 60% of sunlight into electricity, doubling the efficiency of current models. This breakthrough could revolutionize how we harness solar energy, making it more affordable and accessible worldwide. The technology uses advanced nanomaterials to capture a broader spectrum of sunlight, including infrared and ultraviolet light, which were previously wasted in traditional panels.',
      summary:
        'A new solar panel technology achieves 60% efficiency, potentially making solar energy more affordable and accessible globally.',
    },
    {
      id: 1110012,
      number: 2,
      title: 'AI in Healthcare: Diagnosing Diseases with 99% Accuracy',
      date: '22-01-2025',
      source: 'https://med-tech-innovations.com',
      author: 'Marcus Lee',
      text: 'A team of researchers from Stanford University has developed an AI-powered diagnostic tool that can detect diseases such as cancer, diabetes, and Alzheimer’s with 99% accuracy. The tool analyzes patient data, including genetic information, medical history, and real-time health metrics, to provide early and precise diagnoses. This innovation could significantly reduce misdiagnoses and improve patient outcomes.',
      summary:
        'Stanford researchers create an AI tool that diagnoses diseases with 99% accuracy, promising better patient care.',
    },
    {
      id: 1110013,
      number: 3,
      title: 'The Rise of Smart Cities: How IoT is Transforming Urban Living',
      date: '05-02-2025',
      source: 'https://urban-future.net',
      author: 'Sophia Martinez',
      text: 'Cities around the world are adopting Internet of Things (IoT) technologies to enhance infrastructure, reduce traffic congestion, and improve public services. Barcelona, Singapore, and Tokyo are leading the way with smart traffic lights, waste management systems, and energy-efficient buildings. These advancements aim to create sustainable, livable urban environments for their residents.',
      summary: 'Global cities are leveraging IoT to build smarter, more sustainable urban spaces.',
    },
    {
      id: 1110014,
      number: 4,
      title: 'Mars Colonization: The First Human Settlement Planned for 2035',
      date: '10-02-2025',
      source: 'https://space-explorer.org',
      author: 'Alex Reynolds',
      text: 'NASA and SpaceX have announced a joint mission to establish the first human colony on Mars by 2035. The project, named "Red Horizon," will send a team of astronauts and scientists to build habitats, conduct research, and prepare for long-term human presence. The colony will rely on advanced life-support systems and in-situ resource utilization to sustain its inhabitants.',
      summary: 'NASA and SpaceX plan to establish the first human colony on Mars by 2035.',
    },
    {
      id: 1110015,
      number: 5,
      title: 'The Impact of Remote Work on Global Real Estate Markets',
      date: '18-02-2025',
      source: 'https://global-property-insights.com',
      author: 'Lena Kowalski',
      text: 'The shift to remote work has caused significant changes in real estate markets worldwide. Demand for urban office spaces has declined, while suburban and rural properties have seen a surge in interest. Experts predict that hybrid work models will continue to shape the market, with a focus on flexible, multi-functional living spaces.',
      summary:
        'Remote work is reshaping real estate demand, with suburban and rural properties gaining popularity.',
    },
    {
      id: 1110016,
      number: 6,
      title: 'Quantum Computing: The Next Frontier in Cybersecurity',
      date: '25-02-2025',
      source: 'https://tech-security-news.com',
      author: 'Raj Patel',
      text: 'Quantum computers are poised to revolutionize cybersecurity by solving complex encryption problems in seconds. While this presents opportunities for enhanced data protection, it also poses risks, as current encryption methods could become obsolete. Governments and tech companies are racing to develop quantum-resistant algorithms to safeguard digital infrastructure.',
      summary:
        'Quantum computing could transform cybersecurity, but also threatens to break current encryption methods.',
    },
    {
      id: 1110017,
      number: 7,
      title: 'The Psychology of Social Media: How Platforms Shape Our Behavior',
      date: '03-03-2025',
      source: 'https://mind-and-media.com',
      author: 'Dr. Olivia Bennett',
      text: 'Researchers have found that social media platforms influence user behavior through algorithmic curation, notifications, and reward systems. These mechanisms can impact mental health, self-esteem, and even political opinions. Understanding these effects is crucial for designing ethical, user-friendly digital environments.',
      summary:
        'Social media algorithms shape user behavior and mental health, raising ethical concerns.',
    },
    {
      id: 1110018,
      number: 8,
      title: 'Sustainable Fashion: The Rise of Eco-Friendly Materials',
      date: '12-03-2025',
      source: 'https://eco-fashion-world.com',
      author: 'Isabella Rossi',
      text: 'The fashion industry is embracing sustainability, with brands increasingly using eco-friendly materials like organic cotton, recycled polyester, and lab-grown leather. Consumers are driving this shift by demanding transparency and ethical practices. Innovations in textile recycling and biodegradable fabrics are further accelerating the movement toward a greener fashion industry.',
      summary:
        'Fashion brands are adopting eco-friendly materials to meet consumer demand for sustainability.',
    },
    {
      id: 1110019,
      number: 9,
      title: 'The Future of Food: Lab-Grown Meat and Plant-Based Diets',
      date: '20-03-2025',
      source: 'https://future-of-food.com',
      author: 'James Whitaker',
      text: 'Lab-grown meat and plant-based alternatives are gaining traction as sustainable solutions to global food challenges. Companies like Beyond Meat and Impossible Foods are expanding their product lines, while startups are developing cultured meat that mimics the taste and texture of traditional animal products. These innovations aim to reduce environmental impact and improve food security.',
      summary: 'Lab-grown meat and plant-based diets are emerging as sustainable food solutions.',
    },
    {
      id: 1110020,
      number: 10,
      title: 'Virtual Reality in Education: Transforming Classrooms Worldwide',
      date: '28-03-2025',
      source: 'https://ed-tech-revolution.com',
      author: 'Priya Desai',
      text: 'Virtual reality (VR) is revolutionizing education by providing immersive learning experiences. Students can explore historical events, conduct virtual science experiments, and engage in interactive language lessons. Schools in Finland, Japan, and the United States are piloting VR programs, with early results showing improved student engagement and retention rates.',
      summary:
        'VR technology is enhancing education through immersive, interactive learning experiences.',
    },
  ];

  ngOnInit() {
    // Register GSAP plugins here once
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

  // ... (your existing imports and component setup)

  
  ngAfterViewInit() {
  //  GSAP Animations
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

      // GSAP ScrollTrigger for parallax effect on each image
      // gsap.utils.toArray('[data-speed]').forEach((img) => {
      //   // Cast the 'img' variable to HTMLElement to satisfy TypeScript
      //   const element = img as HTMLElement;

      //   gsap.to(element, {
      //     y: (i, target) => -100 * parseFloat(target.getAttribute('data-speed') as string),
      //     ease: 'none',
      //     scrollTrigger: {
      //       trigger: element,
      //       start: 'top bottom',
      //       end: 'bottom top',
      //       scrub: true,
      //     },
      //   });
      // });

      // gsap.set('.background', { rotate: 0 });

      let tl = gsap.timeline();
      // tl.to('.background', { height: '80vh', duration: 2, ease: 'power2.out' });
      // tl.to('.bottom-fade-filter', {top: '6vh', duration: 1, ease: 'power2.out'})
      // tl.to('.content', { top: '56vh', duration: 10, ease: 'power2.out' }); //wait 1 second

      ScrollTrigger.create({
        animation: tl,
        trigger: '.scroll-trigger-a',
        start: 'top top',
        // end: '+=400',
        end: '+=300',
        // pin: '.snap-element-a',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        // snap: 2,
      });

      // gsap.to('.section-b-content', {
      //   scrollTrigger: {
      //     trigger: '.section-b-content',
      //     scroller: '.section-b', // Explicitly set the scroll container
      //     start: 'top center',
      //     end:'bottom center',
      //   },
      //   x: 100,
      // });

      // let tl = gsap.timeline({
      //   scrollTrigger: '.scroll-trigger-a',
      //   height: 500,
      //   start: "top center",
      //   end: "bottom center",
      //   pin: true,
      //   scrub:true
      // });

      // tl.to('.background', {
      //   rotation: 32,
      //   duration: 1.6,
      //   ease: "ease-out"
      // });

      // gsap.to('.background', {
      //   scrollTrigger: '.scroll-trigger-a',
      //   height: 500,
      // });
    });
  }

  // ... (rest of your component code)
}
