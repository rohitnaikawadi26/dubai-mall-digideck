import Hero from "@/components/sections/Hero";
import Scale from "@/components/sections/Scale";
import Retail from "@/components/sections/Retail";
import Luxury from "@/components/sections/Luxury";
import Attractions from "@/components/sections/Attractions";
import Events from "@/components/sections/Events";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Scale />
      <Retail />
      <Luxury />
      <Attractions />
      <Events />
      <CTA />
    </main>
  );
}
