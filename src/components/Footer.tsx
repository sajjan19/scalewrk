import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { MailIcon, PhoneIcon, SocialIcon, type SocialNetwork } from "./SocialIcons";

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
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
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
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rise inline-block text-white link-gradient">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="rise inline-block text-white link-gradient">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/testimonial" className="rise inline-block text-white link-gradient">
                Leave a testimonial
              </Link>
            </li>
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
