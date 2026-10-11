"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, ChevronDown, ChevronRight, DollarSign, MapPin } from "lucide-react";
import { useState } from "react";
import { visibleJobs } from "@/content/jobs";
import { roles } from "@/content/roles";
import { CompanyLogo } from "./CompanyLogo";

// Job cards with Role, Location and Work style filters (used on the Jobs page)
export function JobList() {
  const [role, setRole] = useState("all");
  const [location, setLocation] = useState("all");
  const [workType, setWorkType] = useState("all");

  // Build filter options from the jobs, so we never offer an option with no jobs
  const roleOptions = roles
    .filter((r) => visibleJobs.some((j) => j.role === r.slug))
    .map((r) => ({ value: r.slug, label: r.name }));
  const cities = [...new Set(visibleJobs.filter((j) => j.workType !== "Remote").map((j) => j.location))].sort();
  const locationOptions = cities.map((c) => ({ value: c, label: c }));
  const workTypeOptions = (["Remote", "Hybrid", "In office"] as const)
    .filter((w) => visibleJobs.some((j) => j.workType === w))
    .map((w) => ({ value: w, label: w }));

  const shown = visibleJobs.filter(
    (j) =>
      (role === "all" || j.role === role) &&
      // Remote jobs count for every location
      (location === "all" || j.location === location || j.workType === "Remote") &&
      (workType === "all" || j.workType === workType),
  );

  const filtered = role !== "all" || location !== "all" || workType !== "all";
  const clear = () => {
    setRole("all");
    setLocation("all");
    setWorkType("all");
  };

  if (visibleJobs.length === 0) {
    return <p className="rounded-2xl border border-line p-6 text-body">No open roles right now. Share your profile and we&apos;ll reach out when one fits.</p>;
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <FilterSelect label="Role" value={role} onChange={setRole} allLabel="All roles" options={roleOptions} />
        <FilterSelect label="Location" value={location} onChange={setLocation} allLabel="All locations" options={locationOptions} />
        <FilterSelect label="Work style" value={workType} onChange={setWorkType} allLabel="Any work style" options={workTypeOptions} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <p className="text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "job" : "jobs"}
          {location !== "all" && (workType === "all" || workType === "Remote") && " (including remote)"}
        </p>
        {filtered && (
          <button type="button" onClick={clear} className="font-medium text-brand hover:text-brand-dark">
            Clear filters
          </button>
        )}
      </div>

      {shown.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-brand/30 bg-white p-8 text-center">
          <p className="text-lg font-semibold">No jobs match those filters</p>
          <p className="mt-1 text-body">Try fewer filters, or share your profile and we&apos;ll reach out when one fits.</p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={clear} className="rounded-xl px-5 py-2.5 font-medium ring-1 ring-line hover:ring-ink/30">
              Clear filters
            </button>
            <Link href="/engineers#apply" className="btn-brand rounded-xl px-5 py-2.5 font-medium">
              Share your profile
            </Link>
          </div>
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {shown.map((job) => {
          return (
            <li key={job.slug}>
              <Link
                href={`/jobs/${job.slug}`}
                className="group flex items-stretch gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-brand/30 hover:shadow-[0_10px_30px_-15px_rgba(79,70,229,0.35)] sm:gap-5 sm:p-6"
              >
                <CompanyLogo name={job.companyName} logo={job.companyLogo} size="fill" />
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
                    <span className="font-medium text-ink">{job.companyName}</span> · {job.stage} · {job.company}
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
                <ChevronRight className="h-5 w-5 flex-none self-center text-muted transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>

      {shown.length > 0 && (
        <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-line sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-semibold">Don&apos;t see the right role?</p>
            <p className="mt-1 text-body">Share your profile. We&apos;ll reach out when a startup fits what you want.</p>
          </div>
          <Link
            href="/engineers#apply"
            className="mt-4 inline-flex items-center gap-2 font-medium text-brand hover:text-brand-dark sm:mt-0 sm:shrink-0"
          >
            Share your profile <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  allLabel,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
  options: { value: string; label: string }[];
}) {
  const active = value !== "all";
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full cursor-pointer appearance-none rounded-xl border bg-white py-2.5 pr-10 pl-4 text-[15px] font-medium shadow-sm transition focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none ${
            active ? "border-brand/50 text-brand-dark ring-1 ring-brand/20" : "border-line text-ink hover:border-brand/40"
          }`}
        >
          <option value="all">{allLabel}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-brand" aria-hidden="true" />
      </span>
    </label>
  );
}
