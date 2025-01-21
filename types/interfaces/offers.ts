export interface OfferItem {
    name: string;
    description: string;
    price: number;
}

export interface Offer {
    name: string;
    description: string;
    image: string;
    currency: string;
    offers: OfferItem[];
}