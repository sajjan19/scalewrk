import Image from "next/image";

/*
  Company logo on job cards and job pages.
  With a `logo` (e.g. "/companies/acme.svg" in /public/companies/), shows the image.
  Without one, shows a placeholder tile with the company's initial.
*/
export function CompanyLogo({ name, logo, size = "md" }: { name: string; logo?: string; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-16 w-16 rounded-2xl text-2xl" : "h-12 w-12 rounded-xl text-lg";
  if (logo) {
    return (
      <span className={`flex flex-none items-center justify-center overflow-hidden border border-line bg-white ${box}`}>
        <Image src={logo} alt={`${name} logo`} width={64} height={64} className="h-full w-full object-contain p-1.5" />
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
