import { FaLeaf } from "react-icons/fa";
interface ComponentProps {
  hasLogo?: boolean;
}
const Logo = ({ hasLogo = true }: ComponentProps) => {
  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        {hasLogo ? (
          <div className="rounded-xl shadow-2xl shadow-black p-2">
            <FaLeaf className="text-[#75cf4c] size-5 md:size-6" />
          </div>
        ) : null}

        <p className="text-xl md:text-2xl font-bold tracking-wide text-[#71AA34]">
          Leaf<span className="text-black">Trade</span>
        </p>
      </div>
    </>
  );
};

export default Logo;
