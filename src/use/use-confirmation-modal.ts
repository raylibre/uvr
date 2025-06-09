import { ref } from 'vue';
import { useEventBus } from '~/composables/use-event-bus';
import { EVENTS } from '~/constants/event-bus-constants';

export interface ConfirmationModalOptions {
  title: string;
  text: string;
  confirmButtonText?: string;
  rejectButtonText?: string;
  onConfirm?: () => void | Promise<void>;
  onReject?: () => void | Promise<void>;
  preventClose?: boolean;
}

// Internal state
const isVisible = ref(false);
const options = ref<ConfirmationModalOptions | null>(null);
const loading = ref(false);
const { BUS } = useEventBus();

/**
 * Opens a confirmation modal and returns a promise that resolves when the user makes a choice
 * @param confirmationOptions - Configuration options for the confirmation modal
 * @returns Promise<boolean> - Resolves to true if confirmed, false if rejected
 */
export function openConfirmationModal(confirmationOptions: ConfirmationModalOptions): Promise<boolean> {
  // Only one confirmation modal can be open at a time
  if (isVisible.value) {
    return Promise.reject(new Error('A confirmation modal is already open'));
  }

  return new Promise((resolve) => {
    options.value = confirmationOptions;
    isVisible.value = true;

    const handleConfirm = async () => {
      try {
        loading.value = true;
        if (confirmationOptions.onConfirm) {
          await confirmationOptions.onConfirm();
        }
        resolve(true);
      } finally {
        loading.value = false;
        isVisible.value = false;
        options.value = null;
      }
    };

    const handleReject = async () => {
      try {
        if (confirmationOptions.onReject) {
          await confirmationOptions.onReject();
        }
        resolve(false);
      } finally {
        isVisible.value = false;
        options.value = null;
      }
    };

    // Set up event listeners
    const unsubscribeConfirm = () => BUS.on(EVENTS.MODAL_CONFIRM, handleConfirm);
    const unsubscribeReject = () => BUS.on(EVENTS.MODAL_REJECT, handleReject);
    const unsubscribeClose = () => BUS.on(EVENTS.MODAL_CLOSE, handleReject);

    // Clean up event listeners when modal is closed
    const cleanup = () => {
      unsubscribeConfirm();
      unsubscribeReject();
      unsubscribeClose();
    };

    BUS.on(EVENTS.MODAL_CLOSED, cleanup);
  });
}

export function useConfirmationModal() {
  return {
    isVisible,
    options,
    loading
  };
} 