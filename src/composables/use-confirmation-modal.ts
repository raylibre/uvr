import { ref } from 'vue';
import { useEventBus } from '~/composables/use-event-bus.ts';
import { EVENTS } from '~/constants/event-bus-constants.ts';

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
    // If a confirmation is already open, resolve to false instead of throwing
    return Promise.resolve(false);
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
        // Close the modal but keep options until the transition completes
        isVisible.value = false;
      }
    };

    const handleReject = async () => {
      try {
        if (confirmationOptions.onReject) {
          await confirmationOptions.onReject();
        }
        resolve(false);
      } finally {
        loading.value = false;
        // Close the modal but keep options until the transition completes
        isVisible.value = false;
      }
    };

    // Set up event listeners
    const unsubscribeConfirm = () => BUS.off(EVENTS.MODAL_CONFIRM, handleConfirm);
    const unsubscribeReject = () => BUS.off(EVENTS.MODAL_REJECT, handleReject);
    const unsubscribeClose = () => BUS.off(EVENTS.MODAL_CLOSE, handleReject);

    // Clean up event listeners when modal is closed
    const cleanup = () => {
      // Give the leave transition time to finish before clearing content
      setTimeout(() => {
        options.value = null;
      }, 220);
      unsubscribeConfirm();
      unsubscribeReject();
      unsubscribeClose();
      // Unsubscribe this cleanup listener itself
      BUS.off(EVENTS.MODAL_CLOSED, cleanup as any);
    };
    BUS.on(EVENTS.MODAL_CONFIRM, handleConfirm);
    BUS.on(EVENTS.MODAL_REJECT, handleReject);
    BUS.on(EVENTS.MODAL_CLOSE, handleReject);
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
