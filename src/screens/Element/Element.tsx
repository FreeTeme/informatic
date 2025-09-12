import React from "react";
import { AboutUsSection } from "./sections/AboutUsSection/AboutUsSection";
import { BenefitsSection } from "./sections/BenefitsSection/BenefitsSection";
import { ContactUsSection } from "./sections/ContactUsSection/ContactUsSection";
import { FeaturedProjectsSection } from "./sections/FeaturedProjectsSection/FeaturedProjectsSection";
import { HeroBannerSection } from "./sections/HeroBannerSection/HeroBannerSection";
import { LatestNewsSection } from "./sections/LatestNewsSection/LatestNewsSection";
import { OurProductsSection } from "./sections/OurProductsSection/OurProductsSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";

const clientLogos = [
  {
    src: "/logo.png",
    alt: "Logo",
    width: "w-[180px]",
    height: "h-[200px]",
    className: "",
  },
  {
    src: "/logo-1.png",
    alt: "Logo",
    width: "w-[300px]",
    height: "h-[200px]",
    className: "",
  },
  {
    src: "/logo-2.png",
    alt: "Logo",
    width: "w-[300px]",
    height: "h-[200px]",
    className: "",
  },
  {
    src: "/logo-3.png",
    alt: "Logo",
    width: "w-[300px]",
    height: "h-[200px]",
    className: "bg-blend-darken",
  },
  {
    src: "/logo-4.png",
    alt: "Logo",
    width: "w-[300px]",
    height: "h-[200px]",
    className: "",
  },
  {
    src: "/logo-5.png",
    alt: "Logo",
    width: "w-[300px]",
    height: "h-[200px]",
    className: "bg-blend-darken",
  },
  {
    src: "/logo-6.png",
    alt: "Logo",
    width: "w-[180px]",
    height: "h-[200px]",
    className: "",
  },
];

export const Element = (): JSX.Element => {
  return (
    <div className="bg-[#f6f7fd] w-screen">
      <div className="bg-bg w-full max-w-[1920px] mx-auto flex flex-col">
        <HeroBannerSection />
        <AboutUsSection />
        <OurProductsSection />
        <BenefitsSection />
        <FeaturedProjectsSection />
        <LatestNewsSection />
        <ContactUsSection />
        <SiteFooterSection />
      </div>
    </div>
  );
};
