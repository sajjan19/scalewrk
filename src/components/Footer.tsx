import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink pb-24 text-white/70 lg:pb-0">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs leading-relaxed">
            Tech recruiting for venture-backed startups across the US, from seed through Series C and beyond.
          </p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block text-white hover:underline">
            {site.email}
          </a>
        </div>

        <div>
          <p className="text-sm font-medium text-white">Company</p>
          <ul className="mt-4 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-white">Follow</p>
          <ul className="mt-4 space-y-3">
            {[
              { href: site.social.linkedin, label: "LinkedIn" },
              { href: site.social.x, label: "X (Twitter)" },
              { href: site.social.instagram, label: "Instagram" },
              { href: site.social.facebook, label: "Facebook" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
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
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
