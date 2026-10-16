import Link from "next/link";
import { site } from "@/content/site";
import { hasOpenJobs } from "@/content/jobs";
import { showRolesPage } from "@/content/roles";
import { cities } from "@/content/cities";
import { Logo } from "./Logo";
import { MailIcon, PhoneIcon, SocialIcon, type SocialNetwork } from "./SocialIcons";

// Footer page links (every main page, including the ones inside the top-menu dropdowns)
const footerLinks = [
  { href: "/startups", label: "For Startups" },
  ...(showRolesPage ? [{ href: "/roles", label: "Roles" }] : []), // only while the Roles page is on
  { href: "/engineers", label: "For Candidates" },
  ...(hasOpenJobs ? [{ href: "/jobs", label: "Jobs" }] : []), // only while there are jobs
  { href: "/share-profile", label: "Share your profile" },
  { href: "/about", label: "About" },
  { href: "/about#mission", label: "Mission & Vision" },
  { href: "/contact", label: "Contact" },
  { href: "/testimonial", label: "Leave a testimonial" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink pb-24 text-white/70 lg:pb-0">
      {/* Logo gradient for footer icons on hover (see .link-gradient in globals.css) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="brand-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7a2ff5" />
            <stop offset="1" stopColor="#0d6efd" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs leading-relaxed">
            Tech recruiting for growing startups across the US and Canada, from seed through Series C and beyond.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="rise mt-5 flex w-fit items-center gap-3 text-white link-gradient"
          >
            <MailIcon className="h-4 w-4" />
            {site.email}
          </a>
          <a
            href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
            className="rise mt-3 flex w-fit items-center gap-3 text-white link-gradient"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
        </div>

        <div>
          <p className="text-sm font-medium text-white/60">Company</p>
          <ul className="mt-4 space-y-3">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rise inline-block text-white link-gradient">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-white/60">Cities</p>
          <ul className="mt-4 space-y-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/tech-recruiter-${c.slug}`} className="rise inline-block text-white link-gradient">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-white/60">Follow</p>
          <ul className="mt-4 space-y-3">
            {(
              [
                { network: "linkedin", href: site.social.linkedin, label: "LinkedIn" },
                { network: "x", href: site.social.x, label: "X (Twitter)" },
                { network: "instagram", href: site.social.instagram, label: "Instagram" },
                { network: "facebook", href: site.social.facebook, label: "Facebook" },
              ] as { network: SocialNetwork; href: string; label: string }[]
            ).map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rise inline-flex items-center gap-3 text-white link-gradient"
                >
                  <SocialIcon network={link.network} className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-sm sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <Link href="/privacy" className="rise inline-block link-gradient">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
