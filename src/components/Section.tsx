import { PropsWithChildren } from "react";

export default function Section({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`w-full max-w-5xl mx-auto py-12 px-4 ${className}`}>
      {children}
    </section>
  );
}
