import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { LIMITS } from "@/features/contact/contactValidation";
import { type ContactFormState } from "@/features/contact/useContactForm";
import { CONTACT } from "@/data/contactContent";

const { letter } = CONTACT;

/** The contact form as a handwritten letter lying on the sand. */
export function LetterForm({ form }: { form: ContactFormState }) {
  const { values, errors, status, change, submit } = form;
  const sending = status === "sending";

  return (
    <form className="letter" noValidate onSubmit={submit}>
      <p className="letter__greeting">{letter.greeting}</p>
      <TextField look="line" id="name" label={letter.name} value={values.name} onChange={change("name")}
        maxLength={LIMITS.name} error={errors.name} autoComplete="name" />
      <TextField look="line" id="email" type="email" label={letter.email} value={values.email}
        onChange={change("email")} maxLength={LIMITS.email} error={errors.email} autoComplete="email" />
      <TextField look="line" id="message" multiline label={letter.message} value={values.message}
        onChange={change("message")} maxLength={LIMITS.message} error={errors.message} />
      <Button variant="primary" type="submit" disabled={sending}>
        {sending ? letter.sending : letter.send}
      </Button>
      <p className="letter__status" role="status">
        {status === "sent" && letter.sent}
        {status === "failed" && letter.failed}
      </p>
    </form>
  );
}
