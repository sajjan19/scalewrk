import { roles } from "@/content/roles";
import { Field } from "./Form";

// "What role are you looking for?" on the Share your profile form.
// People type their own answer; the role names from the Roles page (engineering and sales) show as suggestions.
export function PrimaryRole() {
  return (
    <Field
      label="What role are you looking for?"
      name="role"
      required
      placeholder="e.g. Backend Engineer, Founding AE, SDR"
      suggestions={roles.map((r) => r.name)}
    />
  );
}
