import Link from "next/link";
import { roles, showRolesPage } from "@/content/roles";
import { IconBadge } from "./visuals";
import { Arrow } from "./ui";

// A short preview of the kinds of roles we hire (the `featured` roles in roles.ts).
// While the Roles page is off, the tiles are plain cards; when it's on, each links to its role.
export function RoleTiles() {
  return (
    <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {roles
        .filter((r) => r.featured)
        .map((role) => {
          const inner = (
            <>
              <IconBadge icon={role.icon} />
              <span className="flex min-w-0 flex-1 items-center justify-between gap-2 font-semibold">
                {role.name}
                {showRolesPage && (
                  <span className="text-muted transition-colors group-hover:text-brand">
                    <Arrow />
                  </span>
                )}
              </span>
            </>
          );
          const box = "flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-4 sm:p-5";
          return (
            <li key={role.slug}>
              {showRolesPage ? (
                <Link href={`/roles#${role.slug}`} className={`lift group ${box} hover:border-brand/30`}>
                  {inner}
                </Link>
              ) : (
                <div className={box}>{inner}</div>
              )}
            </li>
          );
        })}
    </ul>
  );
}

// "See all roles →" link, only while the Roles page is on
export function SeeAllRolesLink() {
  if (!showRolesPage) return null;
  return (
    <Link href="/roles" className="shrink-0 inline-flex items-center gap-2 nudge font-medium text-brand hover:text-brand-dark">
      See all {roles.length} roles <Arrow />
    </Link>
  );
}
