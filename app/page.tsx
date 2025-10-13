// page.tsx
import { HeroSection } from "@/components/home/hero";
import { HighlightsSection } from "@/components/home/highlights";
import { FaqAccordion } from "@/components/faqs/faq-accordion";
import { Video } from "@/components/videotrailer/videopage";
import PreviousPosterMain from "@/components/previous-poster/previous-poster";
import TechniciaMemorabiliaSection from "@/components/gettomerch"

export default function Home() {
  return (
    <>
      <section id="home">
        <HeroSection />
      </section>

      <section id="video">
        <Video src="./video/tech-vid.mp4" />
      </section>

      <section id="highlights">
        <HighlightsSection />
      </section>
      <TechniciaMemorabiliaSection/>

      <section id="previous-events">
        <PreviousPosterMain />
      </section>
      
      <section id="faqs">
        <FaqAccordion />
      </section>
    </>
  );
}