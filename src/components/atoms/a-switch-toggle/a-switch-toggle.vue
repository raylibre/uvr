<template>
  <div class="switch-field" data-at="switch-toggle">
    <button
      :id="id"
      type="button"
      :class="[
        'switch',
        modelValue ? 'is-active' : 'is-inactive',
        disabled ? 'is-disabled' : '',
        error ? 'has-error' : ''
      ]"
      :disabled="disabled"
      :aria-checked="modelValue"
      @click="toggle"
    >
      <span class="switch__handle" :class="{ 'is-active': modelValue }" />
    </button>
    <p v-if="error" :id="`${id}-error`" class="error-message">{{ error }}</p>
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
    id: {
      type: String,
      required: true
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

<style lang="scss" scoped>
@import '../../../styles/mixins';

.switch-field {
  display: inline-flex;
  flex-direction: column;
}

.switch {
  position: relative;
  display: inline-flex;
  height: spacing('6');
  width: spacing('11');
  flex-shrink: 0;
  cursor: pointer;
  border-radius: radius('full');
  border: 2px solid transparent;
  transition: all duration('normal') timing('ease-in-out');

  &:focus {
    @include focus-ring;
  }

  &.is-active {
    background-color: $color-primary;
  }

  &.is-inactive {
    background-color: $color-gray-200;
  }

  &.is-disabled {
    @include disabled-state;
  }

  &.has-error {
    @include error-state;
  }
}

.switch__handle {
  position: absolute;
  top: 2px;
  left: 2px;
  height: calc(#{spacing('6')} - 8px);
  width: calc(#{spacing('6')} - 8px);
  background-color: white;
  border-radius: radius('full');
  box-shadow: shadow('sm');
  transform: translateX(0);
  transition: transform duration('normal') timing('ease-in-out');

  &.is-active {
    transform: translateX(#{spacing('5')});
  }
}

.error-message {
  margin-top: spacing('1');
  font-size: size('sm');
  color: $color-red-500;
}
</style> 