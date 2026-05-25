<template>
  <div class="p-profile">
    <section class="profile-hero">
      <div class="hero-inner">
        <div class="hero-avatar">
          <img
            v-if="user?.avatar_url"
            :src="user.avatar_url"
            :alt="userFullName"
            class="avatar-img"
          />
          <div v-else class="avatar-initials">{{ userInitials }}</div>
        </div>

        <div class="hero-meta">
          <h1 class="hero-name">{{ userFullName }}</h1>
          <p class="hero-email">{{ user?.email }}</p>
          <span class="hero-badge" :class="isVerified ? 'badge--verified' : 'badge--pending'">
            <i class="fas" :class="isVerified ? 'fa-check-circle' : 'fa-clock'" />
            {{ isVerified ? t(T_KEYS.USER.STATUS.VERIFIED) : t(T_KEYS.USER.STATUS.PENDING_VERIFICATION) }}
          </span>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">{{ userStatistics?.available_projects ?? 0 }}</span>
            <span class="stat-label">{{ t(T_KEYS.PROFILE.STATS.AVAILABLE_PROJECTS) }}</span>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <span class="stat-number">{{ pendingApplications?.length ?? 0 }}</span>
            <span class="stat-label">{{ t(T_KEYS.PROFILE.STATS.PENDING_APPLICATIONS) }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="profile-container">
      <div class="dashboard-grid">
        <div class="profile-card">
          <h2 class="card-title">
            <i class="fas fa-user card-icon" />
            {{ t(T_KEYS.PROFILE.CARDS.PERSONAL_INFO) }}
          </h2>
          <div class="info-list">
            <div class="info-row">
              <span class="info-label">{{ t(T_KEYS.FORM.LABELS.PHONE_NUMBER) }}</span>
              <span class="info-value">{{ user?.phone || '—' }}</span>
            </div>
            <div v-if="user?.date_of_birth" class="info-row">
              <span class="info-label">{{ t(T_KEYS.FORM.LABELS.DATE_OF_BIRTH) }}</span>
              <span class="info-value">{{ formatDate(user.date_of_birth) }}</span>
            </div>
            <div v-if="user?.region" class="info-row">
              <span class="info-label">{{ t(T_KEYS.FORM.LABELS.REGION) }}</span>
              <span class="info-value">{{ user.region }}</span>
            </div>
            <div v-if="user?.city" class="info-row">
              <span class="info-label">{{ t(T_KEYS.FORM.LABELS.CITY) }}</span>
              <span class="info-value">{{ user.city }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t(T_KEYS.PROFILE.LABELS.MEMBER_SINCE) }}</span>
              <span class="info-value">{{ formatDate(user?.created_at) }}</span>
            </div>
          </div>
        </div>

        <div class="profile-card">
          <h2 class="card-title">
            <i class="fas fa-shield-alt card-icon" />
            {{ t(T_KEYS.PROFILE.CARDS.VERIFICATION) }}
          </h2>
          <div class="info-list">
            <div class="info-row">
              <span class="info-label">{{ t(T_KEYS.PROFILE.LABELS.CATEGORY) }}</span>
              <span class="info-value">{{ getCategoryLabel(user?.category) }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ t(T_KEYS.PROFILE.LABELS.VERIFICATION_STATUS) }}</span>
              <span
                class="status-badge"
                :class="getVerificationStatusClass(verificationStatuses?.primaryCategory?.status)"
              >
                {{ getVerificationStatusLabel(verificationStatuses?.primaryCategory?.status) }}
              </span>
            </div>
            <div v-if="verificationStatuses?.primaryCategory?.verified_at" class="info-row">
              <span class="info-label">{{ t(T_KEYS.PROFILE.LABELS.VERIFIED_AT) }}</span>
              <span class="info-value">{{ formatDate(verificationStatuses.primaryCategory.verified_at) }}</span>
            </div>
          </div>

          <template v-if="verificationStatuses?.additionalCategories?.length">
            <p class="card-subtitle">{{ t(T_KEYS.PROFILE.LABELS.ADDITIONAL_CATEGORIES) }}</p>
            <div
              v-for="cat in verificationStatuses.additionalCategories"
              :key="cat.category"
              class="additional-category"
            >
              <span class="info-value">{{ getCategoryLabel(cat.category) }}</span>
              <span class="status-badge" :class="getVerificationStatusClass(cat.status)">
                {{ getVerificationStatusLabel(cat.status) }}
              </span>
            </div>
          </template>
        </div>

        <div class="profile-card profile-card--full">
          <h2 class="card-title">
            <i class="fas fa-key card-icon" />
            {{ t(T_KEYS.PROFILE.MEMBER_CODE.TITLE) }}
          </h2>
          <div class="member-code-body">
            <div v-if="isMemberCodeLoading" class="member-code-loading">
              {{ t(T_KEYS.PROFILE.MEMBER_CODE.LOADING) }}
            </div>
            <template v-else-if="memberCode">
              <div class="member-code-display">
                <span class="member-code-value">{{ memberCode }}</span>
                <button
                  class="copy-btn"
                  :class="{ 'copy-btn--done': isCopied }"
                  @click="copyMemberCode"
                >
                  <i class="fas" :class="isCopied ? 'fa-check' : 'fa-copy'" />
                  {{ isCopied ? t(T_KEYS.PROFILE.MEMBER_CODE.COPIED) : t(T_KEYS.PROFILE.MEMBER_CODE.COPY) }}
                </button>
              </div>
              <p class="member-code-hint">{{ t(T_KEYS.PROFILE.MEMBER_CODE.HINT) }}</p>
            </template>
          </div>
        </div>

        <div class="profile-card profile-card--full">
          <h2 class="card-title">
            <i class="fas fa-file-alt card-icon" />
            {{ t(T_KEYS.PROFILE.CARDS.APPLICATIONS) }}
          </h2>
          <div v-if="pendingApplications?.length" class="applications-list">
            <div
              v-for="app in pendingApplications"
              :key="app.id"
              class="application-item"
            >
              <div class="application-name">{{ app.project_name }}</div>
              <div class="application-meta">
                <span class="info-value">
                  {{ t(T_KEYS.PROFILE.LABELS.SUBMITTED_AT) }}: {{ formatDate(app.submitted_at) }}
                </span>
                <span class="status-badge" :class="getApplicationStatusClass(app.status)">
                  {{ getApplicationStatusLabel(app.status) }}
                </span>
              </div>
            </div>
          </div>
          <p v-else class="empty-state">{{ t(T_KEYS.PROFILE.LABELS.NO_APPLICATIONS) }}</p>
        </div>

        <div class="profile-card profile-card--full">
          <h2 class="card-title">
            <i class="fas fa-bell card-icon" />
            {{ t(T_KEYS.PROFILE.CARDS.NOTIFICATIONS) }}
          </h2>
          <div class="notifications-list">
            <div class="notification-toggle">
              <div class="toggle-info">
                <span class="toggle-label">
                  {{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.ENABLE_NOTIFICATIONS) }}
                </span>
                <span class="toggle-desc">
                  {{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.ENABLE_DESCRIPTION) }}
                </span>
              </div>
              <ASwitchToggle v-model="notificationSettings.notifications_enabled" />
            </div>

            <div
              class="notification-toggle"
              :class="{ 'is-dimmed': !notificationSettings.notifications_enabled }"
            >
              <div class="toggle-info">
                <span class="toggle-label">
                  {{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.EMAIL_NOTIFICATIONS) }}
                </span>
                <span class="toggle-desc">
                  {{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.EMAIL_DESCRIPTION) }}
                </span>
              </div>
              <ASwitchToggle
                v-model="notificationSettings.email_notifications"
                :disabled="!notificationSettings.notifications_enabled"
              />
            </div>

            <div
              class="notification-toggle"
              :class="{ 'is-dimmed': !notificationSettings.notifications_enabled }"
            >
              <div class="toggle-info">
                <span class="toggle-label">
                  {{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.SMS_NOTIFICATIONS) }}
                </span>
                <span class="toggle-desc">
                  {{ t(T_KEYS.AUTH.REGISTER.NOTIFICATIONS.SMS_DESCRIPTION) }}
                </span>
              </div>
              <ASwitchToggle
                v-model="notificationSettings.sms_notifications"
                :disabled="!notificationSettings.notifications_enabled"
              />
            </div>
          </div>

          <div class="notifications-footer">
            <AButton
              variant="primary"
              size="md"
              :disabled="isNotificationLoading"
              @click="saveNotifications"
            >
              {{ isNotificationLoading ? t(T_KEYS.COMMON.BUTTONS.SENDING) : t(T_KEYS.PROFILE.NOTIFICATIONS.SAVE) }}
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, onMounted } from 'vue';
import { useUserStore } from '~/composables/use-user-store';
import { useTranslation } from '~/composables/use-translation';
import { USER_CATEGORY_LABELS, VERIFICATION_STATUS_LABELS } from '~/constants/status-constants';
import AButton from '~/components/atoms/a-button';
import ASwitchToggle from '~/components/atoms/a-switch-toggle';

