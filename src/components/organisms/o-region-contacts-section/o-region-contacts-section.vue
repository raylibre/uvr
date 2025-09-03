<template>
  <section class="o-region-contacts-section">
    <h3 class="title">Контакти регіонального осередку</h3>

    <div class="card">
      <div class="row">
        <span class="label">Адреса:</span>
        <span class="value">{{ contacts?.address || 'Невідомо' }}</span>
      </div>
      <div class="row">
        <span class="label">Телефон:</span>
        <span class="value">{{ contacts?.phone || 'Невідомо' }}</span>
      </div>
      <div class="row">
        <span class="label">Email:</span>
        <span class="value">{{ contacts?.email || 'Невідомо' }}</span>
      </div>

      <div v-if="contacts?.bank_details" class="bank">
        <div class="row">
          <span class="label">ЄДРПОУ:</span>
          <span class="value">{{ contacts.bank_details.edrpou }}</span>
        </div>
        <div class="row">
          <span class="label">Банк:</span>
          <span class="value">{{ contacts.bank_details.bank_name }}</span>
        </div>
        <div class="row">
          <span class="label">Рахунок IBAN:</span>
          <span class="value">{{ contacts.bank_details.account_number }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{ contacts: any | null }>();
</script>

<style lang="scss" scoped>
.o-region-contacts-section {
  .title { 
    @apply text-2xl font-bold mb-6 text-primary;
  }

  .card { 
    @apply w-full p-6 rounded-xl border border-gray-200 bg-white shadow-sm;
    max-width: none;
  }
  
  .row { 
    @apply flex flex-col sm:flex-row sm:items-start gap-3 py-3 border-b border-gray-50 last:border-b-0;
  }
  
  .label { 
    @apply text-sm font-semibold text-gray-700 uppercase tracking-wide;
    min-width: 140px;
  }
  
  .value { 
    @apply flex-1 text-gray-900 leading-relaxed break-words;
  }
  
  .bank { 
    @apply mt-6 pt-6 border-t border-gray-200;
    
    .row:first-child {
      @apply pt-0;
    }
  }
}
</style>

