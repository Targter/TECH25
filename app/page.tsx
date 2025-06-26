import { HeroSection } from "@/components/home/hero";
import { HighlightsSection } from "@/components/home/highlights";
import TimelineComponent from "@/components/timeline/timeline-component";
import SponsorGrid from "@/components/sponsors/sponsors-grid";
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
        <Video src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
      </section>

      <section id="highlights">
        <HighlightsSection />
      </section>

      <section id="previous-events">
        <PreviousPosterMain />
      </section>

      <section id="timeline">
        <TimelineComponent />
      </section>

      <section id="sponsors">
        <SponsorGrid />
      </section>

     

     

      <section id="faqs">
        <FaqAccordion />
      </section>
    </ParticleWrapper>
  );
}
