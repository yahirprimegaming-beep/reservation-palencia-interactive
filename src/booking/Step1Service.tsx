import { motion } from "framer-motion";
import { Check, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import type { ServiceId } from "./types";

interface Props {
  onSelect: (id: ServiceId) => void;
}

const MAIN_SERVICES: Array<{
  id: ServiceId;
  icon: string;
  title: string;
  subtitle: string;
  price: number;
  badge?: string;
  premium?: boolean;
  included: string[];
  fullIncluded: string[];
}> = [
  {
    id: "maison",
    icon: "🏠",
    title: "Lavage de maison",
    subtitle: "Softwash professionnel — vinyle, agrégat, brique",
    price: 399,
    badge: "Le plus populaire ⭐",
    included: ["Softwash basse pression", "Produits écoresponsables", "Résultats garantis"],
    fullIncluded: [
      "Softwash basse pression (aucun risque)",
      "Produits écoresponsables et biodégradables",
      "Traitement anti-algues et anti-moisissures",
      "Nettoyage des soffites et fascias",
      "Rinçage complet de la fondation",
      "Protection de vos plantes et végétaux",
      "Résultats garantis ou on revient gratuitement",
      "Avant et après photographiés",
    ],
  },
  {
    id: "vitres",
    icon: "🪟",
    title: "Lavage de vitres",
    subtitle: "Extérieur seulement, cadres inclus",
    price: 199,
    included: ["Vitres extérieures", "Nettoyage des cadres", "Eau purifiée (zéro trace)"],
    fullIncluded: [
      "Vitres extérieures",
      "Nettoyage des cadres de fenêtres",
      "Eau purifiée (zéro trace, zéro coulisse)",
      "Résultat impeccable garanti",
    ],
  },
  {
    id: "complet",
    icon: "✨",
    title: "Forfait Complet — Maison + Vitres",
    subtitle: "Le meilleur rapport qualité-prix. Maison complète + toutes les vitres.",
    price: 699,
    badge: "Meilleure valeur 🏆",
    premium: true,
    included: [
      "Lavage complet de la maison",
      "Vitres intérieures et extérieures",
      "Cadres de fenêtres inclus",
      "Économisez 100$+ vs séparé",
    ],
    fullIncluded: [],
  },
];

const SECONDARY: Array<{ id: ServiceId; label: string; price: number }> = [
  { id: "gouttieres", label: "Nettoyage de gouttières", price: 149 },
  { id: "toiture", label: "Décontamination de toiture", price: 699 },
  { id: "patio", label: "Nettoyage patio/entrée", price: 199 },
];

export function Step1Service({ onSelect }: Props) {
  const [expanded, setExpanded] = useState<ServiceId | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="navy-texture text-cream relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-5xl md:text-7xl leading-[0.95] uppercase"
          >
            Réservez votre<br />
            <span className="text-gold">nettoyage extérieur</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg md:text-2xl font-body text-gold-soft"
          >
            Résultats garantis dès le premier jour.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-3 flex items-center justify-center gap-2 text-gold"
          >
            <span className="font-display text-lg">88 avis Google</span>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-gold" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service selection */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-center text-navy uppercase mb-2">
            Choisissez votre service
          </h2>
          <p className="text-center text-muted-foreground font-body text-lg mb-10">
            Tarification claire. Aucun frais caché.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {MAIN_SERVICES.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ y: -4 }}
                className={[
                  "relative bg-background rounded-xl p-6 flex flex-col",
                  "shadow-[var(--shadow-card)]",
                  s.premium ? "border-2 border-gold ring-4 ring-gold/10" : "border border-border",
                ].join(" ")}
              >
                {s.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy font-display font-semibold text-xs uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                    {s.badge}
                  </div>
                )}
                <div className="text-5xl mb-3">{s.icon}</div>
                <h3 className="font-display font-bold text-xl text-navy uppercase">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 font-body">{s.subtitle}</p>
                <div className="mt-4 inline-flex self-start bg-cream border border-gold/40 text-navy font-display font-semibold px-3 py-1 rounded-md">
                  À partir de {s.price}$
                </div>
                <ul className="mt-4 space-y-2 flex-1">
                  {s.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-body">
                      <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {s.fullIncluded.length > 0 && (
                  <button
                    onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                    className="mt-3 text-sm text-navy underline font-body self-start"
                  >
                    {expanded === s.id ? "Réduire" : "Voir tout ce qui est inclus →"}
                  </button>
                )}
                {expanded === s.id && (
                  <ul className="mt-3 space-y-1.5 text-sm bg-cream/50 p-3 rounded-md">
                    {s.fullIncluded.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => onSelect(s.id)}
                  className="mt-5 w-full bg-gold hover:bg-gold-soft text-navy font-display font-semibold uppercase tracking-wide py-3 rounded-md transition-colors flex items-center justify-center gap-1"
                >
                  Sélectionner <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Secondary */}
          <div className="mt-10">
            <h3 className="font-display text-lg uppercase text-navy mb-4 text-center">Autres services disponibles</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {SECONDARY.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelect(s.id)}
                  className="bg-background border border-border hover:border-gold rounded-lg p-4 text-left transition-colors group"
                >
                  <div className="font-display font-semibold text-navy">{s.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">À partir de <span className="text-gold font-semibold">{s.price}$</span></div>
                  <div className="text-xs text-navy mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Sélectionner →</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { MAIN_SERVICES };
