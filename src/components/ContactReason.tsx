"use client";

import { useState } from "react";
import { Field, Select, TextArea } from "./Form";

// "I'm reaching out as a" dropdown on the Contact form.
// Candidates also get the relocation question. "Something else" gets a text box.
// The message box hint changes to match who's writing.
const messageHints: Record<string, string> = {
  "Founder or hiring manager": "What roles are you hiring for?",
  "Investor, accelerator or advisor": "Tell us about your portfolio or clients",
  "Candidate (engineering or sales)": "What kind of role are you looking for?",
};

export function ContactReason() {
  const [reason, setReason] = useState("");
  return (
    <>
      <Select
        label="I'm reaching out as a"
        name="reason"
        required
        onChange={setReason}
        options={["Founder or hiring manager", "Investor, accelerator or advisor", "Candidate (engineering or sales)", "Something else"]}
      />
      {reason === "Candidate (engineering or sales)" && (
        <Select label="Open to relocating?" name="relocation" options={["Yes", "Maybe, for the right role", "No"]} />
      )}
      {reason === "Something else" && (
        <Field label="Tell us who you are" name="reason_other" required placeholder="Recruiter, journalist, student, event organizer…" />
      )}
      <TextArea label="Message" name="message" required placeholder={messageHints[reason] ?? "How can we help?"} />
    </>
  );
}
