<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="form-label"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <Field
        :id="id"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :rules="rules"
        v-slot="{ field, errorMessage, meta }"
      >
        <component
          :is="fieldComponent"
          v-bind="{
            ...field,
            ...$attrs
          }"
          :class="[
            'form-input',
            {
              'border-red-500 focus:border-red-500 focus:ring-red-500': errorMessage,
              'border-green-500 focus:border-green-500 focus:ring-green-500': meta.valid && meta.touched
            }
          ]"
          :placeholder="placeholder"
          :rows="rows"
          :disabled="disabled"
        />
      </Field>

      <ErrorMessage
        :name="name"
        v-slot="{ message }"
      >
        <p class="mt-1 text-sm text-red-600">{{ message }}</p>
      </ErrorMessage>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import { useElementSize } from '@vueuse/core';

export default defineComponent({
  name: 'MFormField',

  components: {
    Field,
    ErrorMessage
  },

  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [String, Object, Function],
      default: ''
    },
    rows: {
      type: Number,
      default: 4
    },
    id: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const fieldComponent = computed(() => props.type === 'textarea' ? 'textarea' : 'input');
    
    // Example of using VueUse for responsive textarea
    const { width } = useElementSize(document.body);
    const dynamicRows = computed(() => width.value < 640 ? Math.max(3, props.rows - 1) : props.rows);

    return {
      fieldComponent,
      dynamicRows
    };
  }
});
</script> 