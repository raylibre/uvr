<template>
  <section class="o-region-leadership-section">
    <h2 class="title">Регіональне керівництво</h2>
    <div v-if="loading" class="loading">Завантаження…</div>
    <div v-else>
      <ul v-if="leadership && leadership.length" class="leaders">
        <li
          v-for="(person, idx) in leadership"
          :key="person.id ?? idx"
          class="leader-item"
          @click="toggle(idx)"
          :class="{ expanded: isOpen(idx) }"
        >
          <div class="leader-content">
            <div class="avatar">
              <img v-if="person.photoUrl" :src="person.photoUrl" :alt="person.name" />
            </div>
            <div class="info">
              <div class="main-info">
                <div class="name">{{ person.name }}</div>
                <div v-if="person.position" class="position">{{ person.position }}</div>
              </div>
            </div>
            <div class="toggle" :aria-expanded="isOpen(idx)">
              <span v-if="isOpen(idx)">▲</span>
              <span v-else>▼</span>
            </div>
          </div>
          <transition name="fade">
            <div v-if="isOpen(idx)" class="details">
              <div v-if="person.bio" class="bio">{{ person.bio }}</div>
              <div class="contacts">
                <div v-if="person.contactEmail"><strong>Email:</strong> {{ person.contactEmail }}</div>
                <div v-if="person.contactPhone"><strong>Телефон:</strong> {{ person.contactPhone }}</div>
              </div>
            </div>
          </transition>
        </li>
      </ul>

      <!-- Recruitment card is always displayed (even when there are leaders) -->
      <div class="recruitment-card">
        <div class="recruitment-body">
          <h3 class="recruitment-title">Команда УВР у пошуку нових кадрів для цього регіону</h3>
          <p class="recruitment-description">
            Ми шукаємо відповідальних та досвідчених людей для розвитку регіональної команди.
            Якщо ви готові долучитися до важливої справи підтримки ветеранів та їхніх родин,
            заповніть заявку на участь у нашій команді.
          </p>
        </div>
        <div class="recruitment-actions">
          <AButton
            variant="primary"
            size="md"
            class="join-button"
            @click="openApplicationModal"
          >
            Приєднатися до команди УВР
          </AButton>
        </div>
      </div>

      <!-- Leadership application modal (mounted regardless of list) -->
      <MLeadershipApplicationModal
        :is-open="showApplicationModal"
        :region-id="props.regionId"
        @close="closeApplicationModal"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getRegionDetails } from '~/services/api/regions-api-service';
import { normalizeLeadership } from '~/utils/regions-normalizers';
import { useUserStore } from '~/composables/use-user-store';
import { useEventBus } from '~/composables/use-event-bus';
import { EVENTS } from '~/constants/event-bus-constants';
import type { RegionLeader } from '~/interfaces/regions';
import MLeadershipApplicationModal from '~/components/molecules/m-leadership-application-modal';
import AButton from '~/components/atoms/a-button/a-button.vue';

interface Props {
  regionId: string;
}

const props = defineProps<Props>();
const { isAuthenticated } = useUserStore();
const { BUS } = useEventBus();

const leadership = ref<RegionLeader[]>([]);
const loading = ref(false);
const openIndex = ref<number | null>(null);
const showApplicationModal = ref(false);

const toggle = (idx: number) => {
  openIndex.value = openIndex.value === idx ? null : idx;
};

const isOpen = (idx: number) => openIndex.value === idx;

const openApplicationModal = () => {
  if (!isAuthenticated.value) {
    // Notify user to sign up first
    BUS.emit(EVENTS.SHOW_LOGIN_MODAL);
    return;
  }
  
  showApplicationModal.value = true;
};

const closeApplicationModal = () => {
  showApplicationModal.value = false;
};

onMounted(async () => {
  if (!props.regionId) return;
  loading.value = true;
  try {
    const data = await getRegionDetails(props.regionId);
    leadership.value = normalizeLeadership(data?.data?.leadership ?? []);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.o-region-leadership-section {
  @apply text-center;

  .title {
    @apply text-2xl md:text-3xl font-bold mb-6;
  }

  .loading { @apply text-gray-600; }
  .empty { @apply text-gray-600; }

  .leaders {
    @apply space-y-6 max-w-4xl mx-auto text-left;
  }

  .recruitment-card {
    @apply max-w-4xl mx-auto mt-8 text-left bg-white border border-gray-200 rounded-2xl shadow-sm;
    @apply flex flex-col;

    .recruitment-body { @apply p-6 md:p-8; }
    .recruitment-title { @apply text-xl md:text-2xl font-semibold mb-3 text-gray-900; }
    .recruitment-description { @apply text-gray-700 leading-relaxed; }

    .recruitment-actions {
      @apply px-6 md:px-8 py-4 border-t border-gray-100 flex justify-end;
    }
  }

  .leader-item {
    @apply p-5 rounded-2xl border border-gray-200 bg-white cursor-pointer transition-all duration-200;

    &:hover {
      @apply shadow-md border-gray-300;
    }

    &.expanded {
      @apply shadow-lg border-primary;
    }

    .leader-content {
      @apply flex items-center gap-6;
    }

    .avatar { 
      @apply w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0; 
    }
    
    .avatar img { 
      @apply w-full h-full object-cover; 
    }

    .info {
      @apply flex-1;
      
      .main-info {
        .name { 
          @apply text-2xl font-semibold text-primary; 
        }
        .position { 
          @apply text-gray-600; 
        }
      }
    }

    .toggle { 
      @apply text-primary hover:text-primary-light text-lg flex-shrink-0 transition-colors duration-200;
      @apply flex items-center justify-center w-8 h-8;
    }

    .details { 
      @apply mt-4 pt-4 border-t border-gray-100 space-y-2;
      
      .bio { 
        @apply text-gray-600 leading-relaxed; 
      }
      
      .contacts {
        @apply space-y-1;
        
        div {
          @apply text-sm text-gray-600;
          
          strong {
            @apply text-gray-800;
          }
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
}
</style>
