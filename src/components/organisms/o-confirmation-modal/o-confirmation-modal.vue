<template>
  <OModal
    v-model="isVisible"
    :title="options?.title"
    :description="options?.text"
    :confirm-button-text="options?.confirmButtonText"
    :reject-button-text="options?.rejectButtonText"
    :loading="loading"
    :prevent-close="options?.preventClose"
    show-default-footer
    @confirm="handleConfirm"
    @reject="handleReject"
    @close="handleClose"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEventBus } from '~/composables/use-event-bus';
import { useConfirmationModal } from '~/use/use-confirmation-modal';
import OModal from '~/components/organisms/o-modal';

export default defineComponent({
  name: 'OConfirmationModal',

  components: {
    OModal
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