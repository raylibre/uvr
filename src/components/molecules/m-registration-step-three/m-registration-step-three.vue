<template>
  <div class="m-registration-step-three" data-at="registration-step-three">
    <h2 class="title">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP3.TITLE) }}</h2>
    <p class="description">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP3.DESCRIPTION) }}</p>

    <div class="form">
      <AFormTextarea
        :id="'register-address'"
        v-model="address.value.value as string"
        :label="t(T_KEYS.FORM.LABELS.FULL_ADDRESS)"
        :placeholder="t(T_KEYS.AUTH.REGISTER.PLACEHOLDERS.ENTER_ADDRESS)"
        :required="true"
        :rows="3"
        icon="fas fa-home"
        :error="address.errorMessage.value ? translateValidationError(address.errorMessage.value) : ''"
        @update:model-value="address.validate"
        @blur="address.validate"
      />

      <div class="form-grid">
        <AFormInput
          :id="'register-emergency-contact-name'"
          v-model="emergencyContactName.value.value as string"
          :label="t(T_KEYS.FORM.LABELS.EMERGENCY_CONTACT_NAME)"
          type="text"
          icon="fas fa-user-shield"
          :error="emergencyContactName.errorMessage.value ? translateValidationError(emergencyContactName.errorMessage.value) : ''"
          @blur="emergencyContactName.validate"
        />

        <APhoneInput
          :id="'register-emergency-contact-phone'"
          v-model="emergencyContactPhone.value.value as string"
          :label="t(T_KEYS.FORM.LABELS.EMERGENCY_CONTACT_PHONE)"
          icon="fas fa-phone-alt"
          :error="emergencyContactPhone.errorMessage.value ? translateValidationError(emergencyContactPhone.errorMessage.value) : ''"
          @blur="emergencyContactPhone.validate"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useField } from 'vee-validate';
import AFormInput from '~/components/atoms/a-form-input';
import APhoneInput from '~/components/atoms/a-phone-input';
import AFormTextarea from '~/components/atoms/a-form-textarea';
import { useRegistrationValidation } from '~/composables/use-registration-validation';
import { useTranslation } from '~/composables/use-translation';

export default defineComponent({
  name: 'MRegistrationStepThree',

  components: {
    AFormInput,
    APhoneInput,
    AFormTextarea
  },

  setup() {
    const { t, T_KEYS } = useTranslation();
    const { getStepForm, translateValidationError } = useRegistrationValidation();
    const stepForm = getStepForm(3);

    // Create fields using useField with the step form context
    const address = useField('address', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false
    });

    const emergencyContactName = useField('emergency_contact_name', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false
    });

    const emergencyContactPhone = useField('emergency_contact_phone', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false
    });

    // Form data persists in global state - no need for prop initialization or emitting

    // Expose validation method for external triggering
    const validateAll = async () => {
      const results = await Promise.all([
        address.validate(),
        emergencyContactName.validate(),
        emergencyContactPhone.validate()
      ]);
      return results.every(result => result.valid);
    };

    return {
      t,
      T_KEYS,
      address,
      emergencyContactName,
      emergencyContactPhone,
      validateAll,
      translateValidationError
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-three {
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
}
</style> 
