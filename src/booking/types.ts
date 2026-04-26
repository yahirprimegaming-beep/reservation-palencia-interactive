export type ServiceId =
  | "maison"
  | "vitres"
  | "complet"
  | "gouttieres"
  | "toiture"
  | "patio";

export type PropertyType = "bungalow" | "1.5" | "2etages" | "commercial";

export type TimePref = "matin" | "apresmidi";

export interface BookingState {
  step: number;
  service: ServiceId | null;
  propertyType: PropertyType | null;
  siding: string[];
  addons: ServiceId[];
  postalCode: string;
  postalValid: boolean | null;
  selectedDate: string | null;
  timePref: TimePref | null;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  notes: string;
}

export const SERVICES: Record<ServiceId, { name: string; basePrice: number; icon: string }> = {
  maison: { name: "Lavage de maison", basePrice: 399, icon: "🏠" },
  vitres: { name: "Lavage de vitres", basePrice: 199, icon: "🪟" },
  complet: { name: "Forfait Complet", basePrice: 699, icon: "✨" },
  gouttieres: { name: "Nettoyage de gouttières", basePrice: 149, icon: "🧹" },
  toiture: { name: "Lavage de toiture", basePrice: 399, icon: "🏚️" },
  patio: { name: "Nettoyage patio/entrée", basePrice: 199, icon: "🧱" },
};

export const ADDONS: ServiceId[] = ["gouttieres", "toiture", "patio"];

export const VALID_POSTAL_PREFIXES = [
  "J7C","J7E","J7G","J7H","J7J","J7K","J7L","J7M","J7N","J7P","J7R","J7V","J7W","J7X","J7Y","J7Z",
  "J6V","J6W","J6X","J6Y","J6Z","J6R","J6S","J6T",
  "J5W","J5X","J5Y","J5Z","J5R","J5T",
  "H7A","H7B","H7C","H7E","H7G","H7H","H7J","H7K","H7L","H7M","H7N","H7P","H7R","H7S","H7T","H7V","H7W","H7X","H7Y",
];

export function calculatePrice(state: BookingState): { min: number; max: number; isQuote: boolean } {
  if (!state.service) return { min: 0, max: 0, isQuote: false };
  if (state.propertyType === "commercial") return { min: 0, max: 0, isQuote: true };

  const base = SERVICES[state.service].basePrice;
  let multiplier = 1;
  if (state.propertyType === "1.5") multiplier = 1.2;
  if (state.propertyType === "2etages") multiplier = 1.4;

  let min = Math.round(base * multiplier);
  let max = Math.round(base * multiplier * 1.35);

  for (const addon of state.addons) {
    min += SERVICES[addon].basePrice;
    max += Math.round(SERVICES[addon].basePrice * 1.3);
  }

  return { min, max, isQuote: false };
}

export const STEP_LABELS = ["Service", "Inclus", "Propriété", "Zone/Date", "Infos", "Confirmation"];
