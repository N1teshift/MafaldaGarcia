import React from 'react';
import { MajorWorkItem } from '../ui/MajorWorkItem';

interface MajorWorksSectionProps {
  images: string[];
}

export const MajorWorksSection: React.FC<MajorWorksSectionProps> = ({ images = [] }) => {
  const majorWorks = [
    {
      title: "Existential Services, ES",
      year: "2023",
      duration: "4 hours",
      concept: "Existential Services invites us to step into an inner space—one that resides within each of us, yet remains intimately connected to the collective. It is a space where time slows, urging us to awaken the philosopher within, to question, to reflect, and to engage with the essence of our existence.",
      description: "Designed as a playful version of a government office, the installation featured an improvised office setting where Mafalda Garcia engaged nearly 100 visitors in a unique experience. Participants could choose from four languages - Latvian, Latgalian, English and Russian - to answer thought-provoking questions. These questions, which were philosophical in nature, included multiple-choice, open-ended and visual answers.\n\nThe idea was to invite visitors into a moment of introspection, encouraging them to think about the present moment, their origins, their direction, and fundamental concepts such as identity and morality. Simple questions led to complex answers, making the installation a social experiment that encouraged connection and meaningful dialogue.",
      credits: "Mafalda Garcia\nPhotos: Photo credits by Laura Māliņas and Mafalda Garcia",
      location: "NESKARTS, Rezekne, Latvia",
      images: images.slice(0, 6) // Use first 6 images for this work
    },
         {
       title: "You are....",
       year: "2023",
       duration: "1 hour",
       concept: "This street performance was exclusively created for the XXII INTERNATIONAL STREET THEATRE FESTIVAL \"ŠERMUKŠNIS\" during a creative workshop. It is a translation of the events that took place in 1923 into the language of street theatre, conveyed without words. The inspiration behind it stems from the story of Lithuanian soldiers disguising themselves as locals and attempting to conquer the Klaipeda region.",
       description: "The creative team of the show has reimagined the concepts of \"intrusion, invasion, coup,\" which typically carry negative connotations. They sought to transform these notions into something positive. Thus, the idea to \"conquer\" the Klaipeda region was born, not through the use of weapons, but through the power of songs.",
       credits: "Director – Adrian Schvarzstein (Ispanija / Spain)\nAssistant Director – Jūratė Širvytė (Lithuania)\nHistory Consultant – Vasilijus Safronovas Lithuania)\nCast: Oleg Bosyuk (Ukraina/Ukraine), Kseniia Buryka (Ukraina/Ukraine), Andrius Doleris, Mafalda Garcia (Portugalija / Portugal), Edvardas Giedraitis, Jūratė Jocienė, Aleksas Mažonas, Justinas Mažūnas, Arūnas Mozeris, Sofija Ostrovskytė, Carolina Pailhe (Argentina), Mingailė Rutkauskaitė, Liepa Šaltė, Danielė Vaičiulytė, Irina Tabak.\n\nPress & Media Coverage:\nhttps://ve.lt/gyvenimas/kultura/klaipedoje-vyksta-tarptautinis-gatves-teatro-festivalis-sermuksnis\nhttps://kauno.diena.lt/naujienos/klaipeda/menas-ir-pramogos/tarptautinis-gatves-teatru-festivalis-sermuksnis-nuspalvino-klaipeda-1131522",
       location: "XXII INTERNATIONAL STREET THEATRE FESTIVAL \"ŠERMUKŠNIS\", Klaipeda, Lithuania",
       images: images.slice(6, 12) // Use next 6 images for this work
     },
           {
        title: "Free Doom",
        year: "2018",
        duration: "20 minutes",
        concept: "Co.collective is an activist and transdisciplinary collective that believes in collaboration as the principle that activates creativity and criticality. Its installations are sensory and interactive, seeking to take the spectator-actor into a habitat of synaesthesia and action.",
        description: "\"Free Doom\" is an audiovisual and performative installation that aims to be a manifesto about freedom in the 21st century. In a liquid and ambiguous age, we are pushed towards passive citizenship locally and apathetic citizenship globally. In this manifesto, using non-verbal language, we lead the viewer to reflect on today's libertarian conflicts, from static to movement, what do we have in our hands?\n\n'In a world full of thirst, we are left with the stones in the path'",
        credits: "Analogic Projection: Paulo Uliarud Uliarud\nSound Designer: Doutor Aeiu Ton\nProps/Set/Performer: Mafalda Silvgar (Garcia)\n\nPerformance History:\nFreedom and Critical Thinking Forum I (Curator: David Zink)\nZaratan Gallery",
        location: "LISBOA, Portugal",
        images: images.slice(12, 18) // Use next 6 images for this work
      },
             {
         title: "Invisible Lines",
         year: "2019",
         duration: "25 minutes",
         concept: "This performative manifesto will consist of a sensory installation that invites the viewer/participant to reflect on the invisible lines that exist in our world and that promote social divisions.",
         description: "Divisions: Which side are we on? Which side of the line do we want to be on? Who creates these lines? It won't be us, with our social apathy in our refuge. We surround ourselves with screens, we like to watch through the window of passivity.... It gives us a certain pleasure to feel that it's not up to us.\n\nToday we live in times of denunciation of our neighbours, of hatred, resentment and cowardice.\n\nWhat power do we have? Are the lines that imprison us the same ones that free us? Are they the same lines that set us free?\n\nOr are we the lines of the lines?",
         credits: "Live projection: Paulo Uliarud Uliarud\nSound design: Doutor Aeiu Ton\nProps/Set/Performer: Mafalda Garcia\nPhotography by Kah Smith\n\nPerformance History:\nFreedom and Critical Thinking Forum II (Curator: David Zink)\nRA Gallery",
         location: "LISBOA, Portugal",
         images: images.slice(0, 6)
       },
       {
         title: "Santa Paciência (Holy Patient)",
         year: "2016",
         duration: "5 hours",
         concept: "\"Holy Patience, from worldly porn to canonisation: let's raise our fingers sisters by simply saying no, no more oppression of our bodies, we are here, thinking beings.\" A feminist art piece presented as both a performative manifesto and a photographic exhibition, featured in the collaborative exhibition Borderline, showcasing women artists.",
         description: "This work aimed to create not only a space for artistic collaboration but also an open platform where the public could actively participate. It invited reflection on how femininity is shaped by societal expectations, burdened by stigmas, and constrained by the pressures of standardization. Through performance and visual storytelling, the piece challenged these norms, encouraging dialogue and collective expression.",
         credits: "Credits: Mafalda Silvgar and VUD Collective\nPhotos: Photo credits by Kevin Flores\nVideo: https://www.facebook.com/Vudisart/videos/1249483141798028",
         location: "DESTERRO, Lisboa, Portugal",
         images: images.slice(0, 6)
       },
       {
         title: "Obscura",
         year: "2016",
         duration: "45 minutes",
         concept: "This artwork was born from a laboratory of improvisation—a dialogue between performer and sound designer. It created an immersive atmosphere where the performer shed their identity, transforming into a character that connected us all through our shadows and inner monologues.",
         description: "A key moment of the performance was the liberation from the net, where the boundaries between body, paint, and soil dissolved. The merging of materials symbolized the dissolution of ego and character, a return to a primal state of unity with nature. Rather than resisting the unknown, the performance invited the audience to embrace their own 'swampy paths'—not with fear, but with the courage to see them as an essential part of existence.",
         credits: "Performer: Mafalda Silvgar\nSound designer: Ricardo Silva",
         location: "CABARET TORTO, Lisboa, Portugal",
         images: images.slice(0, 6)
       },
       {
         title: "Ouroborus",
         year: "2016",
         duration: "12 hours",
         concept: "Kinesis Collective is a group of transdisciplinary artists who blend photography, performance, and installation with a live sound journey. This living exhibition was in constant transformation, capturing the movements and sounds of visitors as they entered the space.",
         description: "Presented at the Entremuralhas Festival over two days, the performance explored the theme of the female body and power, drawing inspiration from the mythology of the Ouroboros. Set in the King's Hall of the medieval castle of Leiria (Portugal), the historic and atmospheric setting amplified the piece's immersive and reflective nature.",
         credits: "Photographer: Carolina Sepúlveda\nSound designer: Pedro André Serrano\nProps/Set/Performer: Mafalda Garcia\nTechnical support: João Rino e Daniel Fabião",
         location: "FESTIVAL ENTREMURALHAS, Leiria, Portugal",
         images: images.slice(0, 6)
       }
  ];

  return (
    <section id="major-works" className="py-20 lg:py-32 bg-artistic-light">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
          Major Works
        </h2>
        
        <div className="space-y-24">
          {majorWorks.map((work, index) => (
            <MajorWorkItem
              key={index}
              title={work.title}
              year={work.year}
              duration={work.duration}
              concept={work.concept}
              description={work.description}
              credits={work.credits}
              location={work.location}
              images={work.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
