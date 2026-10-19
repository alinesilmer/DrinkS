import { respond } from "@/services/mockApi";
import { type ContactInput } from "@/types/contact";

/**
 * Sends a contact message. Mock for now: it waits like a request would and succeeds.
 * When the backend exists, POST the (already cleaned and validated) input here; the server
 * must validate it again, since anything in the browser can be bypassed.
 */
export const contactService = {
  send: async (_input: ContactInput): Promise<void> => {
    await respond(null, 600);
  },
};
