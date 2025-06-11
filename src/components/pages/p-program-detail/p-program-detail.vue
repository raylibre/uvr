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
          <i class="fas fa-search text-6xl text-gray-400"/>
        </div>
        <h1 class="not-found-title">Програму не знайдено</h1>
        <p class="not-found-description">
          На жаль, програма з адресою <code>{{ slug }}</code> не існує або була видалена.
        </p>
        <div class="not-found-actions">
          <router-link :to="{ name: 'PROGRAMS' }" class="btn btn-primary">
            <i class="fas fa-arrow-left mr-2"/>
            Переглянути всі програми
          </router-link>
          <router-link :to="{ name: 'HOME' }" class="btn btn-outline">
            <i class="fas fa-home mr-2"/>
            На головну
          </router-link>
        </div>
        <div v-if="error" class="error-details">
          <details class="error-details-expandable">
            <summary>Технічні деталі</summary>
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
            <i class="fas fa-heart text-6xl text-white"/>
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
                    <i class="fas fa-info-circle"/>
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
              <i class="fas fa-users text-primary"/>
              <div>
                <span class="stat-number">{{ program.total_helped }}</span>
                <span class="stat-label">Допомогли</span>
              </div>
            </div>
            <div class="stat-item">
              <i class="fas fa-user-clock text-green-500"/>
              <div>
                <span class="stat-number">{{ program.current_participants }}</span>
                <span class="stat-label">Учасників зараз</span>
              </div>
            </div>
            <div class="stat-item">
              <i class="fas fa-trophy text-yellow-500"/>
              <div>
                <span class="stat-number">{{ program.success_stories_count }}</span>
                <span class="stat-label">Успішних історій</span>
              </div>
            </div>
            <div v-if="program.total_budget" class="stat-item">
              <i class="fas fa-coins text-purple-500"/>
              <div>
                <span class="stat-number">{{ formatBudget(program.total_budget) }}</span>
                <span class="stat-label">Бюджет програми</span>
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
              <div class="content-section">
                <h2 class="section-title">Про програму</h2>
                <div class="prose" v-html="formatDescription(program.description)"/>
              </div>

              <!-- Requirements -->
              <div v-if="program.requirements.length" class="content-section">
                <h2 class="section-title">Вимоги для участі</h2>
                <ul class="requirements-list">
                  <li v-for="requirement in program.requirements" :key="requirement">
                    <i class="fas fa-check-circle text-green-500"/>
                    {{ requirement }}
                  </li>
                </ul>
              </div>

              <!-- Benefits -->
              <div v-if="program.benefits.length" class="content-section">
                <h2 class="section-title">Що ви отримаєте</h2>
                <ul class="benefits-list">
                  <li v-for="benefit in program.benefits" :key="benefit">
                    <i class="fas fa-gift text-primary"/>
                    {{ benefit }}
                  </li>
                </ul>
              </div>

              <!-- Gallery -->
              <div v-if="program.gallery_images.length > 1" class="content-section">
                <h2 class="section-title">Галерея</h2>
                <div class="gallery-grid">
                  <img 
                    v-for="(image, index) in program.gallery_images" 
                    :key="index"
                    :src="image" 
                    :alt="`${program.title} - зображення ${index + 1}`"
                    class="gallery-image"
                  />
                </div>
              </div>
            </div>

            <!-- Right Column - Application Form and Info -->
            <div class="content-right">
              <!-- Program Info Card -->
              <div class="info-card">
                <h3 class="info-title">Інформація про програму</h3>
                <div class="info-list">
                  <div v-if="program.duration_months" class="info-item">
                    <i class="fas fa-calendar-alt"/>
                    <span>Тривалість: {{ program.duration_months }} місяців</span>
                  </div>
                  <div v-if="program.location" class="info-item">
                    <i class="fas fa-map-marker-alt"/>
                    <span>Локація: {{ program.location }}</span>
                  </div>
                  <div v-if="program.max_participants" class="info-item">
                    <i class="fas fa-users"/>
                    <span>Максимум учасників: {{ program.max_participants }}</span>
                  </div>
                  <div v-if="program.application_deadline" class="info-item">
                    <i class="fas fa-clock"/>
                    <span>Дедлайн: {{ formatDate(program.application_deadline) }}</span>
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
              </div>

              <!-- Application Form -->
              <div v-if="isAuthenticated && canApply" class="application-card">
                <h3 class="application-title">Подати заявку</h3>
                <form class="application-form" @submit.prevent="handleSubmitApplication">
                  <div class="form-group">
                    <label for="applicationMessage" class="form-label">
                      Повідомлення для організаторів
                    </label>
                    <textarea
                      id="applicationMessage"
                      v-model="applicationMessage"
                      class="form-textarea"
                      rows="4"
                      placeholder="Розкажіть, чому ви хочете взяти участь у цій програмі..."
                    />
                  </div>
                  <button 
                    type="submit" 
                    :disabled="isJoining || !applicationMessage.trim()"
                    class="btn btn-primary btn-full"
                  >
                    <span v-if="isJoining">Подаємо заявку...</span>
                    <span v-else>Подати заявку</span>
                  </button>
                </form>
              </div>

              <!-- Status Display for Non-Applicable Users -->
              <div v-else-if="isAuthenticated && userStatus && !canApply" class="status-display-card">
                <h3 class="status-title">Статус заявки</h3>
                <div class="status-content" :class="`status-${userStatusColor}`">
                  <i class="fas fa-info-circle"/>
                  <div>
                    <h4>{{ userStatusText }}</h4>
                    <p v-if="statusReason">{{ statusReason }}</p>
                  </div>
                </div>
              </div>

              <!-- Contact Info -->
              <div
                v-if="program.contact_email || program.contact_phone"
                class="contact-card"
              >
                <h3 class="contact-title">Контакти</h3>
                <div class="contact-list">
                  <div v-if="program.contact_email" class="contact-item">
                    <i class="fas fa-envelope"/>
                    <a :href="`mailto:${program.contact_email}`">{{ program.contact_email }}</a>
                  </div>
                  <div v-if="program.contact_phone" class="contact-item">
                    <i class="fas fa-phone"/>
                    <a :href="`tel:${program.contact_phone}`">{{ program.contact_phone }}</a>
                  </div>
                </div>
              </div>

              <!-- Authentication Required -->
              <div v-if="!isAuthenticated" class="auth-required-card">
                <h3 class="auth-title">Потрібна авторизація</h3>
                <p class="auth-message">
                  Для подачі заявки на участь у програмі необхідно увійти в систему.
                </p>
                <button class="btn btn-primary btn-full">
                  Увійти в систему
                </button>
              </div>
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

export default defineComponent({
  name: 'PProgramDetail',

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

    async function handleSubmitApplication() {
      try {
        await joinProgram(applicationMessage.value);
        applicationMessage.value = '';
      } catch (error) {
        console.error('Failed to submit application:', error);
      }
    }

    onMounted(() => {
      console.log('mounted');
      loadProgramDetail();
    });

    watch(() => props.slug, () => {
      console.log('watch');
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
      formatDescription
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

    &.type-ai_psychology {
      @apply bg-purple-100 text-purple-800;
    }

    &.type-family_support {
      @apply bg-red-100 text-red-800;
    }

    &.type-prosthetics {
      @apply bg-primary-light/20 text-primary-dark;
    }

    &.type-civilian_retraining {
      @apply bg-green-100 text-green-800;
    }

    &.type-legal_aid {
      @apply bg-yellow-100 text-yellow-800;
    }
  }

  .featured-badge {
    @apply bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1;
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