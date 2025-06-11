<template>
  <div class="p-about">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">{{ $t('about.hero.title') }}</h1>
        <p class="hero-subtitle">{{ $t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="mission-vision-section">
      <div class="container">
        <div class="mission-vision-grid">
          <div class="card">
            <h2 class="card-title">{{ $t('about.mission.title') }}</h2>
            <p class="card-description">{{ $t('about.mission.description') }}</p>
          </div>
          <div class="card">
            <h2 class="card-title">{{ $t('about.vision.title') }}</h2>
            <p class="card-description">{{ $t('about.vision.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <h2 class="section-title">{{ $t('about.values.title') }}</h2>
        <div class="values-grid">
          <div
            v-for="(value, key) in valuesItems"
            :key="key"
            class="value-card"
          >
            <div class="value-icon">
              <AIcon :name="value.icon" />
            </div>
            <h3 class="value-title">{{ $t(`about.values.items.${key}.title`) }}</h3>
            <p class="value-description">{{ $t(`about.values.items.${key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">{{ $t('about.services.title') }}</h2>
        <p class="section-description">{{ $t('about.services.description') }}</p>
        <div class="services-list">
          <div
            v-for="(service, key) in servicesItems"
            :key="key"
            class="service-item"
          >
            <div class="service-icon">
              <AIcon :name="service.icon" />
            </div>
            <span class="service-text">{{ $t(`about.services.items.${key}`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="stats-section">
      <div class="container">
        <h2 class="section-title">{{ $t('about.stats.title') }}</h2>
        <div class="stats-grid">
          <div
            v-for="stat in statistics"
            :key="stat.key"
            class="stat-card"
          >
            <div class="stat-number">{{ stat.value }}+</div>
            <div class="stat-label">{{ $t(`about.stats.${stat.key}`) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">{{ $t('about.contact.title') }}</h2>
        <p class="section-description">{{ $t('about.contact.description') }}</p>
        <div class="contact-buttons">
          <AButton
            variant="primary"
            size="lg"
            @click="handleJoinCommunity"
          >
            {{ $t('about.contact.joinButton') }}
          </AButton>
          <AButton
            variant="outline"
            size="lg"
            @click="handleContactUs"
          >
            {{ $t('about.contact.contactButton') }}
          </AButton>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <OFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AIcon from '~/components/atoms/a-icon';
import AButton from '~/components/atoms/a-button';
import OFooter from '~/components/organisms/o-footer';

export default defineComponent({
  name: 'PAbout',

  components: {
    AIcon,
    AButton,
    OFooter
  },

  setup() {
    const valuesItems = {
      integrity: { icon: 'fas fa-shield-alt' },
      compassion: { icon: 'fas fa-heart' },
      excellence: { icon: 'fas fa-star' },
      community: { icon: 'fas fa-users' }
    };

    const servicesItems = {
      legal: { icon: 'fas fa-gavel' },
      prosthetics: { icon: 'fas fa-medkit' },
      family: { icon: 'fas fa-home' },
      activities: { icon: 'fas fa-calendar-alt' },
      leadership: { icon: 'fas fa-user-tie' }
    };

    const statistics = [
      { key: 'veterans', value: 500 },
      { key: 'families', value: 300 },
      { key: 'programs', value: 15 },
      { key: 'years', value: 5 }
    ];

    const handleJoinCommunity = () => {
      // TODO: Implement join community functionality
      console.warn('Join community functionality to be implemented');
    };

    const handleContactUs = () => {
      // TODO: Navigate to contact page or open contact form
      console.warn('Contact us functionality to be implemented');
    };

    return {
      valuesItems,
      servicesItems,
      statistics,
      handleJoinCommunity,
      handleContactUs
    };
  }
});
</script>

<style lang="scss">
@import './styles.scss';
</style> 