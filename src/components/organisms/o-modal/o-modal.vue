<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog
      as="div"
      data-at="o-modal"
      class="o-modal"
      @close="handleClose"
    >
      <!-- Backdrop -->
      <div class="backdrop-wrapper">
        <div class="backdrop" aria-hidden="true" />
      </div>

      <!-- Modal Container -->
      <div class="container" :class="{ 'container--fullscreen': fullScreen }">
        <TransitionChild
          as="template"
          enter="enter"
          enter-from="enter-from"
          enter-to="enter-to"
          leave="leave"
          leave-from="leave-from"
          leave-to="leave-to"
        >
          <DialogPanel
            :class="[
              'panel',
              {
                'panel--fullscreen': fullScreen,
                'panel--fullscreen-mobile': fullScreenOnMobile && !fullScreen,
                'panel--default': !fullScreen && !fullScreenOnMobile
              },
              panelClass,
            ]"
          >
            <!-- Header -->
            <div v-if="$slots.header || title" class="header">
              <DialogTitle as="h3" class="title">
                <slot name="header">
                  {{ title }}
                </slot>
              </DialogTitle>
              <button v-if="showClose" type="button" class="close" @click="handleClose">
                <span class="sr-only">{{ t('common.close') }}</span>
                <AIcon name="fas fa-xmark" class="close__icon" aria-hidden="true" />
              </button>
            </div>

            <!-- Content -->
            <div :class="['modal-content', { 'content--fullscreen': fullScreen }, contentClass]">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="footer">
              <slot name="footer" />
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { useTranslation } from '~/composables/use-translation';
import AIcon from '~/components/atoms/a-icon';

export default defineComponent({
  name: 'OModal',

  components: {
    AIcon,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild
  },

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    fullScreenOnMobile: {
      type: Boolean,
      default: false,
    },
    preventClose: {
      type: Boolean,
      default: false,
    },
    panelClass: {
      type: String,
      default: '',
    },
    contentClass: {
      type: String,
      default: 'px-6 py-4',
    },
  },

  emits: ['update:modelValue', 'close'],

  setup(props, { emit }) {
    const { t } = useTranslation();

    const handleClose = () => {
      if (props.preventClose) return;
      emit('update:modelValue', false);
      emit('close');
    };

    return {
      t,
      handleClose,
    };
  },
});
</script>

<style lang="scss">
.o-modal {
  @apply fixed inset-0;
  z-index: 9999;

  .backdrop-wrapper {
    @apply fixed inset-0;
  }

  .backdrop {
    @apply absolute inset-0 bg-black/30 transition-opacity;
  }

  .container {
    @apply fixed inset-0 flex items-center justify-center p-4;

    &--fullscreen {
      @apply p-0;
    }
  }

  .panel {
    @apply bg-white overflow-hidden;

    &--fullscreen {
      @apply w-screen h-screen max-w-none m-0 rounded-none;
      animation: modal-fullscreen-enter 0.3s ease-out;
    }

    &--fullscreen-mobile {
      @apply w-full h-full md:w-auto md:h-auto md:rounded-lg md:max-w-3xl md:shadow-lg;
    }

    &--default {
      @apply w-full max-w-lg rounded-lg shadow-lg;
    }
  }

  .header {
    @apply border-b px-6 py-4 flex items-center justify-between;
  }

  .title {
    @apply text-lg font-semibold text-gray-900;
  }

  .close {
    @apply text-gray-400 hover:text-gray-500;

    &__icon {
      @apply h-6 w-6;
    }
  }

  .modal-content {
    @apply h-full px-6 py-4;

    &--fullscreen {
      @apply overflow-y-auto;
    }
  }

  .footer {
    @apply border-t px-6 py-4;
  }

  // Transitions
  .enter {
    @apply duration-300 ease-out;

    &-from {
      @apply opacity-0 scale-95;
    }

    &-to {
      @apply opacity-100 scale-100;
    }
  }

  .leave {
    @apply duration-200 ease-in;

    &-from {
      @apply opacity-100 scale-100;
    }

    &-to {
      @apply opacity-0 scale-95;
    }
  }
}

@keyframes modal-fullscreen-enter {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>