/*
  STARTUPS WE'VE HIRED FOR (client list on the Home page)
  ───────────────────────────────────────────────────────
  Only add real clients who have agreed to be listed.

  `showClients`:
    true  → shown on the site
    false → hidden on the live site (still shows in the local preview)
  While any name is still in [square brackets], visitors see a "placeholder" note.

  `logo` is optional: put an SVG or PNG in /public/clients/ (e.g. "/clients/acme.svg").
  Without a logo, the company name is shown as text.
*/

export type Client = { name: string; logo?: string };

export const showClients = true;

// Replace "[Client 1]" etc. with real names (remove the square brackets).
export const clients: Client[] = [
  { name: "[Client 1]" },
  { name: "[Client 2]" },
  { name: "[Client 3]" },
  { name: "[Client 4]" },
  { name: "[Client 5]" },
];
