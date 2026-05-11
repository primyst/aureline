import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import TreatmentsGrid from "@/components/treatments-grid";
import BeforeAfterSlider from "@/components/before-after-slider";
import WhyAureline from "@/components/why-aureline";
import Testimonials from "@/components/testimonials";
import ConsultationCTA from "@/components/consultation-cta";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <TreatmentsGrid />
      <BeforeAfterSlider />
      <WhyAureline />
      <Testimonials />
      <ConsultationCTA />
      <FAQ />
    </>
  );
}
