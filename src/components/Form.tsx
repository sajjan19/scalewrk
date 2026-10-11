"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/content/site";

/*
  Sends a form to Formspree (or any service that accepts a POST and replies with JSON).
  Endpoints live in src/content/site.ts → forms.
*/
export function Form({
  endpoint,
  subject,
  submitLabel,
  successTitle,
  successBody,
  children,
}: {
  endpoint: string;
  subject: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  children: ReactNode;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) {
      setStatus("error");
      setError(`This form isn't connected yet. Email us at ${site.email} instead.`);
      return;
    }
    const data = new FormData(e.currentTarget);
    const tooBig = [...data.values()].some((v) => v instanceof File && v.size > 10 * 1024 * 1024);
    if (tooBig) {
      setStatus("error");
      setError("That file is over 10 MB. Try a smaller PDF, or share a link instead.");
      return;
    }
    // Don't send an empty file field (some form services reject it)
    for (const [key, v] of [...data.entries()]) {
      if (v instanceof File && v.size === 0) data.delete(key);
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(`Something went wrong sending the form. Try again, or email us at ${site.email}.`);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-mist p-8">
        <p className="text-xl font-semibold">{successTitle}</p>
        <p className="mt-2 leading-relaxed text-body">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" encType="multipart/form-data">
      <input type="hidden" name="_subject" value={subject} />
      {/* Spam trap: real people never see or fill this */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {children}
      {status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-ink px-6 text-[15px] font-medium text-white transition hover:bg-ink/85 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

const inputClass =
  "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
};

export function Field({ label, name, type = "text", required, placeholder, autoComplete, hint }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label} {!required && <span className="font-normal text-muted">(optional)</span>}
      </span>
      <input name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className={inputClass} />
      {hint && <span className="mt-1.5 block text-sm text-muted">{hint}</span>}
    </label>
  );
}

export function TextArea({ label, name, required, placeholder }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label} {!required && <span className="font-normal text-muted">(optional)</span>}
      </span>
      <textarea name={name} required={required} placeholder={placeholder} rows={4} className={inputClass} />
    </label>
  );
}

export function Select({ label, name, required, options }: FieldProps & { options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label} {!required && <span className="font-normal text-muted">(optional)</span>}
      </span>
      <select name={name} required={required} defaultValue="" className={`${inputClass} appearance-none`}>
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function FileField({ label, name, accept, hint }: { label: string; name: string; accept: string; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label} <span className="font-normal text-muted">(optional)</span>
      </span>
      <input
        type="file"
        name={name}
        accept={accept}
        className="mt-2 block w-full rounded-xl border border-dashed border-line bg-mist px-4 py-4 text-sm text-body file:mr-4 file:rounded-lg file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
      />
      {hint && <span className="mt-1.5 block text-sm text-muted">{hint}</span>}
    </label>
  );
}
