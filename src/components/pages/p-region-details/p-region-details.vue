<template>
  <div class="p-region-details">
    <div class="breadcrumbs">
      <span class="org">ГО Український військовий рух</span>
      <span v-if="regionNameUa" class="sep">•</span>
      <span v-if="regionNameUa" class="region">{{ regionNameUa }}</span>
    </div>

    <div class="layout">
      <aside class="sidebar">
        <button
          type="button"
          class="nav-link"
          :class="{ active: activeTab === 'leadership' }"
          @click="setActiveTab('leadership')"
        >{{ regionNameUa || 'Регіон' }}</button>
        <button
          type="button"
          class="nav-link"
          :class="{ active: activeTab === 'news' }"
          @click="setActiveTab('news')"
        >Новини</button>
        <button
          type="button"
          class="nav-link"
          :class="{ active: activeTab === 'contacts' }"
          @click="setActiveTab('contacts')"
        >Контакти</button>
      </aside>

      <main class="content">
        <ORegionLeadershipSection 
          v-if="activeTab === 'leadership'"
          :region-id="regionId"
        />
        <ORegionNewsSection 
          v-if="activeTab === 'news'"
          :region-id="regionId"
        />
        <div v-if="activeTab === 'contacts'" class="contacts-tab">
          <div class="contacts-layout">
            <div class="contacts-info">
              <ORegionContactsSection :contacts="regionContacts" />
            </div>
            <div class="contacts-map" v-if="mapSrc">
              <iframe 
                :src="mapSrc" 
                width="100%" 
                height="400" 
                style="border:0;" 
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ORegionLeadershipSection from '~/components/organisms/o-region-leadership-section/o-region-leadership-section.vue';
import ORegionNewsSection from '~/components/organisms/o-region-news-section/o-region-news-section.vue';
import ORegionContactsSection from '~/components/organisms/o-region-contacts-section/o-region-contacts-section.vue';
import { getRegionDetails } from '~/services/api/regions-api-service';

interface RouteParams { 
  region_id?: string;
}

export default defineComponent({
  name: 'PRegionDetails',
  
  components: {
    ORegionLeadershipSection,
    ORegionNewsSection,
    ORegionContactsSection
  },
  
  setup() {
    const route = useRoute();
    const params = route.params as RouteParams;
    const regionId = computed(() => (params.region_id || '').toString());

    const regionNameUa = ref<string>('');
    const regionContacts = ref<any | null>(null);
    const activeTab = ref<'leadership' | 'news' | 'contacts'>('leadership');

    onMounted(async () => {
      if (!regionId.value) return;
      try {
        const data = await getRegionDetails(regionId.value);
        regionNameUa.value = data?.data?.region?.name_ua ?? '';
        regionContacts.value = data?.data?.region?.contacts ?? null;
      } catch {}
    });

    const mapSrc = computed(() => {
      const addr = regionContacts.value?.address;
      if (!addr) return '';
      const q = encodeURIComponent(addr);
      return `https://www.google.com/maps?q=${q}&output=embed`;
    });

    function setActiveTab(tab: 'leadership' | 'news' | 'contacts') {
      activeTab.value = tab;
    }
    
    return {
      regionId,
      regionNameUa,
      regionContacts,
      activeTab,
      mapSrc,
      setActiveTab
    };
  }
});
</script>

<style lang="scss" src="./p-region-details.scss" />
