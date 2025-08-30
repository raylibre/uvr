<template>
  <div class="a-switch-toggle" :class="{ 'is-disabled': disabled }">
    <div class="switch-container">
      <button
        type="button"
        class="switch"
        :class="{ 'is-active': modelValue, 'has-error': error }"
        :disabled="disabled"
        :aria-checked="modelValue"
        role="switch"
        @click="toggle"
      >
        <span class="switch__track">
          <span class="switch__thumb" />
        </span>
      </button>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ASwitchToggle',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const toggle = () => {
      if (!props.disabled) {
        emit('update:modelValue', !props.modelValue);
      }
    };

    return {
      toggle
    };
  }
});
</script>

<style lang="scss">
@import '../../../styles/mixins';

.a-switch-toggle {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch-container {
    display: inline-flex;
    align-items: center;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    outline: none;

    &:disabled {
      cursor: not-allowed;
    }

    &__track {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--color-gray-300);
      border-radius: 34px;
      transition: background-color 0.2s ease;
    }

    &__thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    &.is-active {
      .switch__track {
        @apply bg-primary;
      }

      .switch__thumb {
        transform: translateX(20px);
      }
    }

    &.has-error {
      .switch__track {
        border: 1px solid var(--color-red);
      }
    }
  }

  .error-message {
    margin-top: 4px;
    font-size: 12px;
    color: var(--color-red);
  }
}
</style>
