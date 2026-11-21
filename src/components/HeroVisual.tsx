"use client";

import { useSyncExternalStore } from "react";
import { HeroNetwork } from "./HeroNetwork";
import { HeroMap } from "./HeroMap";
import { HeroNotifications } from "./HeroNotifications";

/*
  The picture on the right of the Home hero (between the subheading and buttons on phones).
  Three options to compare:
    "network"        the S with role and stage pills (HeroNetwork.tsx)
    "map"            the US and Canada at night with glowing links (HeroMap.tsx)
    "notifications"  updates from a search sliding in (HeroNotifications.tsx)
  `defaultHeroVisual` is what everyone sees. To preview another one, add ?hero=map or
  ?hero=notifications to the Home page address (works on the live site too).
*/
export const defaultHeroVisual: HeroVisualName = "network";

type HeroVisualName = "network" | "map" | "notifications";
const names: HeroVisualName[] = ["network", "map", "notifications"];

// Reads ?hero= from the address. The server (and the first paint) always uses the default.
function useHeroVisual() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      const asked = new URLSearchParams(window.location.search).get("hero");
      return names.includes(asked as HeroVisualName) ? (asked as HeroVisualName) : defaultHeroVisual;
    },
    () => defaultHeroVisual,
  );
}

export function HeroVisual({ phone = false, className = "" }: { phone?: boolean; className?: string }) {
  const visual = useHeroVisual();
  // The size limit passed in is for the S illustration; the map and the cards use the full width on phones
  if (visual === "map") return <HeroMap className={phone ? "" : className} />;
  if (visual === "notifications") return <HeroNotifications className={phone ? "" : className} />;
  return <HeroNetwork phone={phone} className={className} />;
}
