<template>
  <div class="m-registration-step-one">
    <h2 class="title">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP1.TITLE) }}</h2>
    <p class="description">{{ t(T_KEYS.AUTH.REGISTER.STEPS.STEP1.DESCRIPTION) }}</p>

    <!-- Debug section (remove in production) -->
    <div v-if="showDebug" class="debug-section">
      <h3>Validation Debug</h3>
      <button class="debug-button" @click="validateAll">Validate All Fields</button>
      <pre class="debug-info">{{ debugInfo }}</pre>
    </div>

    <div class="form">
      <div class="form-grid">
        <AFormInput
          :id="'register-last-name'"
          v-model="lastName.value.value as string"
          :label="t(T_KEYS.FORM.LABELS.LAST_NAME)"
          type="text"
          :required="true"
          icon="fas fa-user"
          :error="lastName.errorMessage.value ? translateValidationError(lastName.errorMessage.value) : ''"
          @blur="lastName.validate"
        />

        <AFormInput
          :id="'register-first-name'"
          v-model="firstName.value.value as string"
          :label="t(T_KEYS.FORM.LABELS.FIRST_NAME)"
          type="text"
          :required="true"
          icon="fas fa-user"
          :error="firstName.errorMessage.value ? translateValidationError(firstName.errorMessage.value) : ''"
          @blur="firstName.validate"
        />
      </div>

      <AFormInput
        :id="'register-patronymic'"
        v-model="patronymic.value.value as string"
        :label="t(T_KEYS.FORM.LABELS.PATRONYMIC)"
        type="text"
        icon="fas fa-user"
        :required="true"
        :error="patronymic.errorMessage.value ? translateValidationError(patronymic.errorMessage.value) : ''"
        @blur="patronymic.validate"
      />

      <AFormInput
        :id="'register-email'"
        v-model="email.value.value as string"
        :label="t(T_KEYS.FORM.LABELS.EMAIL_ADDRESS)"
        type="email"
        :required="true"
        icon="fas fa-envelope"
        :error="email.errorMessage.value ? translateValidationError(email.errorMessage.value) : ''"
        @blur="email.validate"
      />

      <APhoneInput
        :id="'register-phone'"
        v-model="phone.value.value as string"
        :label="t(T_KEYS.FORM.LABELS.PHONE_NUMBER)"
        :required="true"
        icon="fas fa-phone"
        :error="phone.errorMessage.value ? translateValidationError(phone.errorMessage.value) : ''"
        @blur="phone.validate"
      />

      <div class="form-grid">
        <AFormInput
          :id="'register-password'"
          v-model="password.value.value as string"
          :label="t(T_KEYS.FORM.LABELS.PASSWORD)"
          type="password"
          :required="true"
          icon="fas fa-lock"
          :error="password.errorMessage.value ? translateValidationError(password.errorMessage.value) : ''"
          @blur="password.validate"
        />

        <AFormInput
          :id="'register-password-confirmation'"
          v-model="passwordConfirmation.value.value as string"
          :label="t(T_KEYS.FORM.LABELS.CONFIRM_PASSWORD)"
          type="password"
          :required="true"
          icon="fas fa-lock"
          :error="passwordConfirmation.errorMessage.value ? translateValidationError(passwordConfirmation.errorMessage.value) : ''"
          @blur="passwordConfirmation.validate"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useField } from 'vee-validate';
import AFormInput from '~/components/atoms/a-form-input';
import APhoneInput from '~/components/atoms/a-phone-input';
import { useRegistrationValidation } from '~/composables/use-registration-validation';
import { useTranslation } from '~/composables/use-translation';

export default defineComponent({
  name: 'MRegistrationStepOne',

  components: {
    AFormInput,
    APhoneInput
  },

  setup() {
    const { t, T_KEYS } = useTranslation();
    const { getStepForm, translateValidationError } = useRegistrationValidation();
    const stepForm = getStepForm(1);
    const showDebug = ref(false);

    // Create fields using useField with the step form context
    const firstName = useField('first_name', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const lastName = useField('last_name', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const patronymic = useField('patronymic', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const email = useField('email', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const phone = useField('phone', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const password = useField('password', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const passwordConfirmation = useField('password_confirmation', undefined, {
      form: stepForm as any,
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    // Debug information
    const debugInfo = computed(() => ({
      values: {
        first_name: firstName.value.value,
        last_name: lastName.value.value,
        patronymic: patronymic.value.value,
        email: email.value.value,
        phone: phone.value.value,
        password: password.value.value ? '***hidden***' : '',
        password_confirmation: passwordConfirmation.value.value ? '***hidden***' : ''
      },
      errors: {
        first_name: firstName.errorMessage.value,
        last_name: lastName.errorMessage.value,
        patronymic: patronymic.errorMessage.value,
        email: email.errorMessage.value,
        phone: phone.errorMessage.value,
        password: password.errorMessage.value,
        password_confirmation: passwordConfirmation.errorMessage.value
      },
      meta: {
        first_name: { touched: firstName.meta.touched, valid: firstName.meta.valid },
        last_name: { touched: lastName.meta.touched, valid: lastName.meta.valid },
        email: { touched: email.meta.touched, valid: email.meta.valid },
        phone: { touched: phone.meta.touched, valid: phone.meta.valid },
        password: { touched: password.meta.touched, valid: password.meta.valid },
        password_confirmation: { touched: passwordConfirmation.meta.touched, valid: passwordConfirmation.meta.valid }
      }
    }));

    // Expose validation method for external triggering
    const validateAll = async () => {
      const results = await Promise.all([
        firstName.validate(),
        lastName.validate(),
        patronymic.validate(),
        email.validate(),
        phone.validate(),
        password.validate(),
        passwordConfirmation.validate()
      ]);
      return results.every(result => result.valid);
    };

    return {
      t,
      T_KEYS,
      firstName,
      lastName,
      patronymic,
      email,
      phone,
      password,
      passwordConfirmation,
      validateAll,
      showDebug,
      debugInfo,
      translateValidationError
    };
  }
});
</script>

<style lang="scss" scoped>
.m-registration-step-one {
  @apply max-w-2xl mx-auto;

  .title {
    @apply text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6;
  }

  .description {
    @apply text-sm sm:text-base text-gray-600 mb-6 sm:mb-8;
  }

  .debug-section {
    @apply bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6;
    
    h3 {
      @apply text-lg font-semibold text-yellow-800 mb-2;
    }
    
    .debug-button {
      @apply bg-yellow-500 text-white px-3 py-1 rounded text-sm mb-2;
    }
    
    .debug-info {
      @apply bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40;
    }
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