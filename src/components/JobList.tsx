"use client";

import Link from "next/link";
import { Briefcase, ChevronDown, ChevronRight, DollarSign, MapPin } from "lucide-react";
import { useState } from "react";
import { visibleJobs } from "@/content/jobs";
import { roles } from "@/content/roles";

// Job cards with a role filter dropdown (used on the Jobs page)
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3">
          <span className="text-sm font-medium whitespace-nowrap">Filter by role</span>
          <span className="relative w-full sm:w-72">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-brand/20 bg-white py-2.5 pr-10 pl-4 text-[15px] font-medium text-brand-dark shadow-sm transition hover:border-brand/40 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            >
              <option value="all">All roles</option>
              {filters.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {f.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-brand" aria-hidden="true" />
          </span>
        </label>
        <p className="text-sm text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "job" : "jobs"}
        </p>
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
