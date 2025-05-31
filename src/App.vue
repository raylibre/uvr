<template>
  <OHeader @join="handleJoin" @login="handleLogin" />
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OHeader from '~/components/organisms/o-header/o-header.vue';

export default defineComponent({
  name: 'App',

  components: {
    OHeader
  },

  setup() {
    const handleJoin = () => {
      // TODO: Implement join functionality
      console.log('Join clicked');
    };

    const handleLogin = () => {
      // TODO: Implement login functionality
      console.log('Login clicked');
    };

    return {
      handleJoin,
      handleLogin
    };
  }
});
</script>

<style lang="scss">
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style> 