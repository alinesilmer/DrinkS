import { CONTACT } from "@/data/contactContent";
import { type ContactInput } from "@/types/contact";

export type { ContactInput };

export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Hard caps on every field; the inputs enforce them and so does the cleaner below. */
export const LIMITS: Record<ContactField, number> = { name: 60, email: 120, message: 600 };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trims, caps the length and strips control characters before anything is sent. */
export function cleanContact(input: ContactInput): ContactInput {
  // eslint-disable-next-line no-control-regex
  const clean = (v: string, max: number) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
  return {
    name: clean(input.name, LIMITS.name),
    email: clean(input.email, LIMITS.email),
    message: clean(input.message, LIMITS.message),
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.length < 2) errors.name = CONTACT.errors.name;
  if (!EMAIL.test(input.email)) errors.email = CONTACT.errors.email;
  if (input.message.length < 10) errors.message = CONTACT.errors.message;
  return errors;
}
