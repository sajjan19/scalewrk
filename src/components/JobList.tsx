"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { visibleJobs } from "@/content/jobs";
import { roles } from "@/content/roles";
import { JobCard } from "./JobCard";
import { Arrow } from "./ui";

// Job cards with Role, Location and Work style filters (used on the Jobs page)
export function JobList() {
  // A link like /jobs?role=backend or /jobs?location=New York, NY opens with that filter already selected
  const params = useSearchParams();
  const initialRole = params.get("role");
  const initialLocation = params.get("location");
  const [role, setRole] = useState(
    initialRole && visibleJobs.some((j) => j.role === initialRole) ? initialRole : "all",
  );
  const [location, setLocation] = useState(
    initialLocation && visibleJobs.some((j) => j.location === initialLocation) ? initialLocation : "all",
  );
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
          <button type="button" onClick={clear} className="rise font-medium text-brand hover:text-brand-dark">
            Clear filters
          </button>
        )}
      </div>

      {shown.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-brand/30 bg-white p-8 text-center">
          <p className="text-lg font-semibold">No jobs match those filters</p>
          <p className="mt-1 text-body">Try fewer filters, or share your profile and we&apos;ll reach out when one fits.</p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={clear} className="lift rounded-xl bg-white px-5 py-2.5 font-medium ring-1 ring-line hover:ring-ink/30">
              Clear filters
            </button>
            <Link href="/share-profile" className="btn-brand lift rounded-xl px-5 py-2.5 font-medium">
              Share your profile
            </Link>
          </div>
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {shown.map((job) => {
          return (
            <li key={job.slug}>
              <JobCard job={job} />
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
            href="/share-profile"
            className="mt-4 inline-flex items-center gap-2 nudge font-medium text-brand hover:text-brand-dark sm:mt-0 sm:shrink-0"
          >
            Share your profile <Arrow />
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
