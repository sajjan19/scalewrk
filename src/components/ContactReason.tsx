"use client";

import { useState } from "react";
import { Select } from "./Form";

// "I'm reaching out as a" dropdown on the Contact form.
// Engineers also get the relocation question.
export function ContactReason() {
  const [reason, setReason] = useState("");
  return (
    <>
      <Select
        label="I'm reaching out as a"
        name="reason"
        required
        onChange={setReason}
        options={["Founder or hiring manager", "Investor, accelerator or advisor", "Engineer", "Something else"]}
      />
      {reason === "Engineer" && (
        <Select label="Open to relocating?" name="relocation" options={["Yes", "Maybe, for the right role", "No"]} />
      )}
    </>
  );
}
