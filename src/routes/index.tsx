import { createFileRoute } from "@tanstack/react-router";
import { BookingFunnel } from "@/booking/BookingFunnel";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Palencia Services Extérieur — Réservation en ligne | Blainville" },
      {
        name: "description",
        content: "Réservez votre lavage de maison, vitres, gouttières ou toiture sur la Rive-Nord. Résultats garantis. 88 avis Google ⭐⭐⭐⭐⭐. Devis en 2 minutes.",
      },
      { property: "og:title", content: "Palencia Services Extérieur — Réservation en ligne" },
      { property: "og:description", content: "Lavage extérieur premium sur la Rive-Nord et Laval. Résultats garantis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return <BookingFunnel />;
}
