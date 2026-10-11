"use client";

import { useSearchParams } from "next/navigation";
import { jobs } from "@/content/jobs";

// On the engineers form: if the visitor came from a job's "Apply" button,
// show which job and send it with the form.
export function AppliedJob() {
  const slug = useSearchParams().get("job");
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return null;
  return (
    <div className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand-dark">
      <input type="hidden" name="job" value={`${job.title} (${job.stage}, ${job.company})`} />
      Applying for <span className="font-semibold">{job.title}</span> · {job.stage} {job.company}
    </div>
  );
}
