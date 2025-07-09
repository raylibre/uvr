<template>
  <div class="app">
    <OHeader @join="handleJoin" @login="handleLogin" />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <OLoginModal />
    <ORegisterModal />
    <OConfirmationModal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OHeader from '~/components/organisms/o-header/o-header.vue';
import OLoginModal from '~/components/organisms/o-login-modal';
import { useEventBus } from '~/composables/use-event-bus';
import ORegisterModal from '~/components/organisms/o-register-modal/o-register-modal.vue';
import OConfirmationModal from '~/components/organisms/o-confirmation-modal';

export default defineComponent({
  name: 'App',

  components: {
    OConfirmationModal,
    ORegisterModal,
    OLoginModal,
    OHeader,
  },

  setup() {
    const { BUS, EVENTS } = useEventBus();
    const handleJoin = () => {
      // TODO: Implement join functionality
      console.log('Join clicked');
    };

    const handleLogin = () => {
      BUS.emit(EVENTS.SHOW_LOGIN_MODAL as any);
    };

    return {
      handleJoin,
      handleLogin,
    };
  },
});
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>