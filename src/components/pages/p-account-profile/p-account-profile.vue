<template>
  <section class="p-account-profile container mx-auto px-4 py-8">
    <header class="flex items-center gap-4 mb-8">
      <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        <img v-if="user?.avatar_url" 
        :src="user?.avatar_url || ''" 
        :alt="userDisplayName" 
        class="w-full h-full object-cover" />
        <span v-else class="text-lg font-semibold text-gray-600">{{ userInitials }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <h1 class="text-2xl font-semibold text-gray-900 truncate">{{ userFullName }}</h1>
        <p class="text-sm" :class="isVerified ? 'text-green-600' : 'text-yellow-600'">
          {{ isVerified ? t('user.status.verified') : t('user.status.pendingVerification') }}
        </p>
      </div>
      <button class="btn btn-primary" @click="goEdit">{{ t('common.buttons.edit') }}</button>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <section class="card">
          <div class="card__header">
            <h2 class="card__title">{{ t('profile.sections.profile') }}</h2>
          </div>
          <div class="card__body grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="label">{{ t('profile.fields.first_name') }}</p>
              <p class="value">{{ user?.first_name }}</p>
            </div>
            <div>
              <p class="label">{{ t('profile.fields.last_name') }}</p>
              <p class="value">{{ user?.last_name }}</p>
            </div>
            <div>
              <p class="label">{{ t('profile.fields.patronymic') }}</p>
              <p class="value">{{ user?.patronymic || '—' }}</p>
            </div>
            <div>
              <p class="label">{{ t('profile.fields.email') }}</p>
              <p class="value">{{ user?.email }}</p>
            </div>
            <div>
              <p class="label">{{ t('profile.fields.phone') }}</p>
              <p class="value">{{ user?.phone }}</p>
            </div>
            <div>
              <p class="label">{{ t('profile.fields.date_of_birth') }}</p>
              <p class="value">{{ user?.date_of_birth || '—' }}</p>
            </div>
            <div class="md:col-span-2">
              <p class="label">{{ t('profile.fields.address') }}</p>
              <p class="value">{{ user?.address || '—' }}</p>
            </div>
            <div class="md:col-span-2">
              <p class="label">{{ t('profile.fields.bio') }}</p>
              <p class="value">{{ user?.bio || '—' }}</p>
            </div>
          </div>
        </section>

        <section class="card">
          <div class="card__header">
            <h2 class="card__title">{{ t('profile.sections.programs') }}</h2>
          </div>
          <div class="card__body">
            <div v-if="projectsLoading" class="text-sm text-gray-500">{{ t('profile.messages.loading') }}</div>
            <div v-else-if="!projects.length" class="text-sm text-gray-500">{{ t('profile.messages.no_programs') }}</div>
            <div v-else class="programs-grid">
              <MPublicProjectCard 
              v-for="p in projects" 
              :key="p.id" 
              :project="p" 
              :status="projectStatuses[p.id] || null"
              @click="goProgram" />
            </div>
          </div>
          <div class="card__footer">
            <button class="btn btn-primary" @click="goPrograms">{{ t('common.navigation.programs') }}</button>
          </div>
        </section>

        <section class="card">
          <div class="card__header">
            <h2 class="card__title">{{ t('profile.sections.documents') }}</h2>
          </div>
          <div class="card__body">
            <div class="text-sm text-gray-500">{{ t('profile.messages.no_documents') }}</div>
          </div>
        </section>
      </div>

      <aside class="space-y-6">
        <section class="card">
          <div class="card__header">
            <h2 class="card__title">{{ t('profile.sections.notifications') }}</h2>
          </div>
          <div class="card__body text-sm text-gray-600">
            {{ t('profile.notifications.manage_in_settings') }}
          </div>
        </section>
      </aside>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '~/composables/use-user-store';
import { useTranslation } from '~/composables/use-translation';
import { ROUTE_NAMES } from '~/constants/router-constants';
import { fetchPublicProjects, fetchUserProjectStatus } from '~/services/api/projects-api-service';
import MPublicProjectCard from "~/components/molecules/m-public-project-card";

export default defineComponent({
  name: 'PAccountProfile',
  components: { MPublicProjectCard },
  setup() {
    const { t } = useTranslation();
    const router = useRouter();
    const userStore = useUserStore();

    const user = computed(() => userStore.user.value);
    const userDisplayName = userStore.userDisplayName;
    const userFullName = userStore.userFullName;
    const userInitials = userStore.userInitials;
    const isVerified = userStore.isVerified;

    const projects = ref<any[]>([]);
    const projectStatuses = ref<Record<number, any>>({});
    const projectsLoading = ref(false);
    onMounted(async () => {
      projectsLoading.value = true;
      try {
        const res = await fetchPublicProjects(8);
        projects.value = res?.data?.projects ?? [];
        // Try to enrich with eligibility status where possible
        try {
          const statuses = await Promise.all(
            (projects.value || []).map(async (p: any) => {
              try { return { id: p.id, data: (await fetchUserProjectStatus(p.id)).data }; }
              catch { return { id: p.id, data: null }; }
            })
          );
          const map: Record<number, any> = {};
          statuses.forEach(s => { map[s.id] = s.data; });
          projectStatuses.value = map;
        } catch { /* ignore */ }
      } finally {
        projectsLoading.value = false;
      }
    });

    const goEdit = () => router.push({ name: ROUTE_NAMES.ACCOUNT_PROFILE_EDIT });
    const goPrograms = () => router.push({ name: ROUTE_NAMES.PROGRAMS });
    const goProgram = (slug: string) => router.push({ name: ROUTE_NAMES.PROGRAM_DETAIL, params: { slug } });

    return { t, user, userDisplayName, userFullName, userInitials, isVerified, projects, projectStatuses, projectsLoading, goEdit, goPrograms, goProgram };
  }
});
</script>

<style scoped>
.card { @apply bg-white rounded-lg border border-gray-200 shadow-sm; }
.card__header { @apply px-4 py-3 border-b border-gray-200; }
.card__title { @apply text-lg font-medium text-gray-900; }
.card__body { @apply p-4; }

.label { @apply text-xs text-gray-500; }
.value { @apply text-sm text-gray-900; }

.btn { @apply inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium; }
.btn-primary { @apply bg-primary text-white hover:opacity-90; }
.programs-grid { @apply flex flex-wrap gap-4 justify-start; }
</style>







