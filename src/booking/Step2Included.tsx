import { Check } from "lucide-react";
import { SERVICES, type ServiceId } from "./types";

const FULL_LISTS: Record<ServiceId, string[]> = {
  maison: [
    "Softwash basse pression (aucun risque)",
    "Produits écoresponsables et biodégradables",
    "Traitement anti-algues et anti-moisissures",
    "Nettoyage du revêtement des gouttières et fascias",
    "Rinçage complet de la fondation",
    "Protection de vos plantes et végétaux",
    "Résultats garantis",
    "Avant et après photographiés",
  ],
  vitres: [
    "Vitres extérieures",
    "Nettoyage des cadres de fenêtres",
    "Eau purifiée (zéro trace, zéro coulisse)",
    "Résultat impeccable garanti",
  ],
  complet: [],
  gouttieres: [
    "Vidange complète des gouttières",
    "Inspection des descentes pluviales",
    "Rinçage haute efficacité",
    "Sacs et débris ramassés",
    "Garantie sans bouchon 6 mois",
  ],
  toiture: [
    "Softwash spécialisé pour bardeaux",
    "Élimination des algues noires",
    "Traitement préventif anti-mousse",
    "Aucun dommage aux bardeaux",
    "Résultats visibles immédiatement",
  ],
  patio: [
    "Lavage haute pression contrôlé",
    "Élimination des taches tenaces",
    "Nettoyage des joints",
    "Pavé uni, béton, bois traité",
    "Scellant disponible en option",
  ],
};

interface Props {
  service: ServiceId;
  price: { min: number; max: number };
  onContinue: () => void;
}

export function Step2Included({ service, price, onContinue }: Props) {
  const items =
    service === "complet"
      ? [...FULL_LISTS.maison, ...FULL_LISTS.vitres]
      : FULL_LISTS[service];
  const s = SERVICES[service];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-navy">
        Ce qui est inclus dans votre {s.name.toLowerCase()}
      </h2>
      <p className="text-muted-foreground font-body text-lg mt-2">
        Voici exactement ce qu'on fait chez vous.
      </p>

      <ul className="mt-8 space-y-3 bg-background border border-border rounded-xl p-6 shadow-[var(--shadow-card)]">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-navy" />
            </div>
            <span className="font-body text-base text-navy">{item}</span>
          </li>
        ))}
      </ul>

      {/* Before/After placeholder */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="aspect-[4/3] rounded-xl bg-navy text-cream flex items-center justify-center font-display uppercase tracking-widest border-2 border-navy">
          <div className="text-center">
            <div className="text-xs text-gold-soft">Avant</div>
            <div className="text-2xl mt-1">🏠</div>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-xl bg-cream text-navy flex items-center justify-center font-display uppercase tracking-widest border-2 border-gold">
          <div className="text-center">
            <div className="text-xs text-gold">Après</div>
            <div className="text-2xl mt-1">✨</div>
          </div>
        </div>
      </div>

      {/* Price reminder */}
      <div className="mt-8 bg-gold text-navy rounded-xl p-5 text-center">
        <div className="font-body uppercase tracking-wider text-xs">Votre service</div>
        <div className="font-display font-bold text-2xl mt-1">
          {s.name} — À partir de {price.min || s.basePrice}$
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mt-6 w-full bg-navy hover:bg-navy-light text-cream font-display font-semibold uppercase tracking-wide py-4 rounded-md transition-colors text-lg"
      >
        Continuer →
      </button>
    </div>
  );
}
