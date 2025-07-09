<template>
  <OModal
    v-model="isVisible"
    :title="options?.title || ''"
    :prevent-close="options?.preventClose"
    @close="handleClose"
  >
    <div class="confirmation-content">
      <p class="confirmation-text">{{ options?.text || '' }}</p>
    </div>

    <template #footer>
      <div class="confirmation-actions">
        <AButton
          variant="outline"
          @click="handleReject"
          :disabled="loading"
        >
          {{ options?.rejectButtonText || 'Cancel' }}
        </AButton>

        <AButton
          variant="primary"
          @click="handleConfirm"
          :loading="loading"
        >
          {{ options?.confirmButtonText || 'Confirm' }}
        </AButton>
      </div>
    </template>
  </OModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEventBus } from '~/composables/use-event-bus';
import { useConfirmationModal } from '~/composables/use-confirmation-modal.ts';
import OModal from '~/components/organisms/o-modal';
import AButton from '~/components/atoms/a-button';

export default defineComponent({
  name: 'OConfirmationModal',

  components: {
    OModal,
    AButton
  },

  setup() {
    const { isVisible, options, loading } = useConfirmationModal();
    const { BUS, EVENTS } = useEventBus();

    const handleConfirm = () => {
      BUS.emit(EVENTS.MODAL_CONFIRM as any);
    };

    const handleReject = () => {
      BUS.emit(EVENTS.MODAL_REJECT as any);
    };

    const handleClose = () => {
      // If modal is closed by clicking outside or pressing escape,
      // treat it as a rejection
      BUS.emit(EVENTS.MODAL_CLOSE as any);
      BUS.emit(EVENTS.MODAL_CLOSED as any);
    };

    return {
      isVisible,
      options,
      loading,
      handleConfirm,
      handleReject,
      handleClose
    };
  }
});
</script>

<style lang="scss" scoped>
.confirmation-content {
  @apply py-2;

  .confirmation-text {
    @apply text-gray-700 text-base;
  }
}

.confirmation-actions {
  @apply flex justify-end space-x-4;
}
</style>
