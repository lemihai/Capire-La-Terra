import { Component } from '@angular/core';
import { NewsCardComponent } from "../../shared/components/news-card.component/news-card.component";

@Component({
  selector: 'app-news-section',
  imports: [NewsCardComponent],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.scss',
})
export class NewsSectionComponent {
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
}
