"use client";

import { useState } from "react";
import { roles } from "@/content/roles";
import { Field, Select } from "./Form";

// "Primary role" dropdown on the engineers form.
// Picking "Other" shows a text box so they can describe their role.
export function PrimaryRole() {
  const [role, setRole] = useState("");
  return (
    <>
      <Select label="Primary role" name="role" required onChange={setRole} options={[...roles.map((r) => r.name), "Other"]} />
      {role === "Other" && (
        <Field label="What's your role?" name="role_other" required placeholder="QA Engineer, Embedded Engineer, Solutions Engineer…" />
      )}
    </>
  );
}
