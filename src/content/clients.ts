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
export type Client = { name: string; role?: string; logo?: string };

export const showClients = true;

export const clients: Client[] = [
  { name: "Equall", role: "Founding Engineer", logo: "/clients/equall.png" },
];
