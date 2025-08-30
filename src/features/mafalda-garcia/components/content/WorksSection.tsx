import React from 'react';
import { WorkItem } from '../ui/WorkItem';

interface WorksSectionProps {
  images: string[];
}

export const WorksSection: React.FC<WorksSectionProps> = ({ images = [] }) => {
  const works = [
    {
      title: "Connecting Souls",
      description: "Designed with 1000 handwritten questions, this interactive installation offered visitors in a unique experience. Participants could choose from four different ways to engage: making a question, exchanging questions with others, reading and taking someone else's question or leaving the space, introspective in nature, included multiple-choice, open-ended and visual answers. The purpose was to bring people together, to get to know each other, to question, to reflect, and to engage with the essence of our existence.",
      image: images[1] || undefined,
      credits: "Social experiment that encouraged connection and meaningful dialogue.",
      isReversed: false
    },
    {
      title: "Yūs Esate",
      description: "Premiered at XXII INTERNATIONAL STREET THEATRE FESTIVAL \"ŠERMUKŠNIS\" during a creative workshop. It is a performance about the Amazon women warriors who escaped from captivity and attempting to conquer the Klaipeda region. The creative team of the show has reimagined the concepts of \"intrusion, conquer\" - \"not through the power of weapons, but through the power of songs.\"",
      image: images[2] || undefined,
      credits: "Prop/set/performer: Mafalda Garcia, Liepa Šaltė, Irma Jurgelevičiūtė, Ūla Šilagalienė, Paula Sūnelaitė\nCast: Julia Dutkevič, Gabrielė Jurkevičiūtė, Deivydė Rutkauskaitė, Liepa Šaltė, Danielė Vaičiulytė, Irina Tabak.",
      isReversed: true
    },
    {
      title: "Lines of Separation",
      description: "This work invites the viewer/participant to reflect on the invisible lines that separate us from ourselves and from others. Sometimes these lines exist even when it's not up to us. An exploration of the boundaries that exist between the performance space and the audience.",
      image: images[3] || undefined,
      quotes: [
        "Today we live in times of denunciation of our neighbours, of hatred, resentment and cowardice.",
        "What power do we have to make choices if we are stuck on sides that aren't ours?"
      ],
      isReversed: false
    },
    {
      title: "Collaborative Movement",
      description: "In collaboration with Sofia Lacerda (multidisciplinary artist and finalist of the Prémio Sonae Media Arte 2022), we accepted the challenge and created an immersive work of art. For one hour, two movements became one, seeking the common center from our individual expressions. Rui Alemão created a powerful soundscape and edited the final video artwork.",
      image: images[4] || undefined,
      credits: "Credits: Mafalda Silvgar and VUD Collective",
      isReversed: true
    },
    {
      title: "Borderline Manifesto",
      description: "A feminist art piece presented as both a performative manifesto and a social experiment, this work emerged from research around the female body. The performance was part of the Borderline, showcasing women artists. This work aimed to create not only a space for artistic collaboration but also an open platform where the public could actively participate. It invited reflection on how dialogue and collective expression can be an alternative form of care and an important part of existence.",
      image: images[5] || undefined,
      credits: "Performer: Mafalda Silvgar\nSound: Rui Alemão\nVideo: Marisa Cantos",
      isReversed: false
    },
    {
      title: "Freedom Manifesto",
      description: "A manifesto about freedom in the 21st century. In a liquid and ambiguous society, where the concept of belonging and citizenship globally challenges our understanding of identity. In this manifesto, using non-verbal language, we take the spectator-actor into a habitat of synaesthesia and action. This performative manifesto consists of a sensory installation that explores what it means to be free in our contemporary world.",
      image: images[6] || undefined,
      quotes: [
        "Free to movement, what do we have in our hands?",
        "In a world full of thirst, we are left with the stones in the path"
      ],
      isReversed: true
    }
  ];

  return (
    <section id="works" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
          Major Works and Contributions
        </h2>
        
        <div className="space-y-24">
          {works.map((work, index) => (
            <WorkItem
              key={index}
              title={work.title}
              description={work.description}
              image={work.image}
              credits={work.credits}
              isReversed={work.isReversed}
              quotes={work.quotes}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
