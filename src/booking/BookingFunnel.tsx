import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Header } from "./Header";
import { ProgressBar } from "./ProgressBar";
import { TrustBadges } from "./TrustBadges";
import { Step1Service } from "./Step1Service";
import { Step2Included } from "./Step2Included";
import { Step3Property } from "./Step3Property";
import { Step4ZoneDate } from "./Step4ZoneDate";
import { Step5Info } from "./Step5Info";
import { Step6Confirmation } from "./Step6Confirmation";
import { calculatePrice, type BookingState } from "./types";

const STORAGE_KEY = "palencia-booking-v1";

const initialState: BookingState = {
  step: 1,
  service: null,
  propertyType: null,
  siding: [],
  addons: [],
  postalCode: "",
  postalValid: null,
  selectedDate: null,
  timePref: null,
  fullName: "",
  phone: "",
  address: "",
  email: "",
  notes: "",
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function BookingFunnel() {
  const [state, setStateRaw] = useState<BookingState>(initialState);
  const [direction, setDirection] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Don't restore final confirmation step
        if (parsed.step >= 6) parsed.step = 1;
        setStateRaw({ ...initialState, ...parsed });
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const setState = (patch: Partial<BookingState>) => setStateRaw((s) => ({ ...s, ...patch }));

  const price = useMemo(() => calculatePrice(state), [state]);

  const goTo = (step: number) => {
    setDirection(step > state.step ? 1 : -1);
    setState({ step });
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const next = () => goTo(Math.min(6, state.step + 1));
  const back = () => goTo(Math.max(1, state.step - 1));

  const handleSelectService = (id: BookingState["service"]) => {
    setState({ service: id });
    setTimeout(() => goTo(2), 100);
  };

  const submit = async () => {
    const payload = {
      name: state.fullName,
      phone: state.phone,
      address: state.address,
      email: state.email,
      service: state.service,
      propertyType: state.propertyType,
      siding: state.siding,
      addons: state.addons,
      preferredDate: state.selectedDate,
      preferredTime: state.timePref,
      notes: state.notes,
      estimatedPrice: price.isQuote ? "Devis personnalisé" : `${price.min}-${price.max}`,
      postalCode: state.postalCode,
      source: "Landing Page",
    };

    try {
      await fetch("https://palencia-crm.vercel.app/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      // Network error — still proceed to confirmation so the user has a path forward;
      // they can call directly. Re-throw if you want strict behavior.
      console.error("Lead submission failed", e);
    }

    // Tracking
    try { window.fbq?.("track", "Lead"); } catch {}
    try { window.gtag?.("event", "conversion", { send_to: "lead_form" }); } catch {}

    goTo(6);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      <div ref={topRef} />
      <ProgressBar step={state.step} />

      {state.step > 1 && state.step < 6 && (
        <div className="max-w-5xl w-full mx-auto px-4 pt-4">
          <button
            onClick={back}
            className="inline-flex items-center gap-1 text-navy hover:text-gold font-display uppercase text-sm tracking-wider transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>
        </div>
      )}

      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={state.step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {state.step === 1 && <Step1Service onSelect={handleSelectService} />}
            {state.step === 2 && state.service && (
              <Step2Included service={state.service} price={price} onContinue={next} />
            )}
            {state.step === 3 && (
              <Step3Property state={state} setState={setState} price={price} onContinue={next} />
            )}
            {state.step === 4 && (
              <Step4ZoneDate state={state} setState={setState} onContinue={next} />
            )}
            {state.step === 5 && (
              <Step5Info state={state} setState={setState} price={price} onSubmit={submit} />
            )}
            {state.step === 6 && <Step6Confirmation state={state} price={price} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <TrustBadges />

      {/* Sticky mobile CTA on step 1 */}
      {state.step === 1 && (
        <div className="md:hidden sticky bottom-0 bg-gold border-t-2 border-gold-soft p-3 z-40 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.2)]">
          <button
            onClick={() => {
              const el = document.querySelector("section.bg-cream");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full bg-navy text-cream font-display font-bold uppercase tracking-wide py-3.5 rounded-md"
          >
            Commencer ma réservation →
          </button>
        </div>
      )}
    </div>
  );
}
