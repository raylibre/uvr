<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Заявка на участь у команді УВР</h2>
        <button type="button" class="close-button" @click="$emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <form @submit.prevent="submitApplication" class="application-form">
        <div class="form-group">
          <label for="desired_role" class="form-label">Бажана посада *</label>
          <select
            id="desired_role"
            v-model="formData.desired_role"
            class="form-select"
            required
          >
            <option value="">Оберіть посаду</option>
            <option value="head">Керівник регіону</option>
            <option value="deputy">Заступник керівника</option>
            <option value="coordinator">Координатор</option>
          </select>
        </div>

        <div class="form-group">
          <label for="experience" class="form-label">Досвід роботи *</label>
          <textarea
            id="experience"
            v-model="formData.experience"
            class="form-textarea"
            rows="4"
            placeholder="Розкажіть про свій досвід роботи, кваліфікацію та навички, що можуть бути корисними для роботи в команді УВР..."
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="motivation_letter" class="form-label">Мотиваційний лист *</label>
          <textarea
            id="motivation_letter"
            v-model="formData.motivation_letter"
            class="form-textarea"
            rows="6"
            placeholder="Поясніть, чому ви хочете долучитися до команди УВР у цьому регіоні, які цілі ставите перед собою та як плануєте розвивати роботу організації..."
            required
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-button" @click="$emit('close')">
            Скасувати
          </button>
          <button type="submit" class="submit-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Надсилання...' : 'Надіслати заявку' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '~/composables/use-user-store';
import { submitLeadershipApplication } from '~/services/api/regions-api-service';
import { handleApiError, notifySuccess } from '~/services/notification-service';

interface Props {
  isOpen: boolean;
  regionId: string;
}

interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { user } = useUserStore();

const isSubmitting = ref(false);

const formData = reactive({
  desired_role: '',
  experience: '',
  motivation_letter: ''
});

const handleOverlayClick = () => {
  emit('close');
};

const submitApplication = async () => {
  if (!user.value?.id) {
    handleApiError(new Error('User not authenticated'));
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      region_id: props.regionId,
      user_id: user.value.id,
      desired_role: formData.desired_role,
      experience: formData.experience,
      motivation_letter: formData.motivation_letter
    };

    await submitLeadershipApplication(payload);

    notifySuccess('Заявку успішно надіслано! Наша команда розгляне її найближчим часом.');

    // Reset form
    formData.desired_role = '';
    formData.experience = '';
    formData.motivation_letter = '';

    emit('close');
  } catch (error: any) {
    handleApiError(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50;
}

.modal-content {
  @apply bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200;
}

.modal-header .modal-title {
  @apply text-xl font-bold text-gray-900;
}

.modal-header .close-button {
  @apply text-gray-400 hover:text-gray-600 transition-colors;
}

.application-form {
  @apply p-6;
}

.application-form .form-group {
  @apply mb-6;
}

.application-form .form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.application-form .form-select {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.application-form .form-textarea {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.application-form .form-actions {
  @apply flex gap-4 justify-end pt-4 border-t border-gray-200;
}

.application-form .cancel-button {
  @apply px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors;
}

.application-form .submit-button {
  @apply px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors;
}
</style>
