"use client";

import { useState } from "react";
import { Field, Select } from "./Form";

// "You are a" dropdown on the partners form. Picking "Other" shows a text box.
export function PartnerType() {
  const [type, setType] = useState("");
  return (
    <>
      <Select
        label="You are a"
        name="partner_type"
        required
        onChange={setType}
        options={["VC (platform or talent team)", "VC (investor)", "Accelerator", "Startup lawyer", "Fractional CFO", "Other"]}
      />
      {type === "Other" && (
        <Field label="What do you do?" name="partner_type_other" required placeholder="Angel investor, startup studio, HR consultant…" />
      )}
    </>
  );
}
