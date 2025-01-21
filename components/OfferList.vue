<script setup lang="ts">
import type {Offer} from "~/types/interfaces/offers";

defineProps<{
  offers: Offer[];
}>();
</script>

<template>
  <section class="grid">
    <OfferCard
        v-for="offer in offers"
        :key="offer.name"
        v-bind="offer"
    />
  </section>
</template>
