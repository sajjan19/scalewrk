import Link from "next/link";
import { Briefcase, ChevronRight, DollarSign, MapPin } from "lucide-react";
import { formatPosted, type Job } from "@/content/jobs";
import { CompanyLogo } from "./CompanyLogo";

// One job listing card (used on the Jobs page and the Home page)
export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="lift group flex items-stretch gap-4 rounded-2xl border border-line bg-white p-5 hover:border-brand/30 hover:shadow-[0_10px_30px_-15px_rgba(79,70,229,0.35)] sm:gap-5 sm:p-6"
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
        <span className="mt-3 flex flex-wrap items-center gap-2 text-sm text-body">
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
          <span className="text-xs text-muted">Posted {formatPosted(job.posted)}</span>
        </span>
      </span>
      <ChevronRight
        className="h-5 w-5 flex-none self-center text-muted transition group-hover:translate-x-0.5 group-hover:text-brand"
        aria-hidden="true"
      />
    </Link>
  );
}
