<template>
  <section class="p-account-profile container mx-auto px-4 py-8">
    <header class="flex items-center gap-4 mb-8">
      <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        <img v-if="user?.avatar_url" :src="user?.avatar_url || ''" :alt="userDisplayName" class="w-full h-full object-cover" />
        <span v-else class="text-lg font-semibold text-gray-600">{{ userInitials }}</span>
      </div>
      <div class="min-w-0">
        <h1 class="text-2xl font-semibold text-gray-900 truncate">{{ userFullName }}</h1>
        <p class="text-sm" :class="isVerified ? 'text-green-600' : 'text-yellow-600'">
          {{ isVerified ? 'Підтверджено' : 'Очікує підтвердження' }}
        </p>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <section class="card">
          <div class="card__header">
            <h2 class="card__title">Профіль</h2>
          </div>
          <div class="card__body space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form__label">Ім'я</label>
                <input class="form__input" v-model="form.first_name" type="text" />
              </div>
              <div>
                <label class="form__label">Прізвище</label>
                <input class="form__input" v-model="form.last_name" type="text" />
              </div>
              <div>
                <label class="form__label">По батькові</label>
                <input class="form__input" v-model="form.patronymic" type="text" />
              </div>
              <div>
                <label class="form__label">Телефон</label>
                <input class="form__input" v-model="form.phone" type="tel" />
              </div>
              <div>
                <label class="form__label">Дата народження</label>
                <input class="form__input" v-model="form.date_of_birth" type="date" />
              </div>
              <div>
                <label class="form__label">Адреса</label>
                <input class="form__input" v-model="form.address" type="text" />
              </div>
            </div>
            <div>
              <label class="form__label">Біографія</label>
              <textarea class="form__textarea" v-model="form.bio" rows="4" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form__label">Контактна особа</label>
                <input class="form__input" v-model="form.emergency_contact_name" type="text" />
              </div>
              <div>
                <label class="form__label">Телефон контактної особи</label>
                <input class="form__input" v-model="form.emergency_contact_phone" type="tel" />
              </div>
            </div>
          </div>
          <div class="card__footer">
            <button class="btn btn-primary" :disabled="savingProfile" @click="onSaveProfile">Зберегти</button>
          </div>
        </section>

        <section class="card">
          <div class="card__header">
            <h2 class="card__title">Безпека</h2>
          </div>
          <div class="card__body grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="form__label">Поточний пароль</label>
              <input class="form__input" v-model="security.current" type="password" />
            </div>
            <div>
              <label class="form__label">Новий пароль</label>
              <input class="form__input" v-model="security.next" type="password" />
            </div>
            <div>
              <label class="form__label">Підтвердження пароля</label>
              <input class="form__input" v-model="security.confirm" type="password" />
            </div>
          </div>
          <div class="card__footer">
            <button class="btn btn-primary" :disabled="savingPassword" @click="onChangePassword">Змінити пароль</button>
          </div>
        </section>
      </div>

      <aside class="space-y-6">
        <section class="card">
          <div class="card__header">
            <h2 class="card__title">Сповіщення</h2>
          </div>
          <div class="card__body space-y-4">
            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="notifications.notifications_enabled" />
              <span>Увімкнути сповіщення</span>
            </label>
            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="notifications.email_notifications" />
              <span>Електронна пошта</span>
            </label>
            <label class="flex items-center gap-3">
              <input type="checkbox" v-model="notifications.sms_notifications" />
              <span>SMS</span>
            </label>
          </div>
          <div class="card__footer">
            <button class="btn btn-primary" :disabled="savingNotifications" @click="onSaveNotifications">Зберегти</button>
          </div>
        </section>
      </aside>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue';
import { useUserStore } from '~/composables/use-user-store';

export default defineComponent({
  name: 'PAccountProfileEdit',
  setup() {
    const userStore = useUserStore();

    const user = computed(() => userStore.user.value);
    const userDisplayName = userStore.userDisplayName;
    const userFullName = userStore.userFullName;
    const userInitials = userStore.userInitials;
    const isVerified = userStore.isVerified;

    const form = reactive({
      first_name: user.value?.first_name || '',
      last_name: user.value?.last_name || '',
      patronymic: user.value?.patronymic || '',
      phone: user.value?.phone || '',
      date_of_birth: user.value?.date_of_birth || '',
      bio: user.value?.bio || '',
      address: user.value?.address || '',
      emergency_contact_name: user.value?.emergency_contact_name || '',
      emergency_contact_phone: user.value?.emergency_contact_phone || ''
    });

    const savingProfile = reactive({ value: false });
    const onSaveProfile = async () => {
      try {
        savingProfile.value = true;
        await userStore.updateProfile({ ...form });
        userStore.refreshUserData();
      } finally {
        savingProfile.value = false;
      }
    };

    const security = reactive({ current: '', next: '', confirm: '' });
    const savingPassword = reactive({ value: false });
    const onChangePassword = async () => {
      if (!security.next || security.next !== security.confirm) return;
      try {
        savingPassword.value = true;
        await userStore.updatePassword(security.current, security.next);
      } finally {
        savingPassword.value = false;
      }
    };

    const notifications = reactive({
      notifications_enabled: user.value?.notifications_enabled ?? true,
      email_notifications: user.value?.email_notifications ?? true,
      sms_notifications: user.value?.sms_notifications ?? false
    });
    const savingNotifications = reactive({ value: false });
    const onSaveNotifications = async () => {
      try {
        savingNotifications.value = true;
        await userStore.updateNotificationSettings({ ...notifications });
      } finally {
        savingNotifications.value = false;
      }
    };

    return {
      user,
      userDisplayName,
      userFullName,
      userInitials,
      isVerified,
      form,
      onSaveProfile,
      savingProfile: toRefs(savingProfile).value,
      security,
      onChangePassword,
      savingPassword: toRefs(savingPassword).value,
      notifications,
      onSaveNotifications,
      savingNotifications: toRefs(savingNotifications).value
    };
  }
});
</script>

<style scoped>
.card { @apply bg-white rounded-lg border border-gray-200 shadow-sm; }
.card__header { @apply px-4 py-3 border-b border-gray-200; }
.card__title { @apply text-lg font-medium text-gray-900; }
.card__body { @apply p-4; }
.card__footer { @apply px-4 py-3 border-t border-gray-200 flex justify-end; }

.form__label { @apply block text-sm text-gray-700 mb-1; }
.form__input { @apply w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary; }
.form__textarea { @apply w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary; }

.btn { @apply inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium; }
.btn-primary { @apply bg-primary text-white hover:opacity-90; }
</style>

