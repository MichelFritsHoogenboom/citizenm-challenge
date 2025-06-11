export type OfferItem = {
  name: string;
  description: string;
  price: number;
};

export type Locale = {
  currency: string;
  language: string;
};

export type Offer = {
  name: string;
  description: string;
  image: string;
  locale: Locale;
  offers: OfferItem[];
};
