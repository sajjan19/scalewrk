"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { site } from "@/content/site";

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void };
  }
}

// Inline Calendly scheduler. Set your link in src/content/site.ts → calendlyUrl.
export function CalendlyEmbed({ height = 700 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const url = site.calendlyUrl;

  const init = useCallback(() => {
    if (!url || !ref.current || !window.Calendly) return;
    ref.current.innerHTML = "";
    const sep = url.includes("?") ? "&" : "?";
    window.Calendly.initInlineWidget({
      url: `${url}${sep}hide_gdpr_banner=1&primary_color=4f46e5`,
      parentElement: ref.current,
    });
  }, [url]);

  // Re-initialize when navigating back to the page (script already loaded)
  useEffect(() => {
    init();
  }, [init]);

  if (!url) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-8 text-center">
        <p className="font-medium text-amber-900">PLACEHOLDER: Calendly scheduler</p>
        <p className="mt-2 max-w-sm text-sm text-amber-800">
          Add your Calendly link in <code>src/content/site.ts</code> and the booking calendar will appear here.
        </p>
        <a href={`mailto:${site.email}?subject=Intro%20call`} className="mt-5 font-medium text-brand underline">
          Email {site.email} to book
        </a>
      </div>
    );
  }

  return (
    <>
      <div ref={ref} className="overflow-hidden rounded-2xl border border-line bg-white" style={{ minWidth: 300, height }} />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" onLoad={init} />
      <noscript>
        <a href={url}>Open the booking calendar</a>
      </noscript>
    </>
  );
}
