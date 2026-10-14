/*
  RECENT PLACEMENTS (client list on the Home page)
  ────────────────────────────────────────────────
  Only add real clients who have agreed to be listed.

  `showClients`:
    true  → shown on the site
    false → hidden on the live site (still shows in the local preview)
  While any name is still in [square brackets], visitors see a "placeholder" note.

  `logo` is optional: a square icon in /public/clients/ (e.g. "/clients/acme.png"), shown next to the name.
*/

// `role`: the role we filled there, shown under the name.
// `url`: their website. The card links there in a new tab.
// `stage`, `industry`, `location`: small tags under the role. Use [square brackets] for anything not confirmed yet.
export type Client = {
  name: string;
  role?: string;
  logo?: string;
  url?: string;
  stage?: string;
  industry?: string;
  location?: string;
};

export const showClients = true;

export const clients: Client[] = [
  {
    name: "Equall",
    role: "Founding Engineer",
    logo: "/clients/equall.png",
    url: "https://equall.com/",
    stage: "Seed",
    industry: "Legal AI / LegalTech",
    location: "On-site, New York",
  },
];
