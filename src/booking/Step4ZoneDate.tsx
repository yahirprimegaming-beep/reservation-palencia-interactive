import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { VALID_POSTAL_PREFIXES, type BookingState, type TimePref } from "./types";

interface Props {
  state: BookingState;
  setState: (patch: Partial<BookingState>) => void;
  onContinue: () => void;
}

function getDaysInMonth(year: number, month: number) {
  const days: Array<{ date: Date; disabled: boolean }> = [];
  const last = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= last; d++) {
    const date = new Date(year, month, d);
    const isPast = date < today;
    const isSunday = date.getDay() === 0;
    days.push({ date, disabled: isPast || isSunday });
  }
  return days;
}

export function Step4ZoneDate({ state, setState, onContinue }: Props) {
  const [postalInput, setPostalInput] = useState(state.postalCode);
  const [checking, setChecking] = useState(false);

  const today = new Date();
  const days = getDaysInMonth(today.getFullYear(), today.getMonth());
  const monthLabel = today.toLocaleDateString("fr-CA", { month: "long", year: "numeric" });

  const checkPostal = () => {
    setChecking(true);
    setTimeout(() => {
      const cleaned = postalInput.trim().toUpperCase().replace(/\s/g, "");
      const prefix = cleaned.substring(0, 3);
      const valid = VALID_POSTAL_PREFIXES.includes(prefix);
      setState({ postalCode: postalInput, postalValid: valid });
      setChecking(false);
    }, 400);
  };

  const canContinue = state.postalValid === true && !!state.selectedDate && !!state.timePref;
  const offerInvalid = state.postalValid === false;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      {/* Zone */}
      <section>
        <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-navy">
          Vérifiez votre zone de service
        </h2>
        <p className="text-muted-foreground font-body text-lg mt-2">
          On dessert toute la Rive-Nord et Laval.
        </p>
        <div className="mt-5 flex gap-2">
          <input
            value={postalInput}
            onChange={(e) => setPostalInput(e.target.value.toUpperCase())}
            placeholder="Ex: J7C 2K5"
            className="flex-1 bg-background border-2 border-border focus:border-gold outline-none rounded-md px-4 py-3 font-body uppercase tracking-wide"
            maxLength={7}
          />
          <button
            onClick={checkPostal}
            disabled={!postalInput || checking}
            className="bg-gold hover:bg-gold-soft text-navy font-display font-semibold uppercase tracking-wide px-6 rounded-md transition-colors disabled:opacity-50"
          >
            {checking ? "..." : "Vérifier"}
          </button>
        </div>
        {state.postalValid === true && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center gap-2 text-green-700 font-body">
            <Check className="w-5 h-5" /> Super! On dessert votre secteur.
          </motion.div>
        )}
        {offerInvalid && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 p-4 bg-cream border border-destructive/30 rounded-lg">
            <div className="flex items-start gap-2 text-destructive font-body">
              <X className="w-5 h-5 mt-0.5 shrink-0" />
              <span>Désolé, votre secteur n'est pas encore desservi. Laissez-nous votre info à l'étape suivante et on vous avisera quand on arrive chez vous.</span>
            </div>
          </motion.div>
        )}
      </section>

      {/* Calendar */}
      {state.postalValid === true && (
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl md:text-3xl uppercase text-navy">
            Quelle date vous convient?
          </h2>
          <p className="text-muted-foreground font-body mt-1 capitalize">{monthLabel}</p>

          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-display uppercase text-muted-foreground">
            {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {Array.from({ length: days[0].date.getDay() }).map((_, i) => (
              <div key={`pad-${i}`} />
            ))}
            {days.map(({ date, disabled }) => {
              const iso = date.toISOString().split("T")[0];
              const selected = state.selectedDate === iso;
              return (
                <button
                  key={iso}
                  disabled={disabled}
                  onClick={() => setState({ selectedDate: iso })}
                  className={[
                    "aspect-square rounded-md font-display font-semibold text-sm transition-colors",
                    selected
                      ? "bg-navy text-cream"
                      : disabled
                      ? "bg-muted/40 text-muted-foreground/50 cursor-not-allowed line-through"
                      : "bg-gold/20 text-navy hover:bg-gold hover:text-navy",
                  ].join(" ")}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <h3 className="font-display uppercase text-sm tracking-wider text-navy mb-3">Préférence d'heure</h3>
            <div className="grid grid-cols-2 gap-3">
              {([
                { id: "matin", label: "Matin (8h-12h)" },
                { id: "apresmidi", label: "Après-midi (12h-17h)" },
              ] as Array<{ id: TimePref; label: string }>).map((t) => {
                const sel = state.timePref === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setState({ timePref: t.id })}
                    className={[
                      "py-3 rounded-md font-display font-semibold uppercase text-sm transition-colors border-2",
                      sel ? "bg-gold text-navy border-gold" : "bg-background text-navy border-border hover:border-gold",
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}

      <button
        onClick={onContinue}
        disabled={!canContinue && !offerInvalid}
        className="w-full bg-gold hover:bg-gold-soft disabled:opacity-50 disabled:cursor-not-allowed text-navy font-display font-semibold uppercase tracking-wide py-4 rounded-md transition-colors text-lg"
      >
        Continuer →
      </button>
    </div>
  );
}
