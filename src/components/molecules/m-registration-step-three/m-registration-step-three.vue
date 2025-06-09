<template>
  <div class="m-registration-step-three" data-at="registration-step-three">
    <h2 class="title">Contact Information</h2>
    <p class="description">Please provide your address and emergency contact details.</p>

    <div class="form">
      <AFormTextarea
        :id="'register-address'"
        :model-value="address.value.value as string"
        label="Address"
        placeholder="Please provide your full address"
        :required="true"
        :rows="3"
        icon="fas fa-map-marker-alt"
        :error="address.errorMessage.value"
        @update:model-value="address.setValue"
        @blur="address.validate"
      />

      <div class="section">
        <h3 class="section-title">
          <i class="section-icon fas fa-phone"></i>
          Emergency Contact
        </h3>
        
        <AFormInput
          :id="'register-emergency-contact-name'"
          :model-value="emergencyContactName.value.value as string"
          label="Contact Name"
          type="text"
          :required="true"
          icon="fas fa-user"
          :error="emergencyContactName.errorMessage.value"
          @update:model-value="emergencyContactName.setValue"
          @blur="emergencyContactName.validate"
        />

        <AFormInput
          :id="'register-emergency-contact-phone'"
          :model-value="emergencyContactPhone.value.value as string"
          label="Contact Phone"
          type="tel"
          :required="true"
          icon="fas fa-phone"
          :error="emergencyContactPhone.errorMessage.value"
          @update:model-value="emergencyContactPhone.setValue"
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
import AFormTextarea from '~/components/atoms/a-form-textarea';

export default defineComponent({
  name: 'MRegistrationStepThree',

  components: {
    AFormInput,
    AFormTextarea
  },

  setup() {
    // Create fields using useField
    const address = useField('address', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const emergencyContactName = useField('emergency_contact_name', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

    const emergencyContactPhone = useField('emergency_contact_phone', undefined, {
      validateOnValueUpdate: false,
      validateOnMount: false
    });

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
      address,
      emergencyContactName,
      emergencyContactPhone,
      validateAll
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