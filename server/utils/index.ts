import offers from "@/assets/data/offers.json";
import rates from "@/assets/data/exchange-rate.json";
import type {Offer} from "~/types/interfaces/offers";
import type {Rate} from "~/types/interfaces/rates";

export function getOffers(): Offer[] {
    return offers.map((item): Offer => ({
        name: item.name,
        description: item.description,
        image: item.image,
        currency: item.locale?.currency ?? 'USD',  // Provide a default value if necessary
        offers: Array.isArray(item.offers) ? item.offers : [],
    }));
}

export function getRates(): Rate[] {
    return rates;
}