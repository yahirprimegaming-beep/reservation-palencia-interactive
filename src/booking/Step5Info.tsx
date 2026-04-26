import { useState } from "react";
import { Loader2 } from "lucide-react";
import { SERVICES, type BookingState } from "./types";

interface Props {
  state: BookingState;
  setState: (patch: Partial<BookingState>) => void;
  price: { min: number; max: number; isQuote: boolean };
  onSubmit: () => Promise<void>;
}

export function Step5Info({ state, setState, price, onSubmit }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const handleSubmit = async () => {
    if (!state.fullName.trim() || !state.phone.trim() || !state.address.trim()) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit();
    } catch (e) {
      setError("Une erreur est survenue. Réessayez ou appelez-nous au (438) 865-6873.");
    } finally {
      setSubmitting(false);
    }
  };

  const serviceName = state.service ? SERVICES[state.service].name : "—";
  const propertyLabel: Record<string, string> = {
    bungalow: "Bungalow",
    "1.5": "1.5 étage",
    "2etages": "2 étages",
    commercial: "Commercial",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr,360px] gap-8">
      <div>
        <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-navy">
          Vos coordonnées
        </h2>
        <p className="text-muted-foreground font-body text-lg mt-2">
          Yahir vous contactera pour confirmer le rendez-vous sous 24h.
        </p>

        <div className={`mt-6 space-y-4 ${shake ? "shake" : ""}`}>
          <Field label="Prénom et Nom *" value={state.fullName} onChange={(v) => setState({ fullName: v })} placeholder="Marie Tremblay" />
          <Field label="Numéro de téléphone *" value={state.phone} onChange={(v) => setState({ phone: v })} placeholder="(514) 555-1234" type="tel" />
          <Field label="Adresse complète *" value={state.address} onChange={(v) => setState({ address: v })} placeholder="123 rue Principale, Blainville, QC" />
          <Field label="Email" value={state.email} onChange={(v) => setState({ email: v })} placeholder="marie@exemple.com" type="email" />
          <div>
            <label className="block font-display uppercase text-xs tracking-wider text-navy mb-1.5">Notes</label>
            <textarea
              value={state.notes}
              onChange={(e) => setState({ notes: e.target.value })}
              placeholder="Ex: Portail à ouvrir, chien dans la cour, stationnement disponible..."
              rows={4}
              className="w-full bg-background border-2 border-border focus:border-gold outline-none rounded-md px-4 py-3 font-body resize-none"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md font-body text-sm">{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-6 w-full bg-gold hover:bg-gold-soft disabled:opacity-60 text-navy font-display font-bold uppercase tracking-wide py-5 rounded-md transition-colors text-lg flex items-center justify-center gap-2"
        >
          {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...</> : "Envoyer ma demande →"}
        </button>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-24 self-start">
        <div className="bg-navy text-cream rounded-xl p-5 border-2 border-gold/40">
          <div className="font-display uppercase tracking-widest text-xs text-gold">📋 Votre commande</div>
          <div className="mt-4 space-y-3 font-body">
            <Row label="Service" value={serviceName} />
            {state.propertyType && <Row label="Propriété" value={propertyLabel[state.propertyType]} />}
            {state.addons.length > 0 && (
              <Row label="Extras" value={state.addons.map((a) => SERVICES[a].name).join(", ")} />
            )}
            {state.selectedDate && (
              <Row
                label="Date"
                value={`${new Date(state.selectedDate).toLocaleDateString("fr-CA", { weekday: "short", day: "numeric", month: "long" })}${state.timePref ? " · " + (state.timePref === "matin" ? "Matin" : "PM") : ""}`}
              />
            )}
          </div>
          <div className="mt-5 pt-4 border-t border-cream/20">
            <div className="text-xs uppercase text-gold-soft">Estimation</div>
            <div className="font-display font-bold text-2xl text-gold mt-1">
              {price.isQuote ? "Devis personnalisé" : `${price.min}$ – ${price.max}$`}
            </div>
            <div className="text-xs mt-2 text-cream/70">Prix final confirmé avant l'intervention ✓</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block font-display uppercase text-xs tracking-wider text-navy mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border-2 border-border focus:border-gold outline-none rounded-md px-4 py-3 font-body"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-cream/70">{label}</span>
      <span className="text-cream font-medium text-right">{value}</span>
    </div>
  );
}
