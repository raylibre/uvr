<template>
  <div class="a-phone-input">
    <label
      v-if="label"
      :for="id"
      class="form-label"
    >
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <div class="input-wrapper">
      <input
        :id="id"
        ref="inputRef"
        type="tel"
        :value="displayValue"
        class="form-control"
        :class="{ 'has-error': !!error }"
        placeholder="+380 XX XXX XX XX"
        maxlength="17"
        :required="required"
        :disabled="disabled"
        v-bind="$attrs"
        @input="handleInput"
        @keydown="handleKeydown"
        @paste="handlePaste"
        @click="handleClick"
        @focus="handleFocus"
        @blur="$emit('blur', $event)"
      />
      <AIcon
        v-if="icon"
        :name="icon"
        class="input-icon"
      />
    </div>

    <p
      v-if="error"
      class="error-message"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue';
import AIcon from '~/components/atoms/a-icon';

export default defineComponent({
  name: 'APhoneInput',

  components: {
    AIcon
  },

  inheritAttrs: false,

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '+380 XX XXX XX XX'
    },
    required: {
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
    },
    id: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue', 'blur'],

  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement>();
    const UKRAINE_PREFIX = '+380 ';

    // Format display value with spaces: +380 XX XXX XX XX
    const formatPhoneDisplay = (digits: string): string => {
      if (!digits) return UKRAINE_PREFIX;
      
      // Add spaces at positions: XX XXX XX XX
      let formatted = digits;
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + ' ' + formatted.slice(2);
      }
      if (formatted.length >= 6) {
        formatted = formatted.slice(0, 6) + ' ' + formatted.slice(6);
      }
      if (formatted.length >= 9) {
        formatted = formatted.slice(0, 9) + ' ' + formatted.slice(9);
      }
      
      return UKRAINE_PREFIX + formatted;
    };

    // Clean input to get only digits after +380
    const cleanPhoneInput = (value: string): string => {
      // Remove the prefix and all non-digits
      const withoutPrefix = value.replace(/^\+380\s*/, '');
      return withoutPrefix.replace(/\D/g, '');
    };

    const displayValue = computed(() => {
      if (!props.modelValue) return UKRAINE_PREFIX;
      
      // Extract digits from clean internal value
      const digits = props.modelValue.startsWith('+380') 
        ? props.modelValue.replace(/^\+380/, '')
        : props.modelValue;
      
      return formatPhoneDisplay(digits);
    });

    const updateValue = (digits: string) => {
      // Limit to exactly 9 digits after +380
      const limitedDigits = digits.slice(0, 9);
      const fullNumber = '+380' + limitedDigits;
      emit('update:modelValue', fullNumber);
    };

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const cursorPosition = target.selectionStart || 0;
      
      // Don't allow editing before the prefix
      if (cursorPosition < UKRAINE_PREFIX.length) {
        nextTick(() => {
          target.setSelectionRange(UKRAINE_PREFIX.length, UKRAINE_PREFIX.length);
        });
        return;
      }

      // Store the current digits count before processing
      const currentDigits = cleanPhoneInput(target.value);
      const newDigits = currentDigits.slice(0, 9); // Limit to 9 digits
      
      updateValue(newDigits);

      // Calculate cursor position after formatting
      nextTick(() => {
        if (inputRef.value) {
          // For smooth typing experience, position cursor after the last digit entered
          const newFormattedValue = formatPhoneDisplay(newDigits);
          
          // Find position after the last digit
          let targetPosition = UKRAINE_PREFIX.length;
          let digitCount = 0;
          
          for (let i = UKRAINE_PREFIX.length; i < newFormattedValue.length; i++) {
            if (/\d/.test(newFormattedValue[i])) {
              digitCount++;
              targetPosition = i + 1;
              // Stop after we've placed cursor after all entered digits
              if (digitCount >= newDigits.length) {
                break;
              }
            }
          }
          
          inputRef.value.setSelectionRange(targetPosition, targetPosition);
        }
      });
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      const cursorPosition = target.selectionStart || 0;

      // Don't allow deletion of the prefix
      if ((event.key === 'Backspace' || event.key === 'Delete') && 
          cursorPosition <= UKRAINE_PREFIX.length) {
        event.preventDefault();
        target.setSelectionRange(UKRAINE_PREFIX.length, UKRAINE_PREFIX.length);
        return;
      }

      // Handle backspace on spaces - move cursor to previous digit
      if (event.key === 'Backspace' && cursorPosition > UKRAINE_PREFIX.length) {
        const charBeforeCursor = target.value[cursorPosition - 1];
        if (charBeforeCursor === ' ') {
          // Skip over space and delete the digit before it
          const newPosition = cursorPosition - 1;
          target.setSelectionRange(newPosition, newPosition);
          // Let the normal backspace handle the digit deletion
        }
      }

      // Don't allow cursor movement before prefix
      if (event.key === 'ArrowLeft' && cursorPosition <= UKRAINE_PREFIX.length) {
        event.preventDefault();
        target.setSelectionRange(UKRAINE_PREFIX.length, UKRAINE_PREFIX.length);
        return;
      }

      // Don't allow typing before prefix
      if (cursorPosition < UKRAINE_PREFIX.length && !['ArrowUp', 'ArrowDown', 'ArrowRight', 'Tab'].includes(event.key)) {
        event.preventDefault();
        target.setSelectionRange(UKRAINE_PREFIX.length, UKRAINE_PREFIX.length);
        return;
      }

      // Only allow digits in the number part (be more restrictive)
      if (cursorPosition >= UKRAINE_PREFIX.length && 
          !event.ctrlKey && !event.metaKey && 
          !/\d/.test(event.key) && 
          !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
      }
    };

    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();
      
      const pastedText = event.clipboardData?.getData('text') || '';
      let digits = pastedText.replace(/\D/g, '');
      
      // If pasted text starts with 380, remove it
      if (digits.startsWith('380')) {
        digits = digits.slice(3);
      }
      
      // Limit to 9 digits maximum
      digits = digits.slice(0, 9);
      
      updateValue(digits);
      
      // Set cursor to end of formatted display
      nextTick(() => {
        if (inputRef.value) {
          const formattedValue = formatPhoneDisplay(digits);
          const endPosition = formattedValue.length;
          inputRef.value.setSelectionRange(endPosition, endPosition);
        }
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLInputElement;
      const cursorPosition = target.selectionStart || 0;
      
      // Don't allow cursor before prefix
      if (cursorPosition < UKRAINE_PREFIX.length) {
        nextTick(() => {
          target.setSelectionRange(UKRAINE_PREFIX.length, UKRAINE_PREFIX.length);
        });
      }
    };

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement;
      
      // Set cursor after prefix if empty or at start
      nextTick(() => {
        if (!props.modelValue || target.selectionStart === 0) {
          target.setSelectionRange(UKRAINE_PREFIX.length, UKRAINE_PREFIX.length);
        }
      });
    };

    return {
      inputRef,
      displayValue,
      handleInput,
      handleKeydown,
      handlePaste,
      handleClick,
      handleFocus
    };
  }
});
</script>

<style lang="scss" scoped>
.a-phone-input {
  @apply w-full;

  .form-label {
    @apply block mb-2 text-sm font-medium text-gray-700;
  }

  .required-mark {
    @apply text-red-500;
  }

  .input-wrapper {
    @apply relative;
  }

  .form-control {
    @apply block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md
           shadow-sm placeholder-gray-400
           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
           disabled:bg-gray-100 disabled:text-gray-500;

    &.has-error {
      @apply border-red-500 focus:ring-red-500 focus:border-red-500;
    }

    // Ensure the prefix part looks distinct
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }

  .input-icon {
    @apply absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400;
  }

  .error-message {
    @apply mt-1 text-sm text-red-600;
  }
}
</style>