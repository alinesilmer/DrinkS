import { type FormEvent, useState } from "react";
import {
  type ContactErrors,
  type ContactField,
  type ContactInput,
  cleanContact,
  validateContact,
} from "@/features/contact/contactValidation";
import { contactService } from "@/services/contactService";

type Status = "idle" | "sending" | "sent" | "failed";

const EMPTY: ContactInput = { name: "", email: "", message: "" };

/** Values, field errors and send status of the contact form. */
export function useContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const change = (field: ContactField) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // writing again starts a new message (and brings a new bottle to the shore)
    setStatus((s) => (s === "sent" || s === "failed" ? "idle" : s));
    // clear a field's error as soon as the visitor edits it
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const input = cleanContact(values);
    const found = validateContact(input);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      await contactService.send(input);
      setValues(EMPTY);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return { values, errors, status, change, submit };
}

export type ContactFormState = ReturnType<typeof useContactForm>;
