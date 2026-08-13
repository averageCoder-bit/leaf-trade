import * as FaIcons from "react-icons/fa";
import {
  FaStoreAlt,
  FaAddressBook,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
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
  return (
    <>
      <main className="pt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <section>
          <div className="grid grid-cols-2 min-h-165">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="flex flex-col gap-8">
                <h1 className="text-6xl font-bold tracking-wide whitespace-pre-line">
                  {HeroSection.slogan}
                </h1>
                <p className="text-xl font-semibold whitespace-pre-line">
                  {HeroSection.subtitle}
                </p>
                <div className="flex flex-row mt-2 gap-3">
                  <button
                    className="bg-[#75cf4c] text-center text-white font-medium rounded-3xl 
            hover:bg-[#85d65c] active:bg-[#5fb33a] hover:cursor-pointer duration-300 w-40 p-3 hover:-translate-y-1"
                  >
                    Get started
                  </button>

                  <button
                    className="text-center text-black border border-black hover:-translate-y-1 active:bg-gray-300 font-medium rounded-3xl 
            hover:cursor-pointer duration-300 w-40 p-3"
                  >
                    About us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col gap-5">
            <h1 className="text-center text-3xl font-semibold">
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
          <div className="flex flex-col py-7 gap-40 mt-20">
            <div className="grid grid-cols-3 justify-items-center">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-3">
                  <FaStoreAlt size={30} className="text-[#75cf4c]" />
                  <h4 className="font-semibold">{BenefitsSection[0].title}</h4>
                </div>
                <p className="whitespace-pre-line">{BenefitsSection[0].desc}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-3">
                  <FaAddressBook size={30} className="text-[#75cf4c]" />
                  <h4 className="font-semibold">{BenefitsSection[1].title}</h4>
                </div>
                <p className="whitespace-pre-line">{BenefitsSection[1].desc}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-3">
                  <FaMoneyBillWave size={30} className="text-[#75cf4c]" />
                  <h4 className="font-semibold">{BenefitsSection[2].title}</h4>
                </div>

                <p className="whitespace-pre-line">{BenefitsSection[2].desc}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <h1 className="text-center text-3xl font-semibold">
                {StorySection.header}
              </h1>
              <p className="text-center">{StorySection.paragraph}</p>
            </div>
            <div className="grid grid-rows-2 gap-40">
              <div className="grid grid-cols-2 justify-items-center gap-4">
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-lg">
                    {AboutUsSection[0].title}
                  </h1>
                  <p className="whitespace-pre-line">
                    {AboutUsSection[0].desc}
                  </p>
                  <ul className="list-disc list-inside">
                    {AboutUsSection[0].bullets.map((i) => (
                      <li>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 justify-items-center gap-4">
                <div></div> {/* For reversing the order */}
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-lg">
                    {AboutUsSection[1].title}
                  </h1>
                  <p className="whitespace-pre-line">
                    {AboutUsSection[1].desc}
                  </p>
                  <ul className="list-disc list-inside">
                    {AboutUsSection[1].bullets.map((i) => (
                      <li>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col gap-5">
            <h1 className="text-center text-3xl font-semibold">
              Frequently Asked Questions
            </h1>
            <div className="flex-col gap-4">
              {FAQsSection.map((items, index) => (
                <>
                  <div
                    key={items.question || index}
                    className="flex flex-row justify-between items-center border border-gray-100 p-5"
                  >
                    <p>{items.question} </p>
                    <button
                      onClick={() => toggleCollapsible(index)}
                      className="hover:cursor-pointer"
                    >
                      {openIndex === index ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </div>
                  {openIndex === index && (
                    <div className="p-4 border-t h-50 border-gray-100 bg-gray-50 text-gray-600 text-sm">
                      <p>{items.answer}</p>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col justify-center items-center py-10 my-10">
            <p className="text-lg font-semibold mb-3">{CTASection.tagline}</p>
            <h1 className="text-4xl font-bold text-center">
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
      <footer>
        <div className="flex flex-col bg-[#233e16]">
          <div className="grid grid-cols-5 justify-items-center py-10">
            <div>
              <Logo hasLogo={false} />
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
          <div className="flex flex-row w-full items-center justify-center gap-1 py-4 text-white text-sm">
            <p>© 2026 LeafTrade</p>
            <a href="">Privacy & Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
