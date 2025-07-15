import { HeroSection } from "@/components/home/hero";
import { HighlightsSection } from "@/components/home/highlights";
import { FaqAccordion } from "@/components/faqs/faq-accordion";
import { ParticleWrapper } from "@/components/ParticleWrapper/ParticleWrapper";
import { Video } from "@/components/videotrailer/videopage";
import PreviousPosterMain from "@/components/previous-poster/previous-poster";

export default function Home() {
  return (
    <ParticleWrapper>
      <section id="home">
        <HeroSection />
      </section>

      <section id="video">
        <Video src="./video/tech-vid.mp4" />
      </section>

      <section id="highlights">
        <HighlightsSection />
      </section>

      <section id="previous-events">
        <PreviousPosterMain />
      </section>


   

     

     

      <section id="faqs">
        <FaqAccordion />
      </section>
    </ParticleWrapper>
  );
}
