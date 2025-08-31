<template>
  <OModal v-model="isOpen" :title="t(T_KEYS.AUTH.LOGIN.TITLE)">
    <form class="login-form" @submit.prevent="handleSubmit">
      <AFormInput
        :id="'login-identifier'"
        v-model="form.identifier"
        :label="t(T_KEYS.AUTH.LOGIN.IDENTIFIER_LABEL)"
        :type="'text'"
        :required="true"
        :error="errors.identifier"
        :icon="'fas fa-user'"
      />

      <AFormInput
        :id="'login-password'"
        v-model="form.password"
        :label="t(T_KEYS.AUTH.LOGIN.PASSWORD_LABEL)"
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
          {{ t(T_KEYS.COMMON.BUTTONS.CANCEL) }}
        </AButton>
        <AButton
          variant="primary"
          :loading="isLoading"
          @click="handleSubmit"
        >
          {{ t(T_KEYS.COMMON.BUTTONS.LOGIN) }}
        </AButton>
      </div>
    </template>
  </OModal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useUserStore } from '~/composables/use-user-store';
import { useEventBus } from '~/composables/use-event-bus';
import { EVENTS } from '~/constants/event-bus-constants';
import OModal from '~/components/organisms/o-modal';
import AFormInput from '~/components/atoms/a-form-input';
import AButton from '~/components/atoms/a-button';
import { useTranslation } from '~/composables/use-translation';

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
    const { t, T_KEYS } = useTranslation();
    const { login } = useUserStore();
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
        errors.identifier = t(T_KEYS.AUTH.LOGIN.IDENTIFIER_REQUIRED);
        isValid = false;
      }

      if (!form.password) {
        errors.password = t(T_KEYS.FORM.VALIDATION.PASSWORD_REQUIRED);
        isValid = false;
      } else if (form.password.length < 6) {
        errors.password = t(T_KEYS.AUTH.LOGIN.PASSWORD_MIN_LENGTH);
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
            errors.identifier = t(T_KEYS.AUTH.LOGIN.INVALID_CREDENTIALS);
          } else {
            errors.identifier = t(T_KEYS.COMMON.ERRORS.GENERAL_ERROR);
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
      t,
      T_KEYS,
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
