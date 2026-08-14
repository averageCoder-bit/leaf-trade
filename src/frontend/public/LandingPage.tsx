import * as FaIcons from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Logo from "../Logo";
import {
  HeroSection,
  FeaturesSection,
  BenefitsSection,
  AboutUsSection,
  StorySection,
  CTASection,
  FAQsSection,
} from "../utils/siteContent";
import { useState } from "react";

const LandingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleCollapsible = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const carousel = [
    { id: 1, icon: "FaLaptop", name: "Electronics" },
    { id: 2, icon: "FaTshirt", name: "Fashion" },
    { id: 3, icon: "FaCouch", name: "Home & Living" },
    { id: 4, icon: "FaGamepad", name: "Toy & Hobbies" },
    { id: 5, icon: "FaBookOpen", name: "Books & Media" },
    { id: 6, icon: "FaBasketballBall", name: "Sports & Outdoors" },
    { id: 7, icon: "FaScrewdriver", name: "Tools & Miscellaneous" },
  ];

  const Benefits = BenefitsSection;
  return (
    <>
      <main className="pt-10 md:pt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:space-y-10">
        <section>
          <div className="flex flex-col md:grid md:grid-cols-2 justify-center items-center min-h-165">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="flex flex-col gap-8 justify-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-wide whitespace-pre-line">
                  {HeroSection.slogan}
                </h1>
                <p className="text-sm md:text-lg whitespace-pre-line">
                  {HeroSection.subtitle}
                </p>
                <div className=" flex flex-col md:flex md:flex-row justify-start gap-3 mt-2">
                  <button
                    className="bg-[#75cf4c] text-center text-white font-medium rounded-3xl 
                  hover:bg-[#85d65c] active:bg-[#5fb33a] hover:cursor-pointer duration-300 w-full md:w-40 p-3 hover:-translate-y-1"
                  >
                    Get started
                  </button>

                  <button
                    className="text-center text-black border border-black hover:-translate-y-1 active:bg-gray-300 font-medium rounded-3xl 
                    hover:cursor-pointer duration-300 w-full md:w-40 p-3"
                  >
                    About us
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-yellow-600"></div>
          </div>
        </section>
        <section>
          <div className="flex flex-col gap-5 py-10">
            <h1 className="text-center text-2xl md:text-3xl font-semibold">
              {FeaturesSection.header}
            </h1>
            <div className="w-full overflow-x-hidden">
              <div className="animate-infinite-scroll flex flex-row gap-6 justify-start w-max overflow-y-hidden p-4">
                {carousel.map((item) => {
                  const IconComponent =
                    FaIcons[item.icon as keyof typeof FaIcons];
                  return (
                    <div
                      key={`original-${item.id}`}
                      className="flex flex-col shrink-0 hover:scale-105 duration-300 min-h-75 w-64 items-center p-3 gap-3 rounded-3xl border-black border"
                    >
                      {IconComponent && (
                        <IconComponent className="text-gray-500" />
                      )}
                      <span className="text-lg">{item.name}</span>
                    </div>
                  );
                })}

                {carousel.map((item) => {
                  const IconComponent =
                    FaIcons[item.icon as keyof typeof FaIcons];
                  return (
                    <div
                      key={`duplicate-${item.id}`}
                      className="flex flex-col shrink-0 hover:scale-105 duration-300 min-h-75 w-64 items-center p-3 gap-3 rounded-3xl border-black border"
                    >
                      {IconComponent && (
                        <IconComponent className="text-gray-500" />
                      )}
                      <span className="text-lg">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col gap-4 justify-center md:grid md:grid-cols-3 justify-items-center py-10">
            {Benefits.map((card) => (
              <div className="flex flex-col gap-3 w-full p-4 border-2 border-gray-100 rounded-2xl shadow-2xs">
                <div className="flex flex-row items-center gap-3">
                  <card.icon size={20} className="text-[#75cf4c]" />

                  <h4 className="font-semibold text-sm md:text-base">
                    {card.title}
                  </h4>
                </div>
                <p className="whitespace-pre-line text-xs md:text-base">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="flex flex-col py-10 gap-5">
            <div className="flex flex-col justify-center items-center gap-5 py-12">
              <h1 className="text-center text-3xl font-semibold">
                {StorySection.header}
              </h1>
              <p className="text-center">{StorySection.paragraph}</p>
            </div>
            <div className="grid grid-rows-2 md:p-0 gap-10">
              {AboutUsSection.map((section) => (
                <div className="flex flex-col md:flex-row md:odd:flex-row-reverse items-center md:justify-between gap-12 py-12">
                  <div className="flex flex-col gap-3 max-w-xl">
                    <h1 className="font-semibold text-lg">{section.title}</h1>
                    <p className="whitespace-pre-line">{section.desc}</p>
                    <ul className="list-disc list-inside">
                      {section.bullets.map((i) => (
                        <li>{i}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full max-w-md bg-gray-100 h-64 flex items-center justify-center rounded">
                    <span>image placeholder</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col gap-5">
            <h1 className="text-center text-2xl md:text-3xl font-semibold">
              Frequently Asked Questions
            </h1>
            <div className="flex-col gap-4">
              {FAQsSection.map((items, index) => (
                <div
                  key={items.question || index}
                  className="border border-gray-100"
                >
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
        <section>
          <div className="flex flex-col justify-center items-center py-10 my-10">
            <p className="text-sm md:text-lg font-semibold mb-3">
              {CTASection.tagline}
            </p>
            <h1 className="text-2xl md:text-4xl font-bold text-center">
              {CTASection.header}
            </h1>
            <button
              className="p-2.5 bg-[#75cf4c] text-center hover:-translate-y-1 text-white font-medium mt-10 mb-10
            hover:bg-[#85d65c] active:bg-[#5fb33a] transition duration-300 ease-in-out cursor-pointer"
            >
              Start exploring
            </button>
          </div>
        </section>
      </main>
      <footer className="w-full bg-[#233e16]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 justify-items-start py-12">
          <div className="flex flex-col">
            <Logo hasLogo={false} />
            <div className="flex flex-row justify-start items-center"></div>
          </div>
          <div className="flex flex-col gap-4 text-white">
            <h1 className="font-semibold">Products</h1>
            <div className="grid grid-rows-3 gap-1">
              <a className="hover:underline" href="">
                Browse
              </a>
              <a className="hover:underline" href="">
                Sell
              </a>
              <a className="hover:underline" href="">
                How it works
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-white">
            <h1 className="font-semibold">Company</h1>
            <div className="grid grid-rows-3 gap-1">
              <a className="hover:underline" href="">
                About
              </a>
              <a className="hover:underline" href="">
                Contact
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-white">
            <h1 className="font-semibold">Support</h1>
            <div className="grid grid-rows-3 gap-1">
              <a className="hover:underline" href="">
                Help
              </a>
              <a className="hover:underline" href="">
                FAQs
              </a>
            </div>
          </div>

          <div className="text-white">
            <h1 className="font-semibold">Subscribe</h1>
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-center gap-1 py-10 border-t border-black text-white text-sm">
          <p>© 2026 LeafTrade</p>
          <a href="">Privacy & Terms</a>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
