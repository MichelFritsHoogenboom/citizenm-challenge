<script setup lang="ts">
import type { Offer, OfferItem } from "~/types/offers";
import type { Rate } from "~/types/rates";

const props = defineProps<Offer>();
const selectedCurrency = useState<string>("selectedCurrency");
const exchangeRates = useState<Rate[]>("exchangeRates");

// Computed
const cheapestOffer = computed<OfferItem | null>(() => {
  if (!props.offers?.length) return null;

  return props.offers.reduce((minOffer, currentOffer) =>
    currentOffer.price < minOffer.price ? currentOffer : minOffer
  );
});

const currentExchangeRate = computed<Rate>(() => {
  if (!exchangeRates.value) {
    return { base: "", rates: {} };
  }

  return (
    exchangeRates.value.find((rate) => rate.base === props.locale.currency) || {
      base: "",
      rates: {},
    }
  );
});

const calculatedPrice = computed<number>(() => {
  const price = parseFloat(cheapestOffer.value?.price?.toString() || "0");
  if (isNaN(price)) return 0;

  if (
    !selectedCurrency.value ||
    selectedCurrency.value === props.locale.currency
  ) {
    return price;
  }

  const exchangeRate = currentExchangeRate.value.rates[selectedCurrency.value];
  if (isNaN(exchangeRate)) return 0;

  return parseFloat((price * exchangeRate).toFixed(2));
});

const formattedPrice = computed<string>(() => {
  const currency = selectedCurrency.value || props.locale.currency;
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(calculatedPrice.value);
  } catch (error) {
    console.error("Error formatting price:", error);
    return "";
  }
});
</script>

<template>
  <article class="card">
    <img class="image" :alt="name" :src="image" />

    <div class="meta-container">
      <h2 class="header medium-text">{{ name }}</h2>
      <p class="description text">{{ description }}</p>
      <div class="price-info">
        <div class="text">price per night, starting from</div>
        <div class="price medium-text">{{ formattedPrice }}</div>
      </div>
      <a href="#" class="btn-cta">view rates</a>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
}

.image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}

.meta-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 16px;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  border-top: 0;
}

.header {
  margin: 0;
  font-weight: var(--font-weight-bold);
}

.description {
  margin: var(--spacing-1) 0 var(--spacing-2) 0;
  padding: 0;
  flex-grow: 1;
}

.price-info {
  background-color: var(--color-tertiary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--border-radius);
  padding: var(--spacing-1) var(--spacing-2);
}

.price {
  white-space: nowrap;
  padding-left: var(--spacing-3);
  letter-spacing: calc(var(--font-size) * -0.005);
}

.btn-cta {
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.28rem;
  margin-top: var(--spacing-1);
  height: 4.28rem;
  font-weight: var(--font-weight-bold);
  vertical-align: center;
  border-radius: var(--border-radius);
  color: var(--color-white);
  text-decoration: none;
  &:hover,
  &:focus {
    background-color: var(--color-primary-hover);
  }
}
</style>