const APPLICATION_STATUS_LABELS: Record<string, string> = {
  draft: 'Чернетка',
  submitted: 'Подано',
  in_queue: 'В черзі',
  in_progress: 'В процесі',
  completed: 'Завершено',
  cancelled: 'Скасовано'
};

const APPLICATION_STATUS_CLASSES: Record<string, string> = {
  draft: 'badge--gray',
  submitted: 'badge--blue',
  in_queue: 'badge--yellow',
  in_progress: 'badge--blue',
  completed: 'badge--green',
  cancelled: 'badge--red'
};

const VERIFICATION_STATUS_CLASSES: Record<string, string> = {
  pending: 'badge--yellow',
  under_review: 'badge--blue',
  approved: 'badge--green',
  rejected: 'badge--red',
  requires_additional_docs: 'badge--orange'
};

export default defineComponent({
  name: 'PProfile',

  components: {
    AButton,
    ASwitchToggle
  },

  setup() {
    const { t, T_KEYS } = useTranslation();
    const {
      user,
      memberCode,
      userFullName,
      userInitials,
      isVerified,
      userStatistics,
      verificationStatuses,
      pendingApplications,
      isNotificationLoading,
      isMemberCodeLoading,
      updateNotificationSettings,
      loadMemberCode
    } = useUserStore();

    const isCopied = ref(false);

    onMounted(() => {
      if (!memberCode.value) {
        loadMemberCode();
      }
    });

    const copyMemberCode = async () => {
      if (!memberCode.value || isCopied.value) return;
      try {
        await navigator.clipboard.writeText(memberCode.value);
        isCopied.value = true;
        setTimeout(() => { isCopied.value = false; }, 2000);
      } catch {
        // fallback for browsers without clipboard API
        const el = document.createElement('textarea');
        el.value = memberCode.value;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        isCopied.value = true;
        setTimeout(() => { isCopied.value = false; }, 2000);
      }
    };

    const notificationSettings = reactive({
      notifications_enabled: user.value?.notifications_enabled ?? true,
      email_notifications: user.value?.email_notifications ?? true,
      sms_notifications: user.value?.sms_notifications ?? false
    });

    watch(user, (newUser) => {
      if (newUser) {
        notificationSettings.notifications_enabled = newUser.notifications_enabled;
        notificationSettings.email_notifications = newUser.email_notifications;
        notificationSettings.sms_notifications = newUser.sms_notifications;
      }
    });

    const formatDate = (dateStr: string | null | undefined): string => {
      if (!dateStr) return '—';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '—';
      return d.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const getCategoryLabel = (category: string | null | undefined): string => {
      if (!category) return '—';
      return USER_CATEGORY_LABELS[category as keyof typeof USER_CATEGORY_LABELS] || category;
    };

    const getVerificationStatusLabel = (status: string | null | undefined): string => {
      if (!status) return '—';
      return VERIFICATION_STATUS_LABELS[status as keyof typeof VERIFICATION_STATUS_LABELS] || status;
    };

    const getVerificationStatusClass = (status: string | null | undefined): string => {
      if (!status) return '';
      return VERIFICATION_STATUS_CLASSES[status] || '';
    };

    const getApplicationStatusLabel = (status: string): string => {
      return APPLICATION_STATUS_LABELS[status] || status;
    };

    const getApplicationStatusClass = (status: string): string => {
      return APPLICATION_STATUS_CLASSES[status] || 'badge--gray';
    };

    const saveNotifications = () => {
      updateNotificationSettings({ ...notificationSettings });
    };

    return {
      t,
      T_KEYS,
      user,
      memberCode,
      userFullName,
      userInitials,
      isVerified,
      userStatistics,
      verificationStatuses,
      pendingApplications,
      isNotificationLoading,
      isMemberCodeLoading,
      isCopied,
      notificationSettings,
      formatDate,
      getCategoryLabel,
      getVerificationStatusLabel,
      getVerificationStatusClass,
      getApplicationStatusLabel,
      getApplicationStatusClass,
      saveNotifications,
      copyMemberCode
    };
  }
});
</script>

<style lang="scss" scoped>
.p-profile {
  @apply min-h-screen bg-gray-50;
}

.profile-hero {
  @apply relative text-white py-10 px-4;
  background-image: url('/images/pixel_zsu_tile.jpg');
  background-repeat: repeat;
  background-size: 420px 420px;
  background-attachment: fixed;
  background-position: center;

  &::before {
    content: '';
    @apply absolute inset-0;
    background: rgba(12, 16, 6, 0.46);
    backdrop-filter: blur(2px);
  }

  .hero-inner {
    @apply relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6;
  }

  .hero-avatar {
    @apply flex-shrink-0;

    .avatar-img {
      @apply w-24 h-24 rounded-full object-cover border-4 border-white border-opacity-20;
    }

    .avatar-initials {
      @apply w-24 h-24 rounded-full bg-primary flex items-center justify-center
             text-3xl font-bold text-white border-4 border-white border-opacity-20;
    }
  }

  .hero-meta {
    @apply flex-1;

    .hero-name {
      @apply text-2xl font-bold mb-1;
    }

    .hero-email {
      @apply text-gray-400 text-sm mb-3;
    }

    .hero-badge {
      @apply inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium;

      &.badge--verified {
        @apply bg-green-500 bg-opacity-20 text-green-400;
      }

      &.badge--pending {
        @apply bg-yellow-500 bg-opacity-20 text-yellow-400;
      }
    }
  }

  .hero-stats {
    @apply flex items-center gap-6 md:ml-auto;

    .stat-item {
      @apply text-center;

      .stat-number {
        @apply block text-2xl font-bold;
      }

      .stat-label {
        @apply block text-xs text-gray-400 mt-0.5;
      }
    }

    .stat-divider {
      @apply w-px h-10 bg-white bg-opacity-20;
    }
  }
}

.profile-container {
  @apply max-w-5xl mx-auto px-4 py-8;
}

.dashboard-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.profile-card {
  @apply bg-white rounded-xl shadow-sm border border-gray-100 p-6;

  &--full {
    @apply md:col-span-2;
  }

  .card-title {
    @apply text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2;

    .card-icon {
      @apply text-primary text-base;
    }
  }

  .card-subtitle {
    @apply text-sm font-medium text-gray-500 mt-5 mb-3 uppercase tracking-wide;
  }
}

.info-list {
  @apply space-y-3;
}

.info-row {
  @apply flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0;
}

.info-label {
  @apply text-sm text-gray-500 flex-shrink-0;
}

.info-value {
  @apply text-sm text-gray-900 text-right;
}

.status-badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;

  &.badge--green  { @apply bg-green-100 text-green-800; }
  &.badge--yellow { @apply bg-yellow-100 text-yellow-800; }
  &.badge--blue   { @apply bg-blue-100 text-blue-800; }
  &.badge--red    { @apply bg-red-100 text-red-800; }
  &.badge--orange { @apply bg-orange-100 text-orange-800; }
  &.badge--gray   { @apply bg-gray-100 text-gray-800; }
}

