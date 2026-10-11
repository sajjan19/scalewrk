"use client";

import Link from "next/link";
import { Briefcase, ChevronRight, DollarSign, MapPin } from "lucide-react";
import { useState } from "react";
import { visibleJobs } from "@/content/jobs";
import { roles } from "@/content/roles";

// Job cards with filter buttons by role type (used on the Roles page)
export function JobList() {
  const [filter, setFilter] = useState("all");

  // Only show filters for role types that have jobs
  const filters = roles.filter((r) => visibleJobs.some((j) => j.role === r.slug));
  const shown = filter === "all" ? visibleJobs : visibleJobs.filter((j) => j.role === filter);

  if (visibleJobs.length === 0) {
    return <p className="rounded-2xl border border-line p-6 text-body">No open roles right now. Share your profile and we&apos;ll reach out when one fits.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by role">
        {[{ slug: "all", name: "All roles" }, ...filters].map((f) => {
          const active = filter === f.slug;
          return (
            <button
              key={f.slug}
              type="button"
              onClick={() => setFilter(f.slug)}
              aria-pressed={active}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                active ? "btn-brand" : "bg-brand-soft text-brand-dark ring-1 ring-brand/15 hover:bg-brand/15"
              }`}
            >
              {f.name}
            </button>
          );
        })}
      </div>

      <ul className="mt-6 space-y-3">
        {shown.map((job) => {
          const role = roles.find((r) => r.slug === job.role);
          const Icon = role?.icon ?? Briefcase;
          return (
            <li key={job.slug}>
              <Link
                href={`/jobs/${job.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-brand/30 hover:shadow-[0_10px_30px_-15px_rgba(79,70,229,0.35)] sm:gap-5 sm:p-6"
              >
                <span className="hidden h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-soft text-brand sm:flex">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-semibold group-hover:text-brand">{job.title}</span>
                    {job.example && (
                      <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                        Example listing
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-body">
                    {job.stage} · {job.company}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-2 text-sm text-body">
                    <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1">
                      <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1">
                      <Briefcase className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                      {job.workType}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1">
                      <DollarSign className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                      {job.salary}
                    </span>
                  </span>
                </span>
                <ChevronRight className="h-5 w-5 flex-none text-muted transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
