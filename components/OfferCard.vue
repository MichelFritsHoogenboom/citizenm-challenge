<script setup lang="ts">
import type {Offer, OfferItem} from "~/types/interfaces/offers";
import type {Rate} from "~/types/interfaces/rates";
const props = defineProps<Offer>();
const exchangeRates = inject<Rate[]>('exchangeRates', [])
const selectedCurrency = inject<Ref<string>>('selectedCurrency', ref(''))

const cheapestOffer = computed<OfferItem | null>(() => {
  return props.offers?.length
      ? props.offers.reduce((minOffer, currentOffer) =>
          currentOffer.price < minOffer.price ? currentOffer : minOffer
      )
      : null;
});

const currencySymbol = computed<string>(() => {
  let c = props.currency

  if(selectedCurrency.value){
    c = selectedCurrency.value
  }

  switch (c) {
    case 'EUR':
      return '€';
    case 'GPB':
      return '£';
    case 'USD':
      return '$';
    default:
      return c; // In case currency is neither EUR nor GBP, show the currency code
  }
});

const calculatedPrice = computed<number>(() => {
  let price = parseFloat(cheapestOffer.value?.price?.toString() || '0');
  if (isNaN(price)) return 0;

  if (selectedCurrency.value && selectedCurrency.value !== props.currency) {
    const exchangeRate = currentExchangeRate.value.rates[selectedCurrency.value];
    if (isNaN(exchangeRate)) return 0;
    price = price * exchangeRate;
  }

  return parseFloat(price.toFixed(2));
});

const currentExchangeRate = computed(() => {
  const rateData = exchangeRates.find(rate => rate.base === props.currency);
  const emptyRate: Rate = {
    base: "",
    rates: {}
  };

  return rateData || emptyRate;
});

</script>

<template>
  <article class="card">
    <img class="image" :alt="name" :src="image" />

    <div class="meta-container">
    <h2 class="header medium-text">
      {{name}}
    </h2>
    <p class="description text">
      {{description}}
    </p>
      <div class="price-info">
        <div class="text">
        price per night, starting from
        </div>
        <div class="price  medium-text">
          {{currencySymbol}} {{ calculatedPrice }}
        </div>
      </div>
      <a href="#" class="btn-cta">
        view rates
      </a>
    </div>
  </article>
</template>

<style scoped>
.card{
  display: flex;
  flex-direction: column;

  .image {
    width:100%;
    height:160px;
    object-fit: cover;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .meta-container{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding:16px;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    border-top: 0;
    .header{
      margin:0;
      font-weight:var(--font-weight-bold);
    }
    .description{
      margin:var(--spacing-1) 0 var(--spacing-2) 0 ;
      padding:0px;
      flex-grow: 1;
    }

    .price-info{
      background-color: var(--color-tertiary);
      display:flex;
      align-items: center;
      justify-content: space-between;
      border-radius: var(--border-radius);
      padding: var(--spacing-1) var(--spacing-2);

      .price{
        white-space: nowrap;
        padding-left: var(--spacing-3);
        letter-spacing: calc(var(--font-size) * -0.005);
      }
    }
  }
}
</style>