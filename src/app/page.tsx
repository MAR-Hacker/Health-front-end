import React from "react";
import HeroSection from "../components/landing/Hero_sec";
import FeaturesSection from "../components/landing/Feature_sec";
import HowItWorksSection from "../components/landing/How_it_works";
import CTASection from "../components/landing/Cta-sec";
import Footer from "../components/landing/footer";
export default function Page() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
