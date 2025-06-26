<template>
  <div class="p-program-detail">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div v-loading="true" class="flex justify-center items-center min-h-screen">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"/>
      </div>
    </div>

    <!-- Program Not Found State -->
    <div v-else-if="isProgramNotFound" class="not-found-container">
      <div class="not-found-content">
        <div class="not-found-icon">
          <AIcon
            name="fa-search"
            size="xl"
            color="gray-400"
            class="text-6xl"
          />
        </div>
        <h1 class="not-found-title">{{ t(T_KEYS.PROGRAM_DETAIL.NOT_FOUND_TITLE) }}</h1>
        <p class="not-found-description">
          {{ t('programDetail.notFoundDescription', { slug }) }}
        </p>
        <div class="not-found-actions">
          <router-link :to="{ name: 'PROGRAMS' }" class="btn btn-primary">
            <i class="fas fa-arrow-left mr-2"/>
            {{ t(T_KEYS.COMMON.BUTTONS.VIEW_ALL_PROGRAMS) }}
          </router-link>
          <router-link :to="{ name: 'HOME' }" class="btn btn-outline">
            <i class="fas fa-home mr-2"/>
            {{ t(T_KEYS.COMMON.BUTTONS.BACK_TO_HOME) }}
          </router-link>
        </div>
        <div v-if="error" class="error-details">
          <details class="error-details-expandable">
            <summary>{{ t('programDetail.technicalDetails') }}</summary>
            <pre class="error-text">{{ error }}</pre>
          </details>
        </div>
      </div>
    </div>

    <!-- Program Detail Content -->
    <div v-else-if="program" class="program-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-image-container">
          <img 
            v-if="program.gallery_images && program.gallery_images.length > 0" 
            :src="program.gallery_images[0]" 
            :alt="program.title"
            class="hero-image"
          />
          <div v-else class="hero-image-placeholder">
            <AIcon name="fa-heart" size="xl" color="white"/>
          </div>
          <div class="hero-overlay">
            <div class="container mx-auto px-4 py-16">
              <div class="hero-content">
                <div class="program-badges">
                  <span 
                    class="type-badge" 
                    :class="`type-${program.project_type}`"
                  >
                    {{ getProjectTypeLabel(program.project_type) }}
                  </span>
                  <span v-if="program.is_featured" class="featured-badge">
                    <i class="fas fa-star"/>
                    Рекомендовано
                  </span>
                </div>
                <h1 class="hero-title">{{ program.title }}</h1>
                <p class="hero-description">{{ program.short_description }}</p>
                
                <!-- User Status Display -->
                <div v-if="userStatus" class="status-card">
                  <div class="status-content" :class="`status-${userStatusColor}`">
                    <AIcon name="fa-info-circle" size="sm" color="primary"/>
                    <div>
                      <h3>{{ userStatusText }}</h3>
                      <p v-if="statusReason">{{ statusReason }}</p>
                      <p class="status-date">
                        Перевірено: {{ formatDate(userStatus.checked_at) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Program Stats -->
      <section class="stats-section">
        <div class="container mx-auto px-4 py-8">
          <div class="stats-grid">
            <div class="stat-item">
              <AIcon name="fa-users" size="sm" color="primary"/>
              <div>
                <span class="stat-number">{{ program.total_helped }}</span>
                <span class="stat-label">{{ t('programDetail.stats.helped') }}</span>
              </div>
            </div>
            <div class="stat-item">
              <AIcon name="fa-user-clock" size="sm" color="primary"/>
              <div>
                <span class="stat-number">{{ program.current_participants }}</span>
                <span class="stat-label">{{ t('programDetail.stats.currentParticipants') }}</span>
              </div>
            </div>
            <div class="stat-item">
              <AIcon name="fa-trophy" size="sm" color="primary"/>
              <div>
                <span class="stat-number">{{ program.success_stories_count }}</span>
                <span class="stat-label">{{ t('programDetail.stats.successStories') }}</span>
              </div>
            </div>
            <div v-if="program.total_budget" class="stat-item">
              <AIcon name="fa-coins" size="sm" color="primary"/>
              <div>
                <span class="stat-number">{{ formatBudget(program.total_budget) }}</span>
                <span class="stat-label">{{ t('programDetail.stats.budget') }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="main-content">
        <div class="container mx-auto px-4 py-16">
          <div class="content-grid">
            <!-- Left Column - Description and Details -->
            <div class="content-left">
              <!-- Description -->
              <MContentSection>
                <h2 class="section-title">{{ t('programDetail.aboutSection') }}</h2>
                <div class="prose" v-html="formatDescription(program.description)"/>
              </MContentSection>

              <!-- Requirements -->
              <MContentSection v-if="program.requirements.length">
                <h2 class="section-title">{{ t('programDetail.requirementsSection') }}</h2>
                <ul class="requirements-list">
                  <li v-for="requirement in program.requirements" :key="requirement">
                    <AIcon name="fa-check-circle" size="sm" color="yellow"/>
                    {{ requirement }}
                  </li>
                </ul>
              </MContentSection>

              <!-- Benefits -->
              <MContentSection v-if="program.benefits.length">
                <h2 class="section-title">{{ t('programDetail.benefitsSection') }}</h2>
                <ul class="benefits-list">
                  <li v-for="benefit in program.benefits" :key="benefit">
                    <AIcon name="fa-gift" size="sm" color="primary"/>
                    {{ benefit }}
                  </li>
                </ul>
              </MContentSection>

              <!-- Gallery -->
              <MContentSection v-if="program.gallery_images.length > 1">
                <h2 class="section-title">{{ t('programDetail.gallerySection') }}</h2>
                <div class="gallery-grid">
                  <img 
                    v-for="(image, index) in program.gallery_images" 
                    :key="index"
                    :src="image" 
                    :alt="`${program.title} - зображення ${index + 1}`"
                    class="gallery-image"
                  />
                </div>
              </MContentSection>
            </div>

            <!-- Right Column - Application Form and Info -->
            <div class="content-right">
              <!-- Program Info Card -->
              <MContentSection>
                <h3 class="info-title">{{ t('programDetail.infoCard.title') }}</h3>
                <div class="info-list">
                  <div v-if="program.duration_months" class="info-item">
                    <AIcon name="fa-calendar-alt" size="sm"/>
                    <span>{{ t('programDetail.infoCard.duration', { months: program.duration_months }) }}</span>
                  </div>
                  <div v-if="program.location" class="info-item">
                    <AIcon name="fa-map-marker-alt" size="sm"/>
                    <span>{{ t('programDetail.infoCard.location', { location: program.location }) }}</span>
                  </div>
                  <div v-if="program.max_participants" class="info-item">
                    <AIcon name="fa-users" size="sm"/>
                    <span>{{ t('programDetail.infoCard.maxParticipants', { max: program.max_participants }) }}</span>
                  </div>
                  <div v-if="program.application_deadline" class="info-item">
                    <AIcon name="fa-clock" size="sm"/>
                    <span>{{ t('programDetail.infoCard.deadline', { date: formatDate(program.application_deadline) }) }}</span>
                  </div>
                </div>

                <!-- Tags -->
                <div v-if="program.tags.length" class="tags-section">
                  <span 
                    v-for="tag in program.tags" 
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </MContentSection>

              <!-- Application Form -->
              <MContentSection v-if="isAuthenticated && canApply">
                <h3 class="application-title">{{ t('programDetail.applicationForm.title') }}</h3>
                <form class="application-form" @submit.prevent="handleSubmitApplication">
                  <div class="form-group">
                    <label for="applicationMessage" class="form-label">
                      {{ t('programDetail.applicationForm.messageLabel') }}
                    </label>
                    <textarea
                      id="applicationMessage"
                      v-model="applicationMessage"
                      class="form-textarea"
                      rows="4"
                      :placeholder="t('programDetail.applicationForm.messagePlaceholder')"
                    />
                  </div>
                  <AButton 
                    type="submit"
                    :loading="isJoining"
                    :disabled="isJoining || !applicationMessage.trim()"
                    variant="primary"
                    size="md"
                    class="btn-full"
                  >
                    <template v-if="isJoining">{{ t(T_KEYS.COMMON.BUTTONS.SENDING) }}</template>
                    <template v-else>{{ t(T_KEYS.COMMON.BUTTONS.JOIN) }}</template>
                  </AButton>
                </form>
              </MContentSection>

              <!-- Status Display for Non-Applicable Users -->
              <MContentSection v-else-if="isAuthenticated && userStatus && !canApply">
                <h3 class="status-title">{{ t('programDetail.statusCard.title') }}</h3>
                <div class="status-content" :class="`status-${userStatusColor}`">
                  <AIcon name="fa-info-circle" size="sm" color="primary"/>
                  <div>
                    <h4>{{ userStatusText }}</h4>
                    <p v-if="statusReason">{{ statusReason }}</p>
                  </div>
                </div>
              </MContentSection>

              <!-- Contact Info -->
              <MContentSection v-if="program.contact_email || program.contact_phone">
                <h3 class="contact-title">{{ t('programDetail.contactCard.title') }}</h3>
                <div class="contact-list">
                  <div v-if="program.contact_email" class="contact-item">
                    <AIcon name="fa-envelope" size="sm"/>
                    <a :href="`mailto:${program.contact_email}`">{{ program.contact_email }}</a>
                  </div>
                  <div v-if="program.contact_phone" class="contact-item">
                    <AIcon name="fa-phone" size="sm"/>
                    <a :href="`tel:${program.contact_phone}`">{{ program.contact_phone }}</a>
                  </div>
                </div>
              </MContentSection>

              <!-- Authentication Required -->
              <MContentSection v-if="!isAuthenticated">
                <h3 class="auth-title">{{ t('programDetail.authCard.title') }}</h3>
                <p class="auth-message">
                  {{ t('programDetail.authCard.message') }}
                </p>
                <AButton 
                  variant="primary" 
                  size="md" 
                  class="btn-full"
                  @click="$emit('login')"
                >
                  {{ t(T_KEYS.COMMON.BUTTONS.LOGIN) }}
                </AButton>
              </MContentSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { useProgramDetail } from '~/composables/use-program-detail';
import AIcon from '~/components/atoms/a-icon';
import AButton from '~/components/atoms/a-button';
import MContentSection from '~/components/molecules/m-content-section';
import { useTranslation } from '~/composables/use-translation';

export default defineComponent({
  name: 'PProgramDetail',

  components: {
    AIcon,
    AButton,
    MContentSection
  },

  props: {
    slug: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const applicationMessage = ref('');

    const getSlug = computed(() => props.slug);
    
    const {
      program,
      userStatus,
      isLoading,
      isLoadingStatus,
      isJoining,
      isAuthenticated,
      canApply,
      userStatusText,
      userStatusColor,
      statusReason,
      error,
      isProgramNotFound,
      loadProgramDetail,
      joinProgram,
      formatDate,
      formatBudget,
      getProjectTypeLabel,
      formatDescription
    } = useProgramDetail(getSlug);

    // i18n
    const { t, T_KEYS } = useTranslation();

    async function handleSubmitApplication() {
        await joinProgram(applicationMessage.value);
        applicationMessage.value = '';
    }

    onMounted(() => {
      loadProgramDetail();
    });

    watch(() => props.slug, () => {
      loadProgramDetail();
    })

    return {
      program,
      userStatus,
      isLoading,
      isLoadingStatus,
      isJoining,
      isAuthenticated,
      canApply,
      userStatusText,
      userStatusColor,
      statusReason,
      error,
      isProgramNotFound,
      applicationMessage,
      loadProgramDetail,
      handleSubmitApplication,
      formatDate,
      formatBudget,
      getProjectTypeLabel,
      formatDescription,
      t,
      T_KEYS
    };
  }
});
</script>

<style lang="scss" scoped>
.p-program-detail {
  @apply min-h-screen bg-gray-50;

  .loading-container,
  .not-found-container {
    @apply min-h-screen flex items-center justify-center;
  }

  .not-found-content {
    @apply bg-white rounded-lg p-8 shadow-sm max-w-2xl mx-4 text-center;

    .not-found-icon {
      @apply mb-6;
    }

    .not-found-title {
      @apply text-3xl font-bold text-gray-900 mb-4;
    }

    .not-found-description {
      @apply text-lg text-gray-600 mb-8 leading-relaxed;

      code {
        @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600;
      }
    }

    .not-found-actions {
      @apply flex flex-col sm:flex-row gap-4 justify-center mb-6;
    }

    .error-details {
      @apply mt-8 text-left;

      .error-details-expandable {
        @apply border border-gray-200 rounded-lg p-4;

        summary {
          @apply cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900;
        }

        .error-text {
          @apply mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded border overflow-auto;
        }
      }
    }
  }

  .hero-section {
    @apply relative;

    .hero-image-container {
      @apply relative h-96 overflow-hidden;
    }

    .hero-image {
      @apply w-full h-full object-cover;
    }

    .hero-image-placeholder {
      @apply w-full h-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center;
    }

    .hero-overlay {
      @apply absolute inset-0 bg-black bg-opacity-50 flex items-end;
    }

    .hero-content {
      @apply text-white;

      .program-badges {
        @apply flex gap-2 mb-4;
      }

      .hero-title {
        @apply text-4xl font-bold mb-4;
      }

      .hero-description {
        @apply text-xl mb-6;
      }
    }

    .status-card {
      @apply bg-white bg-opacity-95 rounded-lg p-4 max-w-md;

      .status-content {
        @apply flex items-start gap-3;

        &.status-pending {
          @apply border-l-4 border-yellow-500;
        }

        &.status-approved {
          @apply border-l-4 border-green-500;
        }

        &.status-rejected {
          @apply border-l-4 border-red-500;
        }

        h3 {
          @apply font-semibold text-gray-900;
        }

        p {
          @apply text-sm text-gray-600;
        }

        .status-date {
          @apply text-xs text-gray-500 mt-1;
        }
      }
    }
  }

  .stats-section {
    @apply bg-white border-b;

    .stats-grid {
      @apply grid grid-cols-2 md:grid-cols-4 gap-6;
    }

    .stat-item {
      @apply flex items-center gap-3 text-center md:text-left;

      i {
        @apply text-2xl;
      }

      .stat-number {
        @apply block text-2xl font-bold text-gray-900;
      }

      .stat-label {
        @apply block text-sm text-gray-500;
      }
    }
  }

  .main-content {
    .content-grid {
      @apply grid lg:grid-cols-3 gap-8;
    }

    .content-left {
      @apply lg:col-span-2 space-y-8;
    }

    .content-right {
      @apply space-y-6;
    }

    .content-section {
      @apply bg-white rounded-lg p-6 shadow-sm;
    }

    .section-title {
      @apply text-2xl font-bold text-gray-900 mb-4;
    }

    .prose {
      @apply text-gray-700 leading-relaxed;
    }

    .requirements-list,
    .benefits-list {
      @apply space-y-3;

      li {
        @apply flex items-start gap-3 text-gray-700;

        i {
          @apply mt-0.5;
        }
      }
    }

    .gallery-grid {
      @apply grid grid-cols-2 md:grid-cols-3 gap-4;
    }

    .gallery-image {
      @apply w-full h-32 object-cover rounded-lg;
    }

    .info-card,
    .application-card,
    .contact-card,
    .auth-required-card,
    .status-display-card {
      @apply bg-white rounded-lg p-6 shadow-sm;
    }

    .info-title,
    .application-title,
    .contact-title,
    .auth-title,
    .status-title {
      @apply text-lg font-semibold text-gray-900 mb-4;
    }

    .info-list,
    .contact-list {
      @apply space-y-3;
    }

    .info-item,
    .contact-item {
      @apply flex items-center gap-3 text-gray-700;

      i {
        @apply text-primary w-4;
      }

      a {
        @apply text-primary hover:text-primary-dark;
      }
    }

    .tags-section {
      @apply flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200;
    }

    .tag {
      @apply inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full;
    }

    .application-form {
      @apply space-y-4;
    }

    .form-group {
      .form-label {
        @apply block text-sm font-medium text-gray-700 mb-2;
      }

      .form-textarea {
        @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent;
      }
    }

    .error-message {
      @apply text-red-600 text-sm;
    }

    .auth-message {
      @apply text-gray-600 mb-4;
    }
  }

  .type-badge {
    @apply inline-block px-3 py-1 rounded-full text-xs font-medium;
    @apply bg-primary text-white;
  }

  .featured-badge {
    @apply bg-yellow-dark text-white text-xs px-2 py-1 rounded-full flex items-center gap-1;
  }

  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center;

    &.btn-primary {
      @apply bg-primary text-white hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed;
    }

    &.btn-outline {
      @apply border-2 border-primary text-primary hover:bg-primary hover:text-white;
    }

    &.btn-full {
      @apply w-full;
    }
  }
}
</style> 