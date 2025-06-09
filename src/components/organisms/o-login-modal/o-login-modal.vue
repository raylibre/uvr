<template>
  <OModal v-model="isOpen" title="Login">
    <form class="login-form" @submit.prevent="handleSubmit">
      <AFormInput
        :id="'login-identifier'"
        v-model="form.identifier"
        :label="'Email or Phone Number'"
        :type="'text'"
        :required="true"
        :error="errors.identifier"
        :icon="'fas fa-user'"
      />

      <AFormInput
        :id="'login-password'"
        v-model="form.password"
        :label="'Password'"
        :type="'password'"
        :required="true"
        :error="errors.password"
        :icon="'fas fa-lock'"
      />
    </form>

    <template #footer>
      <div class="login-actions">
        <AButton
          variant="outline"
          @click="handleClose"
        >
          Cancel
        </AButton>
        <AButton
          variant="primary"
          :loading="isLoading"
          @click="handleSubmit"
        >
          Login
        </AButton>
      </div>
    </template>
  </OModal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useAuthStore } from '~/composables/use-auth-store';
import { useEventBus } from '~/composables/use-event-bus';
import { EVENTS } from '~/constants/event-bus-constants';
import OModal from '~/components/organisms/o-modal';
import AFormInput from '~/components/atoms/a-form-input';
import AButton from '~/components/atoms/a-button';

interface LoginForm {
  identifier: string;
  password: string;
}

interface FormErrors {
  identifier?: string;
  password?: string;
}

export default defineComponent({
  name: 'OLoginModal',

  components: {
    OModal,
    AFormInput,
    AButton
  },

  setup() {
    const { login } = useAuthStore();
    const { setBusListener, BUS } = useEventBus();
    const isLoading = ref(false);
    const isOpen = ref(false);
    const form = reactive<LoginForm>({
      identifier: '',
      password: ''
    });
    const errors = reactive<FormErrors>({});

    const validateForm = (): boolean => {
      errors.identifier = '';
      errors.password = '';
      let isValid = true;

      if (!form.identifier) {
        errors.identifier = 'Email or phone number is required';
        isValid = false;
      }

      if (!form.password) {
        errors.password = 'Password is required';
        isValid = false;
      } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        isValid = false;
      }

      return isValid;
    };

    const handleClose = () => {
      BUS.emit(EVENTS.HIDE_LOGIN_MODAL as any);
      isOpen.value = false;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      try {
        isLoading.value = true;
        await login(form);
        BUS.emit(EVENTS.SUCCESS_LOGIN as any);
        handleClose();
      } catch (error) {
        if (error instanceof Error) {
          // Handle specific error cases
          if (error.message.includes('credentials')) {
            errors.identifier = 'Invalid credentials';
          } else {
            errors.identifier = 'An error occurred. Please try again.';
          }
          BUS.emit(EVENTS.FAILED_LOGIN as any, { error: error.message });
        }
      } finally {
        isLoading.value = false;
      }
    };

    // Set up event listeners
    setBusListener(EVENTS.SHOW_LOGIN_MODAL, () => {
      isOpen.value = true;
    });

    setBusListener(EVENTS.HIDE_LOGIN_MODAL, () => {
      isOpen.value = false;
    });

    return {
      form,
      errors,
      isLoading,
      isOpen,
      handleSubmit,
      handleClose
    };
  }
});
</script>

<style lang="scss" scoped>
.login-form {
  @apply space-y-4;
}

.login-actions {
  @apply flex justify-end space-x-3;
}
</style>