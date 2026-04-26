import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STEP_LABELS } from "./types";

interface Props {
  step: number;
}

export function ProgressBar({ step }: Props) {
  return (
    <div className="w-full bg-cream border-b border-border/60">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-4 left-4 right-4 h-[2px] bg-border -z-0" />
          <motion.div
            className="absolute top-4 left-4 h-[2px] bg-gold -z-0"
            initial={false}
            animate={{ width: `calc(${((step - 1) / 5) * 100}% - ${((step - 1) / 5) * 32}px)` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const completed = n < step;
            const current = n === step;
            return (
              <div key={label} className="flex flex-col items-center gap-2 relative z-10">
                <motion.div
                  initial={false}
                  animate={{
                    scale: current ? 1.1 : 1,
                  }}
                  className={[
                    "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm transition-colors",
                    completed && "bg-gold text-navy",
                    current && "bg-navy text-cream border-2 border-gold pulse-gold",
                    !completed && !current && "bg-background border-2 border-border text-muted-foreground",
                  ].filter(Boolean).join(" ")}
                >
                  {completed ? <Check className="w-4 h-4" /> : n}
                </motion.div>
                <span className={`hidden md:block text-xs uppercase tracking-wide font-display ${current ? "text-navy font-semibold" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
