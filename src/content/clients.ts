/*
  STARTUPS WE'VE HIRED FOR (client list on the Home page)
  ───────────────────────────────────────────────────────
  Only add real clients who have agreed to be listed.

  `showClients`:
    false → hidden on the live site (it still shows in the local preview so you can see the design)
    true  → shown everywhere

  `logo` is optional: put an SVG or PNG in /public/clients/ (e.g. "/clients/acme.svg").
  Without a logo, the company name is shown as text.
*/

export type Client = { name: string; logo?: string };

export const showClients = false;

export const clients: Client[] = [
  { name: "[PLACEHOLDER: client]" },
  { name: "[PLACEHOLDER: client]" },
  { name: "[PLACEHOLDER: client]" },
  { name: "[PLACEHOLDER: client]" },
  { name: "[PLACEHOLDER: client]" },
  { name: "[PLACEHOLDER: client]" },
];
