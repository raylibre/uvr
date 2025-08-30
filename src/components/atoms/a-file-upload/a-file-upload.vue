<template>
  <div class="a-file-upload" data-at="file-upload">
    <label v-if="label" class="label">
      {{ label }}
      <span v-if="required" class="label__required">*</span>
    </label>

    <div
      class="upload"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <!-- Upload Area -->
      <div
        class="upload-area"
        :class="{
          'is-dragging': isDragging,
          'has-error': error,
          'is-disabled': disabled
        }"
      >
        <div class="upload-content">
          <i class="upload-icon fas fa-cloud-upload-alt"/>
          <div class="upload-text">
            <label
              :for="id"
              class="upload-button"
              :class="{ 'is-disabled': disabled }"
            >
              <span>Upload files</span>
              <input
                :id="id"
                ref="fileInput"
                type="file"
                :name="name"
                class="upload-input"
                :multiple="multiple"
                :accept="accept"
                :disabled="disabled"
                @change="handleFileSelect"
              />
            </label>
            <p class="upload-text__or">or drag and drop</p>
          </div>
          <p class="upload-help">
            {{ fileTypeText }}
          </p>
          <p v-if="maxSize" class="upload-help">
            Max file size: {{ formatFileSize(maxSize) }}
          </p>
        </div>
      </div>

      <!-- File List -->
      <ul v-if="modelValue?.length" class="file-list">
        <li
          v-for="(file, index) in modelValue"
          :key="index"
          class="file-item"
        >
          <div class="file-item__content">
            <i class="file-item__icon fas fa-file"/>
            <span class="file-item__name">{{ file.name }}</span>
            <span class="file-item__size">({{ formatFileSize(file.size) }})</span>
          </div>
          <button
            type="button"
            class="file-item__remove"
            :disabled="disabled"
            @click="removeFile(index)"
          >
            <i class="fas fa-times"/>
          </button>
        </li>
      </ul>

      <!-- Error Message -->
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useTranslation } from '~/composables/use-translation';
import { T_KEYS } from '~/constants/translation-keys';

export default defineComponent({
  name: 'AFileUpload',

  props: {
    modelValue: {
      type: Array as () => File[],
      default: () => []
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxSize: {
      type: Number,
      default: 0 // in bytes
    },
    error: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue', 'error'],

  setup(props, { emit }) {
    const { t } = useTranslation();
    const isDragging = ref(false);
    const fileInput = ref<HTMLInputElement | null>(null);

    const fileTypeText = computed(() => {
      if (!props.accept) return t('common.labels.dragAndDrop') ? t('common.labels.dragAndDrop') : 'All file types accepted';
      // Keep simple display text; localization for validation errors below
      return `Accepted file types: ${props.accept.split(',').join(', ')}`;
    });

    const validateFile = (file: File): string | null => {
      if (props.maxSize && file.size > props.maxSize) {
        return t(T_KEYS.UPLOAD.ERRORS.MAX_SIZE, { size: formatFileSize(props.maxSize) });
      }
      if (props.accept && !props.accept.split(',').some(type => file.type.match(type.trim()))) {
        return t(T_KEYS.UPLOAD.ERRORS.FILE_TYPE);
      }
      return null;
    };

    const handleFiles = (files: FileList) => {
      if (props.disabled) return;

      const newFiles = Array.from(files);
      const validFiles: File[] = [];
      const errors: string[] = [];

      newFiles.forEach(file => {
        const error = validateFile(file);
        if (error) {
          errors.push(`${file.name}: ${error}`);
        } else {
          validFiles.push(file);
        }
      });

      if (errors.length) {
        emit('error', errors.join('\n'));
        return;
      }

      if (props.multiple) {
        emit('update:modelValue', [...props.modelValue, ...validFiles]);
      } else {
        emit('update:modelValue', validFiles.slice(-1));
      }
    };

    const handleFileSelect = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        handleFiles(input.files);
      }
      // Reset input value to allow selecting the same file again
      input.value = '';
    };

    const handleDrop = (event: DragEvent) => {
      isDragging.value = false;
      if (event.dataTransfer?.files) {
        handleFiles(event.dataTransfer.files);
      }
    };

    const removeFile = (index: number) => {
      if (props.disabled) return;
      const files = [...props.modelValue];
      files.splice(index, 1);
      emit('update:modelValue', files);
    };

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };

    return {
      isDragging,
      fileInput,
      fileTypeText,
      handleFileSelect,
      handleDrop,
      removeFile,
      formatFileSize
    };
  }
});
</script>

<style lang="scss" scoped>
.a-file-upload {
  .label {
    @apply block text-sm font-medium text-gray-700 mb-2;

    &__required {
      @apply text-red-500;
    }
  }

  .upload {
    @apply relative;
  }

  .upload-area {
    @apply flex justify-center rounded-lg border-2 border-dashed border-gray-300 p-6;
    @apply cursor-pointer hover:border-gray-400;

    &.is-dragging {
      @apply border-primary bg-primary/5;
    }

    &.has-error {
      @apply border-red-300;
    }

    &.is-disabled {
      @apply bg-gray-50 cursor-not-allowed;
    }
  }

  .upload-content {
    @apply text-center;
  }

  .upload-icon {
    @apply text-gray-400 text-3xl mb-4;
  }

  .upload-text {
    @apply flex text-sm text-gray-600;

    &__or {
      @apply pl-1;
    }
  }

  .upload-button {
    @apply relative cursor-pointer rounded-md font-medium text-primary;
    @apply focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2;
    @apply hover:text-primary-dark;

    &.is-disabled {
      @apply cursor-not-allowed;
    }
  }

  .upload-input {
    @apply sr-only;
  }

  .upload-help {
    @apply text-xs text-gray-500 mt-2;
  }

  .file-list {
    @apply mt-4 space-y-2;
  }

  .file-item {
    @apply flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md;

    &__content {
      @apply flex items-center;
    }

    &__icon {
      @apply text-gray-400 mr-2;
    }

    &__name {
      @apply text-sm text-gray-700;
    }

    &__size {
      @apply text-xs text-gray-500 ml-2;
    }

    &__remove {
      @apply text-gray-400 hover:text-red-500;
    }
  }

  .error {
    @apply mt-1 text-sm text-red-600;
  }
}
</style>
