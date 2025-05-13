import React from "react";

export const SectionContainer = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <section className="space-y-4 border-0 ">
      <h3 className="text-lg font-semibold tracking-tight text-gray-900">
        {title}
      </h3>
      <div className="flex flex-col space-y-4 border-l pl-4 border-neutral-400 border-solid">
        {children}
      </div>
    </section>
  );
};
