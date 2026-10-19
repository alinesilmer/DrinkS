import { type IconName } from "@/components/ui/iconPaths";

// Contact page copy. The channel values are placeholders.
export const CONTACT = {
  title: "Contacto",
  channels: [
    { icon: "chat", label: "WhatsApp", value: "+54 11 0000-0000", href: "https://wa.me/541100000000" },
    { icon: "mail", label: "Mail", value: "hola@drinks.example", href: "mailto:hola@drinks.example" },
    { icon: "clock", label: "Horario", value: "Todos los días, 12 a 21 h" },
  ] satisfies { icon: IconName; label: string; value: string; href?: `https://${string}` | `mailto:${string}` }[],
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
