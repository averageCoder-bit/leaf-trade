import { LuLeaf } from "react-icons/lu";

interface LogoProps {
  hasLogo?: boolean;
}

const Logo = ({ hasLogo = true }: LogoProps) => {
  return (
    <div className="inline-flex items-center gap-2">
      {hasLogo && (
        <LuLeaf
          size={32}
          strokeWidth={1.8}
          className="shrink-0 text-[#75cf4c]"
          aria-hidden="true"
        />
      )}

      <p className="text-xl md:text-2xl font-bold tracking-wide text-[#71AA34]">
        Leaf<span className="text-black">Trade</span>
      </p>
    </div>
  );
};

export default Logo;
