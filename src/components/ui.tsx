/*
  Small building blocks used on every page: buttons, section wrappers, headings.
*/
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "brand";
  className?: string;
};

const buttonStyles = {
  primary: "bg-ink text-white hover:bg-ink/85",
  secondary: "btn-outline border-2 border-ink bg-transparent text-ink hover:bg-ink/5", // see-through with a black outline that turns purple-to-blue on hover (globals.css)
  light: "bg-white text-ink hover:bg-white/90",
  brand: "btn-brand", // logo gradient, used for every "Book a call" button
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = `btn lift inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-medium ${buttonStyles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

// Calendar icon used on every "Book a call" button
export function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="arrow h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist";
  id?: string;
}) {
  return (
    <section id={id} className={`py-12 sm:py-24 ${tone === "mist" ? "bg-mist" : "tone-white"} ${className}`}>
      {/* reveal-group: content fades and slides in as it scrolls into view (see globals.css) */}
      <Container className="reveal-group">{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-sm font-medium text-brand">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-4xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-body text-pretty">{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b border-line pt-12 pb-14 sm:pt-20 sm:pb-20">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body text-pretty sm:text-xl">{intro}</p>
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </Container>
    </section>
  );
}

/*
  Renders text, turning anything in [square brackets] into a highlighted
  placeholder so it can't be missed before launch.
*/
export function Text({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span key={i} className="placeholder">
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 flex-none text-brand" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M5 10.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckList({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-body">
          <CheckIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
