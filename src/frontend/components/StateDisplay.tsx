import { type ReactNode } from "react";

interface StateDisplayProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

const StateDisplay = ({
  icon,
  title,
  description,
  action,
}: StateDisplayProps) => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="text-gray-400">{icon}</div>

      <div className="flex flex-col items-center gap-2">
        <h2 className="text-base font-semibold text-gray-800 md:text-lg">
          {title}
        </h2>

        <p className="max-w-sm text-sm text-gray-500 md:text-base">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
};

export default StateDisplay;
