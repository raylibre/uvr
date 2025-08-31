<template>
  <div class="m-registration-step-two">
    <h2 class="title">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP2.TITLE) }}</h2>
    <p class="description">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP2.DESCRIPTION) }}</p>

    <div class="form">
      <AFormDatepicker
        :id="'register-date-of-birth'"
        v-model="dateOfBirth.value.value as string"
        :label="t(T_KEYS.FORM.LABELS.DATE_OF_BIRTH)"
        :required="true"
        icon="fas fa-calendar"
        :error="dateOfBirth.errorMessage.value ? translateValidationError(dateOfBirth.errorMessage.value) : ''"
        @blur="dateOfBirth.validate"
      />

      <div class="form-grid">
        <AFormSelect
          :id="'register-region'"
          v-model="region.value.value as string"
          :label="t(T_KEYS.FORM.LABELS.REGION)"
          :options="[...REGIONS]"
          :placeholder="t(T_KEYS.FORM.LABELS.REGION)"
          :required="true"
          icon="fas fa-map-marker-alt"
          :error="region.errorMessage.value ? translateValidationError(region.errorMessage.value) : ''"
          @blur="region.validate"
          @update:model-value="handleRegionChange"
        />

        <AFormSelect
          :id="'register-city'"
          v-model="city.value.value as string"
          :label="t(T_KEYS.FORM.LABELS.CITY)"
          :options="[...availableCities]"
          :required="true"
          icon="fas fa-city"
          :disabled="!region.value.value"
          :error="city.errorMessage.value ? translateValidationError(city.errorMessage.value) : ''"
          :placeholder="!region.value.value ? 'Select region first' : 'Select city'"
          @blur="city.validate"
        />
      </div>

      <ARadioGroup
        :name="'register-gender'"
        v-model="gender.value.value as string"
        :label="t(T_KEYS.FORM.LABELS.GENDER)"
        :options="genderOptions"
        :required="true"
        :error="gender.errorMessage.value ? translateValidationError(gender.errorMessage.value) : ''"
      />

      <AFormSelect
        :id="'marital-category'"
        v-model="maritalStatus.value.value as string"
        :label="t(T_KEYS.AUTH.REGISTER.LABELS.MARITAL_STATUS)"
        :options="userMaritalList"
        :required="true"
        icon="fas fa-users"
        :error="maritalStatus.errorMessage.value ? translateValidationError(maritalStatus.errorMessage.value) : ''"
        @blur="maritalStatus.validate"
      />

      <div class="minor-children-section">
        <div class="checkbox-container">
          <ACheckbox
            :id="'register-has-minor-children'"
            v-model="hasMinorChildren.value.value as boolean"
            :label="t(T_KEYS.FORM.LABELS.HAS_MINOR_CHILDREN)"
            data-at="has-minor-children-checkbox"
            :error="hasMinorChildren.errorMessage.value ? translateValidationError(hasMinorChildren.errorMessage.value) : ''"
            @blur="hasMinorChildren.validate"
          />
        </div>

        <div v-if="hasMinorChildren.value.value" class="children-count-container">
          <AFormInput
            :id="'register-minor-children-count'"
            v-model="minorChildrenCount.value.value as string"
            :label="t(T_KEYS.FORM.LABELS.MINOR_CHILDREN_COUNT)"
            type="number"
            icon="fas fa-child"
            :error="minorChildrenCount.errorMessage.value ? translateValidationError(minorChildrenCount.errorMessage.value) : ''"
            min="1"
            max="20"
            @blur="minorChildrenCount.validate"
          />
        </div>
      </div>

      <AFormSelect
        :id="'register-category'"
        v-model="category.value.value as string"
        :label="t(T_KEYS.FORM.LABELS.CATEGORY)"
        :options="userCategoriesList"
        :required="true"
        icon="fas fa-users"
        :error="category.errorMessage.value ? translateValidationError(category.errorMessage.value) : ''"
        @blur="category.validate"
      />

      <AFormSelect
        :id="'register-activity-type'"
        v-model="activityType.value.value as string"
        :label="t(T_KEYS.AUTH.REGISTER.LABELS.ACTIVITY_TYPE)"
        :options="userActivityTypesList"
        :required="true"
        icon="fas fa-running"
        :error="activityType.errorMessage.value ? translateValidationError(activityType.errorMessage.value) : ''"
        @blur="activityType.validate"
      />

      <!-- Documents Uploader (replacing Bio) -->
      <div class="documents-uploader">
        <label class="documents-label">{{ t(T_KEYS.DOCUMENTS.TITLE) }}</label>

        <div class="documents-list space-y-4">
          <div
            v-for="(doc, idx) in documents.value.value as any[]"
            :key="`doc-${doc.type}`"
            class="document-item grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div class="doc-header flex items-center justify-between sm:justify-start gap-2">
              <span class="doc-type inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800">
                {{ getDocTypeLabel(doc.type) }}
              </span>
              <button
                type="button"
                class="doc-remove text-gray-400 hover:text-red-600"
                aria-label="Remove document type"
                title="Remove"
                @click="removeDocType(idx)"
              >
                <i class="fas fa-trash"/>
              </button>
            </div>

            <div class="doc-uploader sm:col-span-2 compact-uploader">
              <AFileUpload
                :id="`register-doc-${doc.type}`"
                :name="`register-doc-${doc.type}`"
                :label="''"
                accept="image/*,application/pdf"
                :multiple="true"
                :model-value="doc.files"
                :max-size="10 * 1024 * 1024"
                @update:modelValue="(files: File[]) => handleFilesChange(idx, files)"
                @error="onUploadError"
              />
            </div>
          </div>
        </div>

        <div class="add-document mt-4">
          <button
            v-if="!isAddingDocType && availableDocTypes.length"
            type="button"
            class="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            @click="isAddingDocType = true"
          >
            <i class="fas fa-plus" />
            {{ t(T_KEYS.DOCUMENTS.ADD) }}
          </button>

          <div v-else-if="isAddingDocType" class="flex flex-col sm:flex-row items-stretch sm:items-end gap-2">
            <AFormSelect
              :id="'register-document-type'"
              v-model="pendingDocType"
              :label="t(T_KEYS.DOCUMENTS.SELECT_TYPE)"
              :options="availableDocTypes"
              :placeholder="t(T_KEYS.DOCUMENTS.SELECT_TYPE)"
              @update:modelValue="onSelectDocType"
            />
            <AButton class="sm:ml-2" variant="outline" @click="cancelAddDoc">{{ t(T_KEYS.COMMON.BUTTONS.CANCEL) }}</AButton>
          </div>
        </div>

        <p v-if="documents.errorMessage.value || documentsError" class="text-sm text-red-600 mt-2">
          {{ documents.errorMessage.value ? translateValidationError(documents.errorMessage.value) : documentsError }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue';
import { useField } from 'vee-validate';
import {
  REGIONS,
  USER_CATEGORIES,
  MARITAL_CATEGORIES,
  ACTIVITY_TYPES,
  getCitiesForRegion
} from '~/constants/registration-constants';
import ARadioGroup from '~/components/atoms/a-radio-group';
import AFormSelect from '~/components/atoms/a-form-select';
import AFormTextarea from '~/components/atoms/a-form-textarea';
import AFormDatepicker from '~/components/atoms/a-form-datepicker';
import AFormInput from '~/components/atoms/a-form-input';
import ACheckbox from '~/components/atoms/a-checkbox';
import { useRegistrationValidation } from '~/composables/use-registration-validation';
import { useTranslation } from '~/composables/use-translation.ts';
import { T_KEYS } from '~/constants/translation-keys';
import AFileUpload from '~/components/atoms/a-file-upload/a-file-upload.vue';
import AButton from '~/components/atoms/a-button';
import { DOCUMENT_TYPES } from '~/constants/registration-constants';

export default defineComponent({
  name: 'MRegistrationStepTwo',

  components: {
    AFormSelect,
    AFormTextarea,
    AFormDatepicker,
    AFormInput,
    ACheckbox,
    ARadioGroup,
    AFileUpload,
    AButton
  },

  setup() {
    const { getStepForm, translateValidationError } = useRegistrationValidation();
    const { t } = useTranslation();
    const stepForm = getStepForm(2);

    // Create fields using useField with the step form context
    const dateOfBirth = useField('date_of_birth', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const region = useField('region', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const city = useField('city', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const gender = useField('gender', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const category = useField('category', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const maritalStatus = useField('marital_status', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const activityType = useField('activity_type', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const documents = useField('documents', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    // Local state for adding document types
    const isAddingDocType = ref(false);
    const pendingDocType = ref<string>('');
    const documentsError = ref<string>('');

    const hasMinorChildren = useField('has_minor_children', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const minorChildrenCount = useField('minor_children_count', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    // Reset minor_children_count when has_minor_children is unchecked
    watch(() => hasMinorChildren.value.value, (hasChildren) => {
      if (!hasChildren && minorChildrenCount.value.value) {
        minorChildrenCount.value.value = undefined;
      }
    });

    // Computed for available cities based on selected region
    const availableCities = computed(() => {
      if (!region.value.value) return [];
      return getCitiesForRegion(region.value.value as string);
    });
    const userCategoriesList = computed(() => {
      return USER_CATEGORIES.map(item => {
        return {
          ...item,
          label: t(item.label)
        }
      });
    });
    const userMaritalList = computed(() => {
      return MARITAL_CATEGORIES.map(item => {
        return {
          ...item,
          label: t(item.label)
        }
      });
    });

    const genderOptions = computed(() => {
      // Defined in constants as label keys; translate here
      return [
        { value: 'male', label: t('registration.gender.male') },
        { value: 'female', label: t('registration.gender.female') }
      ];
    });

    const userActivityTypesList = computed(() => {
      return ACTIVITY_TYPES.map(item => {
        return {
          ...item,
          label: t(item.label)
        }
      });
    });

    const availableDocTypes = computed(() => {
      const selected = new Set((documents.value.value as any[] || []).map((d: any) => d.type));
      return DOCUMENT_TYPES
        .filter(item => !selected.has(item.value))
        .map(item => ({ value: item.value, label: t(item.label) }));
    });

    const getDocTypeLabel = (type: string) => {
      const entry = DOCUMENT_TYPES.find(d => d.value === type);
      return entry ? t(entry.label) : type;
    };

    const onSelectDocType = () => {
      if (!pendingDocType.value) return;
      const current = (documents.value.value as any[]) || [];
      const list = [...current];
      list.push({ type: pendingDocType.value, files: [] });
      documents.value.value = list as any;
      pendingDocType.value = '';
      isAddingDocType.value = false;
    };

    // Fallback: automatically add when v-model changes
    watch(pendingDocType, (val) => {
      if (val) onSelectDocType();
    });

    const cancelAddDoc = () => {
      pendingDocType.value = '';
      isAddingDocType.value = false;
    };

    const onUploadError = (err: string) => {
      documentsError.value = err;
      setTimeout(() => { documentsError.value = ''; }, 3000);
    };

    const handleFilesChange = (idx: number, files: File[]) => {
      const list = [...(((documents.value.value as any[]) || []))];
      const limited = files.slice(0, 3);
      if (files.length > 3) {
        documentsError.value = t(T_KEYS.UPLOAD.ERRORS.MAX_FILES, { max: 3 });
        setTimeout(() => { documentsError.value = ''; }, 3000);
      }
      list[idx] = { ...list[idx], files: limited };
      documents.value.value = list as any;
      // Re-validate documents when files change
      if (typeof (documents as any).validate === 'function') {
        (documents as any).validate();
      }
    };

    const removeDocType = (idx: number) => {
      const list = [...(((documents.value.value as any[]) || []))];
      list.splice(idx, 1);
      documents.value.value = list as any;
      if (typeof (documents as any).validate === 'function') {
        (documents as any).validate();
      }
    };

    const handleRegionChange = () => {
      // Clear and reset city when region changes
      city.value.value = '';
      if (typeof (city as any).resetField === 'function') {
        (city as any).resetField();
      }
    };

    // Expose validation method for external triggering
    const validateAll = async () => {
      const results = await Promise.all([
        dateOfBirth.validate(),
        region.validate(),
        city.validate(),
        gender.validate(),
        category.validate(),
        maritalStatus.validate(),
        activityType.validate(),
        hasMinorChildren.validate(),
        // Only validate minor_children_count if has_minor_children is checked
        ...(hasMinorChildren.value.value ? [minorChildrenCount.validate()] : [])
      ]);
      return results.every(result => result.valid);
    };

    return {
      dateOfBirth,
      region,
      city,
      gender,
      category,
      documents,
      maritalStatus,
      activityType,
      hasMinorChildren,
      minorChildrenCount,
      userMaritalList,
      genderOptions,
      userCategoriesList,
      userActivityTypesList,
      REGIONS,
      availableCities,
      handleRegionChange,
      // documents
      isAddingDocType,
      pendingDocType,
      availableDocTypes,
      getDocTypeLabel,
      onSelectDocType,
      cancelAddDoc,
      onUploadError,
      handleFilesChange,
      removeDocType,
      documentsError,
      validateAll,
      t,
      T_KEYS,
      translateValidationError
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-two {
  @apply max-w-2xl mx-auto;

  .title {
    @apply text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6;
  }

  .description {
    @apply text-sm sm:text-base text-gray-600 mb-6 sm:mb-8;
  }

  .form {
    @apply space-y-4 sm:space-y-6;
  }

  .form-grid {
    // Mobile: Single column, Tablet+: Two columns
    @apply grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6;
  }

  .minor-children-section {
    @apply mt-4 sm:mt-6 space-y-4;
  }

  .checkbox-container {
    @apply bg-gray-50 rounded-lg p-4;
  }

  .children-count-container {
    @apply mt-4 max-w-xs;
  }

  .documents-uploader {
    @apply mt-4 sm:mt-6;

    .documents-label {
      @apply block text-sm font-medium text-gray-700 mb-2;
    }

    .document-item {
      @apply bg-white border border-gray-200 rounded-md p-3;

      .doc-header {
        @apply col-span-1;
      }
    }

    .add-document {
      @apply pt-2;
    }
  }
  // Compact tweaks for small screens
  @media (max-width: 640px) {
    .compact-uploader :deep(.upload-area) {
      @apply p-3;
    }
    .compact-uploader :deep(.upload-icon) {
      @apply text-2xl mb-2;
    }
    .compact-uploader :deep(.upload-text__or) {
      display: none;
    }
    .compact-uploader :deep(.upload-help) {
      display: none;
    }
    .compact-uploader :deep(.upload-button) {
      @apply text-sm;
    }
  }
}
</style>
