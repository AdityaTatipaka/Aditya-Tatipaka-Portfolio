<template>
  <div id="app" class="app">
    <Preloader @loaded="handleLoaded" v-if="!isContentLoaded" />
    <template v-else>
      <CustomCursor />
      <NavBar />
      <main>
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <ScrollToTop />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavBar from './components/NavBar.vue';
import ScrollToTop from './components/ScrollToTop.vue';
import CustomCursor from './components/CustomCursor.vue';
import Preloader from './components/Preloader.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    ScrollToTop,
    CustomCursor,
    Preloader
  },
  setup() {
    const isContentLoaded = ref(false);

    const handleLoaded = () => {
      isContentLoaded.value = true;
      document.body.style.overflow = '';
    };

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    return {
      isContentLoaded,
      handleLoaded
    };
  }
});
</script>

<style>
@import './assets/styles/main.css';

.app {
  min-height: 100vh;
  position: relative;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

main {
  position: relative;
  z-index: 1;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--background-color);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}
</style>