import { type IconName } from "@/components/ui/iconPaths";

// Contact page copy. The channel values are placeholders.
export const CONTACT = {
  title: "Contacto",
  channels: [
    { icon: "chat", label: "WhatsApp", value: "+54 379 000-0000", href: "https://wa.me/543790000000" },
    { icon: "mail", label: "Mail", value: "hola@drinks.example", href: "mailto:hola@drinks.example" },
    { icon: "bag", label: "Dirección", value: "Entregas en Corrientes Capital" },
  ] satisfies { icon: IconName; label: string; value: string; href?: `https://${string}` | `mailto:${string}` }[],
  /** Two facts at the foot of the label, separated by a hairline. */
  facts: [
    { label: "Atención", value: "12 a 21 h" },
    { label: "Respuesta", value: "En el día" },
  ],
  cta: "Escribinos ahora",
  formTitle: "Escribinos",
  close: "Cerrar",
  letter: {
    greeting: "Hola, DrinkS:",
    name: "Me llamo",
    email: "Mi mail",
    message: "Te escribo porque…",
    send: "Enviar",
    sending: "Enviando…",
    sent: "¡Listo! Te escribimos pronto.",
    failed: "No se pudo enviar. Intentá otra vez en un momento.",
  },
  errors: {
    name: "Escribí tu nombre.",
    email: "Revisá tu mail.",
    message: "Contanos un poco más (mínimo 10 letras).",
  },
};
