import Image from "next/image";

/*
  Company logo on job cards and job pages.
  With a `logo` (e.g. "/companies/acme.svg" in /public/companies/), shows the image.
  Without one, shows a placeholder tile with the company's initial.
*/
export function CompanyLogo({ name, logo, size = "md" }: { name: string; logo?: string; size?: "md" | "lg" | "fill" }) {
  // "fill": a square as tall as the job card's content (title, company and tags), so it lines up with the card padding
  const box = {
    md: "h-12 w-12 rounded-xl text-lg",
    lg: "h-16 w-16 rounded-2xl text-2xl",
    fill: "h-16 w-16 self-center rounded-xl text-2xl sm:h-[94px] sm:w-[94px] sm:text-3xl",
  }[size];
  if (logo) {
    return (
      <span className={`flex flex-none items-center justify-center overflow-hidden border border-line bg-white ${box}`}>
        <Image src={logo} alt={`${name} logo`} width={128} height={128} className="h-full w-full object-contain p-2" />
      </span>
    );
  }
  // "Company A" → "A"
  const initial = name.replace(/^company\s+/i, "").charAt(0).toUpperCase() || "?";
  return (
    <span
      className={`flex flex-none items-center justify-center border border-dashed border-brand/30 bg-gradient-to-br from-brand-soft to-white font-semibold text-brand ${box}`}
      title="Placeholder logo"
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
