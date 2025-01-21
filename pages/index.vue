<script setup lang="ts">
import type {Offer} from "~/types/interfaces/offers";
import type {Rate} from "~/types/interfaces/rates";

const selectedCurrency = ref<string>('');

const { data: offers, error: offersError } = await useFetch<Offer[]>("/api/offers", {
  default: () => []
});
const { data: exchangeRates, error: ratesError } = await useFetch<Rate[]>("/api/rates");


if ((offersError.value || ratesError.value) ||
    (!offers || !exchangeRates)) {
  throw createError("Error fetching data: " + (offersError.value?.message || ratesError.value?.message));
}

const availableCurrencies = computed<string[]>(() => {
  if (!exchangeRates.value || exchangeRates.value.length === 0) return [];
  const rates = exchangeRates.value[0]?.rates; // Assuming the first object contains all currencies
  const currencies = rates ? Object.keys(rates) : [];

  return ['Local', ...currencies];
});

const changeCurrency = (currency: string) => {
  selectedCurrency.value = currency;
};

if (exchangeRates.value) {
  provide('exchangeRates', exchangeRates.value);
}
provide('selectedCurrency', selectedCurrency as Ref<string>)

</script>

<template>
  <div>
    <h1 class="h1">
    {{offers.length}} available hotels in Europe
    </h1>

    <div class="currency-switcher" v-if="availableCurrencies.length">
      <label for="select" class="label">currency:</label>
      <select id="select" class="select" v-model="selectedCurrency" @change="changeCurrency(selectedCurrency)">
        <option v-for="(currency, index) in availableCurrencies" :key="currency" :value="index !== 0 ? currency : ''">
          {{ currency }}
        </option>
      </select>
    </div>

    <OfferList
        v-if="offers"
        :offers="offers"
    />
  </div>
</template>

<style scoped>
.currency-switcher{
  display:flex;
  padding:var(--spacing-1) 0;
  margin: var(--spacing-4) 0;
  .label{
    font-size: 1.14rem;
  }
  .select{
    margin-left: var(--spacing-4);
  }
}
</style>