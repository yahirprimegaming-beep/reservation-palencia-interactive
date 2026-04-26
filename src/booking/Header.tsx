import { Phone } from "lucide-react";
import logo from "@/assets/palencia-logo.png";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy text-cream border-b-2 border-gold/40">
      <div className="h-1 bg-gold w-full" />
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <img
          src={logo}
          alt="Palencia Services Extérieur"
          className="h-10 md:h-12 w-auto object-contain"
        />
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