.additional-category {
  @apply flex items-center justify-between py-2 border-b border-gray-50 last:border-0;
}

.applications-list {
  @apply space-y-3;
}

.application-item {
  @apply flex flex-col sm:flex-row sm:items-center justify-between gap-2
         p-4 rounded-lg bg-gray-50 border border-gray-100;

  .application-name {
    @apply text-sm font-medium text-gray-900;
  }

  .application-meta {
    @apply flex items-center gap-3 flex-shrink-0;

    .info-value {
      @apply text-xs text-gray-500;
    }
  }
}

.empty-state {
  @apply text-sm text-gray-400 text-center py-6;
}

.notifications-list {
  @apply space-y-4;
}

.notification-toggle {
  @apply flex items-center justify-between gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100
         transition-opacity duration-200;

  &.is-dimmed {
    @apply opacity-50;
  }

  .toggle-info {
    @apply flex flex-col gap-0.5;

    .toggle-label {
      @apply text-sm font-medium text-gray-900;
    }

    .toggle-desc {
      @apply text-xs text-gray-500;
    }
  }
}

.notifications-footer {
  @apply mt-5 flex justify-end;
}

.member-code-body {
  @apply flex flex-col gap-3;
}

.member-code-loading {
  @apply text-sm text-gray-400;
}

.member-code-display {
  @apply flex items-center gap-4 flex-wrap;

  .member-code-value {
    @apply font-mono text-2xl font-bold text-gray-900 tracking-widest
           bg-gray-50 border border-gray-200 rounded-lg px-5 py-3;
  }
}

.copy-btn {
  @apply inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium
         transition-all duration-200 cursor-pointer;
  @apply border-gray-300 bg-white text-gray-700 hover:bg-gray-50;

  &--done {
    @apply border-green-400 bg-green-50 text-green-700;
  }
}

.member-code-hint {
  @apply text-sm text-gray-500 leading-relaxed;
}
</style>
