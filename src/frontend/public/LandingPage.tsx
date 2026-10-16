import * as FaIcons from "react-icons/fa";
import { FaChevronDown, FaChevronUp, FaChevronRight } from "react-icons/fa";

import {
  HeroSection,
  FeaturesSection,
  BenefitsSection,
  AboutUsSection,
  StorySection,
  CTASection,
  FAQsSection,
  FooterLogos,
  PublicMarketplaceSection,
} from "../utils/siteContent";
import { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import MarketplaceShowcase from "./MarketplaceShowcase";

const LandingPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleCollapsible = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const carousel = [
    { id: 1, icon: "FaLaptop", name: "Electronics", color: "text-blue-500" },
    { id: 2, icon: "FaTshirt", name: "Fashion", color: "text-pink-500" },
    { id: 3, icon: "FaCouch", name: "Home & Living", color: "text-amber-500" },
    {
      id: 4,
      icon: "FaGamepad",
      name: "Toys & Hobbies",
      color: "text-purple-500",
    },
    {
      id: 5,
      icon: "FaBookOpen",
      name: "Books & Media",
      color: "text-green-500",
    },
    {
      id: 6,
      icon: "FaBasketballBall",
      name: "Sports & Outdoors",
      color: "text-orange-500",
    },
    {
      id: 7,
      icon: "FaScrewdriver",
      name: "Tools & Miscellaneous",
      color: "text-gray-500",
    },
  ];

  const Benefits = BenefitsSection;

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-scroll-reveal]",
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -32px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main className="mx-auto max-w-7xl px-10 pt-10 sm:px-6 lg:px-8 md:pt-20 pb-20 md:pb-28">
        {/* Hero */}
        <section
          id="hero-section"
          data-scroll-reveal="true"
          className="scroll-mt-20 pb-10 md:pb-16"
        >
          <div className="flex flex-col md:flex md:flex-row justify-center items-center min-h-165 mt-10 md:mt-0">
            <div className="flex flex-col items-center gap-8 justify-center">
              <h1 className="text-5xl text-center font-bold md:text-center tracking-tight leading-20 text-black sm:text-5xl lg:text-7xl whitespace-pre-line">
                {HeroSection.slogan}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-center whitespace-pre-line">
                {HeroSection.subtitle}
              </p>
              <div className=" flex flex-row md:flex md:flex-row gap-3 mt-2 justify-center w-full">
                <a
                  href={"#features-section"}
                  className="bg-[#75cf4c] text-center text-white font-medium rounded-3xl
                  hover:bg-[#85d65c] active:bg-[#5fb33a] hover:cursor-pointer duration-300 w-full md:w-40 p-3 hover:-translate-y-1"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Features */}
        <section
          id="features-section"
          data-scroll-reveal="true"
          className="scroll-mt-20 py-10 md:py-16"
        >
          <div className="flex flex-col items-center gap-5">
            <span className="mb-5 inline-flex items-center rounded-full bg-[#75cf4c]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#4b922e]">
              About Us
            </span>
            <h2 className="mx-auto mb-6 max-w-3xl text-xl text-center font-bold leading-tight tracking-tight text-black sm:text-4xl">
              {FeaturesSection.header}
            </h2>
            <div className="w-full overflow-x-hidden">
              <div className="animate-infinite-scroll flex flex-row gap-8 justify-evenly w-max overflow-y-hidden p-4">
                {carousel.map((item) => {
                  const IconComponent =
                    FaIcons[item.icon as keyof typeof FaIcons];
                  return (
                    <div
                      key={`original-${item.id}`}
                      className="flex w-32 shrink-0 flex-col items-center justify-center gap-3"
                    >
                      <div className="flex min-h-25 w-25 shrink-0 items-center justify-center rounded-3xl border border-gray-300 p-3 transition duration-300 hover:scale-105">
                        {IconComponent && (
                          <IconComponent size={35} className={item.color} />
                        )}
                      </div>
                      <span className="text-center text-sm font-medium text-black/80">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
                {carousel.map((item) => {
                  const IconComponent =
                    FaIcons[item.icon as keyof typeof FaIcons];
                  return (
                    <div
                      key={`duplicate-${item.id}`}
                      className="flex w-32 shrink-0 flex-col items-center justify-center gap-3"
                    >
                      <div className="flex min-h-25 w-25 shrink-0 items-center justify-center rounded-3xl border border-gray-300 p-3 transition duration-300 hover:scale-105">
                        {IconComponent && (
                          <IconComponent size={35} className={item.color} />
                        )}
                      </div>
                      <span className="text-center text-sm font-medium text-black/80">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* Benefits */}
        <section
          id="about-us"
          data-scroll-reveal="true"
          className="scroll-mt-20 py-10 md:py-16"
        >
          <div className="flex flex-col justify-center gap-4 md:grid md:grid-cols-3 md:justify-items-center">
            {Benefits.map((card) => (
              <div
                key={card.title}
                className="
                  flex h-full flex-col items-start gap-4
                  rounded-2xl border border-slate-200
                  bg-white p-6 shadow-sm
                  transition-shadow duration-200
                  hover:shadow-md
                "
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#75cf4c]/10">
                  <card.icon
                    size={24}
                    aria-hidden="true"
                    className="text-[#4b922e]"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold leading-snug text-slate-900 sm:text-lg">
                    {card.title}
                  </h3>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Our Story */}
        <section
          id="story-section"
          data-scroll-reveal="true"
          className="scroll-mt-20 py-10 md:py-16"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center justify-center gap-5 mb-16 md:mb-24">
              <span className="mb-5 inline-flex items-center rounded-full bg-[#75cf4c]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#4b922e]">
                Our Story
              </span>
              <h2 className="mx-auto mb-6 max-w-3xl text-xl text-center font-bold leading-tight tracking-tight text-black sm:text-4xl">
                {StorySection.header}
              </h2>
              <p className="mx-auto max-w-4xl text-sm text-center leading-7 sm:text-lg sm:leading-8">
                {StorySection.paragraph}
              </p>
            </div>
            <div className="flex flex-col gap-16 md:gap-24">
              {AboutUsSection.map((section, index) => (
                <div
                  key={index}
                  data-scroll-reveal="true"
                  className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
                >
                  <div
                    className={`flex flex-col items-start ${
                      index % 2 === 0 ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="text-sm font-semibold tracking-widest text-[#4b922e]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-12 bg-[#75cf4c]" />
                    </div>
                    <h3 className="text-xl font-semibold leading-tight tracking-tight text-slate-900 md:text-2xl">
                      {section.title}
                    </h3>
                    <p className="mt-5 max-w-xl whitespace-pre-line text-sm leading-7 text-slate-600 md:text-base md:leading-8">
                      {section.desc}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((item, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#75cf4c]/15 font-semibold text-[#4b922e]"
                          >
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`relative w-full ${
                      index % 2 === 0 ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl border border-[#dcebd5] bg-gradient-to-br from-[#eaf7e5] to-[#f8fcf5]">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <span className="text-sm font-medium text-slate-500">
                          Image placeholder
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Marketplace showcase: its own section lives in MarketplaceShowcase.tsx */}
        <div data-scroll-reveal="true">
          <MarketplaceShowcase
            header={PublicMarketplaceSection.header}
            desc={PublicMarketplaceSection.desc}
          />
        </div>
        {/* FAQs */}
        <section
          id="faqs-section"
          data-scroll-reveal="true"
          className="scroll-mt-20 py-10 md:py-16"
        >
          <div className="flex flex-col">
            <h2 className="mx-auto mb-6 max-w-3xl text-2xl text-center font-bold leading-tight tracking-tight text-black sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="flex-col gap-4">
              {FAQsSection.map((items, index) => (
                <div key={index} className="border border-gray-100">
                  <div className="flex flex-row justify-between items-center p-5">
                    <p className="text-sm md:text-base">{items.question}</p>
                    <button
                      onClick={() => toggleCollapsible(index)}
                      className="hover:cursor-pointer p-1"
                    >
                      {openIndex === index ? (
                        <FaChevronUp size={15} />
                      ) : (
                        <FaChevronDown size={15} />
                      )}
                    </button>
                  </div>
                  <div
                    className={`grid transition-all duration-300 ease-in-out bg-gray-50 border-gray-100 text-gray-600 text-sm
                      ${
                        openIndex === index
                          ? "h-50 opacity-100 border-t"
                          : "h-0 opacity-0 border-t-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5">
                        <p>{items.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Call to action */}
        <section
          id="cta-section"
          data-scroll-reveal="true"
          className="scroll-mt-20 py-10 md:py-16"
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm md:text-lg font-semibold mb-3">
              {CTASection.tagline}
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              {CTASection.header}
            </h2>
            <button
              className="p-2.5 bg-[#75cf4c] text-center hover:-translate-y-1 text-white font-medium mt-10
            hover:bg-[#85d65c] active:bg-[#5fb33a] transition duration-300 ease-in-out cursor-pointer"
            >
              Start exploring
            </button>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer id="contact" className="w-full scroll-mt-20 bg-[#233e16] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.2fr_2fr_1.2fr] lg:gap-12 lg:px-12 lg:py-16">
          {/* Branding */}
          <div className="flex flex-col items-start gap-4">
            <p className="text-xl md:text-2xl font-bold tracking-wide text-[#71AA34]">
              Leaf<span className="text-white">Trade</span>
            </p>

            <p className="max-w-xs text-sm leading-6 text-gray-200">
              Connecting buyers and sellers, simply.
            </p>

            <div className="flex items-center gap-3">
              {FooterLogos.map((group) =>
                group.logos.map((url) => (
                  <SocialIcon
                    key={url}
                    url={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                    style={{ height: 32, width: 32 }}
                  />
                )),
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
          >
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-white">Products</h3>

              <div className="flex flex-col gap-2 text-sm text-gray-200">
                <a href="" className="hover:underline">
                  Browse
                </a>
                <a href="" className="hover:underline">
                  Sell
                </a>
                <a href="" className="hover:underline">
                  How it works
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-white">Company</h3>

              <div className="flex flex-col gap-2 text-sm text-gray-200">
                <a href="" className="hover:underline">
                  About
                </a>
                <a href="" className="hover:underline">
                  Contact
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-white">Support</h3>

              <div className="flex flex-col gap-2 text-sm text-gray-200">
                <a href="" className="hover:underline">
                  Help
                </a>
                <a href="" className="hover:underline">
                  FAQs
                </a>
              </div>
            </div>
          </nav>

          {/* Subscription */}
          <div className="flex min-w-0 flex-col gap-4">
            <h3 className="text-sm font-semibold text-white">Subscribe</h3>

            <form className="flex w-full max-w-md items-center">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>

              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="h-11 min-w-0 flex-1 bg-white px-4 text-sm text-slate-900 outline-none"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-12 shrink-0 cursor-pointer items-center justify-center bg-[#75cf4c] text-white transition-colors hover:bg-[#65bf3d]"
              >
                <FaChevronRight />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/15 px-6 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center text-xs text-gray-200 sm:flex-row sm:gap-3 sm:text-sm">
            <p>© 2026 LeafTrade</p>

            <span className="hidden sm:inline">|</span>

            <a href="" className="hover:underline">
              Privacy & Terms
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
