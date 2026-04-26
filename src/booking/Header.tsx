import { Phone } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy text-cream border-b-2 border-gold/40">
      <div className="h-1 bg-gold w-full" />
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦅</span>
          <span className="font-display font-bold text-lg md:text-xl tracking-wider">PALENCIA</span>
          <span className="hidden sm:inline font-body text-xs text-gold-soft uppercase tracking-widest ml-1">Services Extérieur</span>
        </div>
        <a
          href="tel:+14388656873"
          className="inline-flex items-center gap-2 bg-gold text-navy font-display font-semibold px-3 py-1.5 rounded-md text-sm hover:bg-gold-soft transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">(438) 865-6873</span>
          <span className="sm:hidden">Appeler</span>
        </a>
      </div>
    </header>
  );
}
