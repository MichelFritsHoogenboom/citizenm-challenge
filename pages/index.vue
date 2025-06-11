<script setup lang="ts">
import type { Offer } from "~/types/offers";
import type { Rate } from "~/types/rates";

// State
const selectedCurrency = useState<string>("selectedCurrency", () => "");
const currentLocale = ref<string>("en");
const exchangeRates = useState<Rate[]>("exchangeRates", () => []);

// Data fetching
const { data: offers, error: offersError } = await useFetch<Offer[]>(
  "/api/offers",
  {
    default: () => [],
  }
);

const { data: ratesResponse, error: ratesError } = await useFetch<{
  data: Rate[];
}>("/api/rates", {
  default: () => ({ data: [] }),
});

// Error handling
if (offersError.value || ratesError.value) {
  console.error("Fetch errors:", {
    offersError: offersError.value,
    ratesError: ratesError.value,
  });
}

// State updates
if (ratesResponse.value?.data) {
  exchangeRates.value = ratesResponse.value.data;
}

if (offers.value && offers.value.length > 0) {
  currentLocale.value = offers.value[0].locale.language;
}

// Computed
const availableCurrencies = computed<string[]>(() => {
  if (!exchangeRates.value?.length) return [];
  const rates = exchangeRates.value[0]?.rates;
  return rates ? Object.keys(rates) : [];
});

// Methods
const changeCurrency = (currency: string) => {
  selectedCurrency.value = currency;
};

const getCurrencyDisplayName = (currency: string) => {
  try {
    return (
      new Intl.NumberFormat("en", { style: "currency", currency })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value || currency
    );
  } catch (error) {
    return currency;
  }
};
</script>

<template>
  <div>
    <h1 class="h1">{{ offers?.length || 0 }} available hotels in Europe</h1>

    <div v-if="availableCurrencies.length" class="currency-switcher">
      <label for="currency-select" class="label">currency:</label>
      <select
        id="currency-select"
        class="select"
        v-model="selectedCurrency"
        @change="changeCurrency(selectedCurrency)"
        aria-label="Select currency"
      >
        <option value="">Select currency</option>
        <option
          v-for="currency in availableCurrencies"
          :key="currency"
          :value="currency"
        >
          {{ getCurrencyDisplayName(currency) }}
        </option>
      </select>
    </div>

    <OfferList v-if="offers" :offers="offers" />
  </div>
</template>

<style scoped>
.currency-switcher {
  display: flex;
  padding: var(--spacing-1) 0;
  margin: var(--spacing-2) 0;

  @media (min-width: 992px) {
    margin: var(--spacing-3) 0;
  }
  @media (min-width: 1200px) {
    margin: var(--spacing-4) 0;
  }
}

.label {
  font-size: 1.14rem;
}

.select {
  margin-left: var(--spacing-4);
}
</style>
