<script setup lang="ts">
import type { Offer } from "~/types/offers";

defineProps<{
  offers: Offer[];
}>();
</script>

<template>
  <section class="grid">
    <OfferCard v-for="offer in offers" :key="offer.name" v-bind="offer" />
  </section>
</template>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(283px, 1fr));
  gap: var(--spacing-3);
  align-items: stretch;
}
</style>
