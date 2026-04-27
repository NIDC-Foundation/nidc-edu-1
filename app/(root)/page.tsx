import HeroSection from "@/components/landing/sections/Hero";
import ImpactStatsSection from "@/components/landing/sections/ImpactStats";
import HowItWorksSection from "@/components/landing/sections/HowItWorks";
import StudentStoriesSection from "@/components/landing/sections/StudentStories";
import UniversitiesSection from "@/components/landing/sections/Universities";
import TransparencySection from "@/components/landing/sections/Transparency";
import DonateCTASection from "@/components/landing/sections/DonateCta";

export default function LandingPage() {
  return (
    <main className="bg-background overflow-x-hidden">
      <HeroSection />
      <ImpactStatsSection />
      <HowItWorksSection />
      <StudentStoriesSection />
      <UniversitiesSection />
      <TransparencySection />
      <DonateCTASection />
    </main>
  );
}
