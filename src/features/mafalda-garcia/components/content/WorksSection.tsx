import React from 'react';
import { WorkItem } from '../ui/WorkItem';

interface WorksSectionProps {
  images: string[];
}

export const WorksSection: React.FC<WorksSectionProps> = ({ images = [] }) => {
  const works = [
    {
      title: "2023 September - Rogovka, Latvia",
      description: "Rogovkys dzejis voga - Performance in a musical act by Kristaps Višs and Dana Vasiļjeva, based on a poem by Mārīte Slišāne.",
      credits: "https://youtu.be/nDKhde6XhI4?si=KkYYg6LUN0nEfRMI",
      quotes: []
    },
    {
      title: "2023 August - Rezekne, Latvia",
      description: "NESKARTS Festival - Performance and Installation \"Existential Services, ES\"",
      quotes: []
    },
    {
      title: "2023 July - Klaipėda, Lithuania",
      description: "XXII INTERNATIONAL STREET THEATRE FESTIVAL \"ŠERMUKŠNIS\" - Street Theatre performance \"You are...\" with Trupe Šermukšnis",
      quotes: []
    },
    {
      title: "2022 September - Leiria, Portugal",
      description: "It's humanity's fault - Launch of No. 999 - \"Born from chaos into the world.\" - Performative interpretation of poems and prose written by Bruno Abgrund",
      quotes: []
    },
    {
      title: "2019 December - Lisbon, Portugal",
      description: "RA GALLERY - Performance and Audiovisual Installation \"Breathing Life\" with Helga Rodrigues and Paulo Uliarud",
      quotes: []
    },
    {
      title: "2019 November - Lisbon, Portugal",
      description: "Freedom and Critical Thinking Forum II - Performance and audiovisual Installation \"Invisible Lines\" with Co.collective",
      quotes: []
    },
    {
      title: "2018 August - Lisbon, Portugal",
      description: "Zaratan Contemporary Art Gallery - Performance Cycle 'Do Lumiar' - Performance and Audiovisual live installation \"Free Doom\" with Co.Collective",
      quotes: []
    },
    {
      title: "2019 June - Rezekne, Latvia",
      description: "ART HOUSE - Participation in the music video 'WEB' by the band Ave Jahbahus.",
      credits: "https://youtu.be/CenxtSruMIM?si=jdhAGmB7DEKeJd5P",
      quotes: []
    },
    {
      title: "2018 July - Lisbon, Portugal",
      description: "Freedom and Critical Thinking Forum I - Performance and Audiovisual live installation \"Free Doom\" with Co.Collective",
      quotes: []
    },
    {
      title: "2017 November - Lisbon, Portugal",
      description: "RA GALLERY - Performance and Audiovisual Installation \"Tiresias\" with Doutor Aeiu Ton and Paulo Uliarud",
      quotes: []
    },
    {
      title: "2017 October - Lisbon, Portugal",
      description: "CABARET TORTO - Performance and audiovisual Installation \"Obscura\" with Nun Vau Collective",
      quotes: []
    },
    {
      title: "2017 May - Marinha Grande, Portugal",
      description: "VOZ DO OPERÁRIO GALLERY - Performance and Audio Installation \"Transfiguração\" - Pedro Matos Exhibition (Visual Artist)",
      quotes: []
    },
    {
      title: "2017 May - Leiria, Portugal",
      description: "FESTIVAL A PORTA - Performance and Audiovisual Installation \"Esta Porta abre Janelas\"",
      quotes: []
    },
    {
      title: "2016 December - Barreiro, Portugal",
      description: "V Embarcação do Capitão - TEXAS BAR - Performance with the band Horse Head Cutters",
      quotes: []
    },
    {
      title: "2016 November - Barreiro, Portugal",
      description: "IV Embarcação do Capitão - TEXAS BAR - Performance and Audiovisual Installation \"Olho por Olho, Dente por Dente!\" (An eye for an eye, a tooth for a tooth)",
      quotes: []
    },
    {
      title: "2016 October - Lisbon, Portugal",
      description: "DESTERRO GALLERY - Performance and Visual Installation \"Santa Paciência\" (Holy Patient) with VUD Collective - Borderline Collaborative Art Exhibition",
      quotes: []
    },
    {
      title: "2016 October - Lisbon, Portugal",
      description: "MUTE GALLERY - Performance and Audiovisual Installation \"Abscôndito\" with Ekidna Kollektiv during the art exhibition of visual artist Nuno Lacerda",
      quotes: []
    },
    {
      title: "2016 August - Leiria, Portugal",
      description: "FESTIVAL ENTREMURALHAS . ART GALLERY - Performance and Audiovisual Installation \"Ouroboros\" with Kinesis Collective",
      quotes: []
    },
    {
      title: "2016 July - Leiria, Portugal",
      description: "HISTORIC CENTER - Performance and Audiovisual Installation \"Sete Mandamentos\" (The Seven Commandments) with Assalto Collective - Collaborative Exhibition",
      quotes: []
    },
    {
      title: "2016 July - Barreiro, Portugal",
      description: "TEXAS BAR - Performance and Audiovisual Installation \"Gnōthi seauton\" (Know yourself) & \"Preenchimentos\" (Fillings)",
      quotes: []
    },
    {
      title: "2016 June - Leiria, Portugal",
      description: "FESTIVAL A PORTA - Performance and Audiovisual Installation \"Preenchimentos\" (Fillings)",
      quotes: []
    },
    {
      title: "2016 May - Porto Mós, Portugal",
      description: "MATINÉS DA ALDEIA TREMOCEIRA - Performance and Audiovisual Installation \"Preenchimentos\" (Fillings)",
      quotes: []
    },
    {
      title: "2014 January - Lisbon, Portugal",
      description: "FACULTY OF FINE ARTS - UNIVERSITY OF LISBON - Performance and Audiovisual Installation \"Preenchimentos\" (Fillings)",
      quotes: []
    }
  ];

  return (
    <section id="works" className="py-20 lg:py-32 bg-artistic-light">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
          Works and Contributions
        </h2>
        
        <div className="space-y-12">
          {works.map((work, index) => (
            <WorkItem
              key={index}
              title={work.title}
              description={work.description}
              credits={work.credits}
              quotes={work.quotes || []}
            />
          ))}
        </div>
      </div>
      <div className="section-divider"></div>
    </section>
  );
};
