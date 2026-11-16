import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  mobileAction?: ReactNode;
  mobileContent?: ReactNode;
  sticky?: boolean;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  actions,
  mobileAction,
  mobileContent,
  sticky = false,
  className = "",
}: PageHeaderProps) => {
  return (
    <header
      className={[
        "z-10 mb-5 w-full shrink-0 bg-white px-3 pb-2 md:px-6 md:pb-4",
        sticky ? "sticky top-0" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Main header row */}
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
            {title}
          </h1>

          {description && (
            <p className="hidden text-sm text-gray-500 md:block">
              {description}
            </p>
          )}
        </div>

        {/* Mobile action: next to title */}
        {mobileAction && (
          <div className="flex shrink-0 items-center md:hidden">
            {mobileAction}
          </div>
        )}

        {/* Desktop actions */}
        {actions && (
          <div className="hidden min-w-0 items-center md:flex">{actions}</div>
        )}
      </div>

      {/* Expandable mobile controls */}
      {mobileContent && (
        <div className="mt-3 w-full md:hidden">{mobileContent}</div>
      )}
    </header>
  );
};

export default PageHeader;
