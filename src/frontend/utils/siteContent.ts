import { FaStoreAlt, FaAddressBook, FaMoneyBillWave } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
interface HeroSectionComponents {
  slogan: string;
  subtitle: string;
}

interface FeaturesComponents {
  header: string;
}

interface BenefitsComponents {
  title: string;
  desc: string;
  icon: any;
}

interface AboutComponents {
  title: string;
  desc: string;
  bullets: string[];
}

interface StoryComponents {
  header: string;
  paragraph: string;
}

interface CTACOmponents {
  tagline: string;
  header: string;
}

interface FAQsComponents {
  question: string;
  answer: string;
}

interface FooterLogoComponents {
  logos: string[];
}

export const BenefitsSection: BenefitsComponents[] = [
  {
    title: "Simple Marketplace",
    desc: "Find everyday products without the clutter of traditional marketplaces",
    icon: FaStoreAlt,
  },
  {
    title: "Smarter Listings",
    desc: "Create clear, structured listings with less effort.",
    icon: FaAddressBook,
  },
  {
    title: "Buy with confidence",
    desc: "Get useful information to help you make better purchasing decisions.",
    icon: FaMoneyBillWave,
  },
];

export const HeroSection: HeroSectionComponents = {
  slogan: "Connected by our roots, growing together and trading naturally",
  subtitle:
    "A simpler marketplace where people connect through\n what they have and what they need",
};

export const FeaturesSection: FeaturesComponents = {
  header: "Everything you need to buy and sell with confidence",
};

export const AboutUsSection: AboutComponents[] = [
  {
    title: "A marketplace made for straightforward buying and selling",
    desc: "LeafTrade keeps buying and selling simple by removing unnecessary visual noise. \nBuyers can easily discover local products, while sellers can create clear, \norganized listings without filling out lengthy forms.",
    bullets: [
      "Discover and list products quickly",
      "Browse organized categories",
      "Find sellers around you",
      "Reach more potential buyers easily",
    ],
  },
  {
    title: "Understand your marketplace activity",
    desc: "LeafTrade gives you a personalized dashboard that brings\n your buying and selling activity into one place.",
    bullets: [
      "Track your activity",
      "See useful insights",
      "Personalized experience",
    ],
  },
];

export const StorySection: StoryComponents = {
  header: "Every leaf is part of something bigger",
  paragraph:
    "LeafTrade is built around a simple idea: every person is a leaf, connected to others through the branches of a larger community.\nWhat you have may be useful to someone else. What someone else has may be exactly what you need. LeafTrade brings those connections together through a simpler way to buy and sell.",
};

export const CTASection: CTACOmponents = {
  tagline: "Ready to keep it simple?",
  header: "Make your next trade with LeafTrade.",
};

export const FAQsSection: FAQsComponents[] = [
  { question: "Placeholder question", answer: "Placeholder ans." },
  { question: "Placeholder question", answer: "Placeholder ans." },
];

export const FooterLogos: FooterLogoComponents[] = [
  { logos: ["https://instagram.com", "https://facebook.com"] },
];
