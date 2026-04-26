import { Lock, Star, ShieldCheck, Phone } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="bg-navy text-cream/80 mt-12">
      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm font-body">
        <div className="flex flex-col items-center gap-1">
          <Lock className="w-5 h-5 text-gold" />
          <span>Aucun paiement maintenant</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Star className="w-5 h-5 text-gold fill-gold" />
          <span>88 avis Google 5.0</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-5 h-5 text-gold" />
          <span>Prix confirmé avant l'intervention</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Phone className="w-5 h-5 text-gold" />
          <a href="tel:+14388656873" className="hover:text-gold">(438) 865-6873</a>
        </div>
      </div>
    </div>
  );
}
