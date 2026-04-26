import { motion } from "framer-motion";
import { Check, Phone, Share2, Star } from "lucide-react";
import { SERVICES, type BookingState } from "./types";

interface Props {
  state: BookingState;
  price: { min: number; max: number; isQuote: boolean };
}

const REVIEWS = [
  { name: "Marie T.", city: "Blainville", text: "Travail impeccable! Ma maison n'avait jamais été aussi propre." },
  { name: "Jean-François L.", city: "Terrebonne", text: "Ponctuel, professionnel et résultats wow. Je recommande à 100%!" },
  { name: "Sylvie B.", city: "Laval", text: "Prix honnête et travail parfait. Yahir est vraiment sérieux dans son travail." },
];

export function Step6Confirmation({ state, price }: Props) {
  const firstName = state.fullName.split(" ")[0] || "vous";
  const serviceName = state.service ? SERVICES[state.service].name : "—";
  const propertyLabel: Record<string, string> = {
    bungalow: "Bungalow",
    "1.5": "1.5 étage",
    "2etages": "2 étages",
    commercial: "Commercial",
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: "Palencia Services Extérieur",
        text: "J'ai réservé chez Palencia. Lavage de maison, vitres, gouttières — qualité garantie!",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto w-20 h-20 rounded-full bg-gold flex items-center justify-center"
      >
        <Check className="w-12 h-12 text-navy" strokeWidth={3} />
      </motion.div>

      <h1 className="mt-6 text-center font-display font-bold text-4xl md:text-5xl uppercase text-navy">
        Demande envoyée! 🎉
      </h1>
      <p className="mt-3 text-center text-lg font-body text-muted-foreground">
        Merci {firstName}! Yahir vous contactera dans les prochaines heures pour confirmer votre rendez-vous et le prix exact.
      </p>

      {/* Summary */}
      <div className="mt-8 bg-navy text-cream rounded-xl p-6 border-2 border-gold">
        <div className="font-display uppercase text-gold tracking-widest text-xs">📋 Votre demande</div>
        <div className="mt-4 space-y-2 font-body">
          <SummaryRow label="Service" value={serviceName} />
          {state.propertyType && <SummaryRow label="Propriété" value={propertyLabel[state.propertyType]} />}
          {state.selectedDate && (
            <SummaryRow
              label="Date préférée"
              value={new Date(state.selectedDate).toLocaleDateString("fr-CA", { weekday: "long", day: "numeric", month: "long" })}
            />
          )}
          <SummaryRow
            label="Estimation"
            value={price.isQuote ? "Devis personnalisé" : `${price.min}$ – ${price.max}$`}
          />
        </div>
      </div>

      {/* Notice */}
      <div className="mt-6 bg-cream border border-gold/30 rounded-xl p-5 font-body">
        <div className="font-display font-semibold text-navy uppercase tracking-wide">ℹ️ À propos du prix</div>
        <p className="mt-2 text-sm text-navy/80 leading-relaxed">
          Le prix final peut varier selon la superficie exacte et l'accessibilité de certaines zones. Yahir vous confirmera le prix définitif avant l'intervention. Aucune surprise, aucun frais cachés. C'est notre promesse.
        </p>
      </div>

      {/* Social proof */}
      <div className="mt-10">
        <div className="text-center">
          <h3 className="font-display font-bold text-2xl uppercase text-navy">
            + de 88 familles satisfaites sur la Rive-Nord
          </h3>
          <div className="flex justify-center gap-1 mt-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
          </div>
        </div>
        <div className="mt-5 grid md:grid-cols-3 gap-3">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-background border border-border rounded-lg p-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />)}
              </div>
              <p className="mt-2 text-sm font-body italic text-navy">"{r.text}"</p>
              <div className="mt-2 font-display text-xs uppercase tracking-wider text-muted-foreground">
                — {r.name}, {r.city}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-10 text-center">
        <p className="font-body text-muted-foreground">Des questions? Appelez directement:</p>
        <a
          href="tel:+14388656873"
          className="mt-3 inline-flex items-center gap-2 bg-gold hover:bg-gold-soft text-navy font-display font-bold uppercase px-6 py-3 rounded-md transition-colors"
        >
          <Phone className="w-5 h-5" /> (438) 865-6873
        </a>
      </div>

      <div className="mt-8 text-center border-t border-border pt-6">
        <p className="font-body text-muted-foreground">Vous connaissez quelqu'un qui en a besoin?</p>
        <button
          onClick={share}
          className="mt-3 inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-cream font-display font-semibold uppercase px-5 py-2.5 rounded-md transition-colors"
        >
          <Share2 className="w-4 h-4" /> Partager →
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-cream/70">{label}</span>
      <span className="text-cream font-medium text-right">{value}</span>
    </div>
  );
}
