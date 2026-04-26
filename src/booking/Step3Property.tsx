import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ADDONS, SERVICES, type BookingState, type PropertyType, type ServiceId } from "./types";

const PROPERTY_OPTIONS: Array<{ id: PropertyType; icon: string; label: string }> = [
  { id: "bungalow", icon: "🏠", label: "Bungalow" },
  { id: "1.5", icon: "🏡", label: "1.5 étage" },
  { id: "2etages", icon: "🏘️", label: "2 étages" },
  { id: "commercial", icon: "🏗️", label: "Commercial" },
];

const SIDINGS = ["Vinyle", "Agrégat", "Brique", "Bois", "Autre"];

interface Props {
  state: BookingState;
  setState: (patch: Partial<BookingState>) => void;
  price: { min: number; max: number; isQuote: boolean };
  onContinue: () => void;
}

export function Step3Property({ state, setState, price, onContinue }: Props) {
  const toggleSiding = (s: string) => {
    const set = new Set(state.siding);
    if (set.has(s)) set.delete(s); else set.add(s);
    setState({ siding: Array.from(set) });
  };

  const toggleAddon = (id: ServiceId) => {
    const set = new Set(state.addons);
    if (set.has(id)) set.delete(id); else set.add(id);
    setState({ addons: Array.from(set) });
  };

  const canContinue = !!state.propertyType;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-navy">
        Parlez-nous de votre propriété
      </h2>
      <p className="text-muted-foreground font-body text-lg mt-2">
        Ça nous aide à vous donner une estimation précise.
      </p>

      {/* Property type */}
      <div className="mt-8">
        <h3 className="font-display uppercase text-sm tracking-wider text-navy mb-3">Type de propriété</h3>
        <div className="grid grid-cols-2 gap-3">
          {PROPERTY_OPTIONS.map((p) => {
            const selected = state.propertyType === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setState({ propertyType: p.id })}
                className={[
                  "relative bg-background rounded-xl p-5 text-left transition-all border-2",
                  selected ? "border-gold ring-4 ring-gold/15 shadow-[var(--shadow-gold)]" : "border-border hover:border-navy/30",
                ].join(" ")}
              >
                {selected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                    <Check className="w-4 h-4 text-navy" />
                  </div>
                )}
                <div className="text-3xl">{p.icon}</div>
                <div className="font-display font-semibold mt-2 text-navy">{p.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Siding */}
      <div className="mt-8">
        <h3 className="font-display uppercase text-sm tracking-wider text-navy mb-3">Type de revêtement</h3>
        <div className="flex flex-wrap gap-2">
          {SIDINGS.map((s) => {
            const selected = state.siding.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSiding(s)}
                className={[
                  "px-4 py-2 rounded-full font-body text-sm transition-colors border",
                  selected
                    ? "bg-navy text-cream border-navy"
                    : "bg-background text-navy border-border hover:border-navy",
                ].join(" ")}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live price */}
      {state.propertyType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gold text-navy rounded-xl p-6 text-center"
        >
          <div className="font-body uppercase tracking-wider text-xs">Estimation pour votre propriété</div>
          {price.isQuote ? (
            <div className="font-display font-bold text-3xl mt-2">Devis personnalisé</div>
          ) : (
            <motion.div
              key={`${price.min}-${price.max}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-display font-bold text-4xl md:text-5xl mt-2"
            >
              {price.min}$ – {price.max}$
            </motion.div>
          )}
          <div className="text-xs mt-2 opacity-80">Prix final confirmé avant l'intervention ✓</div>
        </motion.div>
      )}

      {/* Addons */}
      {state.propertyType !== "commercial" && (
        <div className="mt-8">
          <h3 className="font-display uppercase text-sm tracking-wider text-navy mb-3">
            Voulez-vous ajouter d'autres services?
          </h3>
          <div className="space-y-2">
            {ADDONS.filter((a) => a !== state.service).map((id) => {
              const s = SERVICES[id];
              const on = state.addons.includes(id);
              return (
                <label
                  key={id}
                  className="flex items-center justify-between bg-background border border-border rounded-lg p-4 cursor-pointer hover:border-navy/40 transition-colors"
                >
                  <div>
                    <div className="font-display font-semibold text-navy">+ {s.name}</div>
                    <div className="text-sm text-muted-foreground">+{s.basePrice}$</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleAddon(id)}
                    className={[
                      "relative w-12 h-7 rounded-full transition-colors",
                      on ? "bg-gold" : "bg-muted",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "absolute top-1 w-5 h-5 rounded-full bg-background shadow transition-all",
                        on ? "left-6" : "left-1",
                      ].join(" ")}
                    />
                  </button>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="mt-8 w-full bg-gold hover:bg-gold-soft disabled:opacity-50 disabled:cursor-not-allowed text-navy font-display font-semibold uppercase tracking-wide py-4 rounded-md transition-colors text-lg"
      >
        Continuer →
      </button>
    </div>
  );
}
