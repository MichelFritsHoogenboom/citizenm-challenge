import type { Offer } from "~/types/offers";
import type { Rate } from "~/types/rates";
import offers from "@/assets/data/offers.json";
import rates from "@/assets/data/exchange-rate.json";

export const getOffers = (): Offer[] => {
  try {
    if (!Array.isArray(offers)) {
      throw new Error("Invalid offers data format");
    }
    return offers;
  } catch (error) {
    console.error("Error getting offers:", error);
    throw error;
  }
};

export const getRates = (): Rate[] => {
  try {
    if (!Array.isArray(rates)) {
      throw new Error("Invalid rates data format");
    }
    return rates;
  } catch (error) {
    console.error("Error getting rates:", error);
    throw error;
  }
};
