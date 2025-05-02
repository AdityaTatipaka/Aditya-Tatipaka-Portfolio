<template>
  <nav class="navbar" :class="{ 'scrolled': hasScrolled }">
    <div class="nav-content">
      <router-link to="/" class="logo">
        <span class="logo-text">Aditya Tatipaka</span>
      </router-link>

      <div class="nav-links" ref="navLinks">
        <div class="nav-indicator" :style="indicatorStyle"></div>
        <router-link v-for="link in links" :key="link.path" :to="link.path" class="nav-link"
          @mouseenter="updateIndicator" @mouseleave="resetIndicator">
          {{ link.name }}
        </router-link>
      </div>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span class="menu-icon" :class="{ 'active': isMenuOpen }"></span>
      </button>
    </div>

    <transition name="mobile-menu">
      <div v-if="isMenuOpen" class="mobile-menu">
        <router-link v-for="link in links" :key="link.path" :to="link.path" class="mobile-link" @click="closeMenu">
          {{ link.name }}
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const hasScrolled = ref(false);
    const isMenuOpen = ref(false);
    const navLinks = ref<HTMLElement | null>(null);
    const indicatorStyle = ref({
      width: '0px',
      left: '0px'
    });

    const links = [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Projects', path: '/projects' },
      { name: 'Skills', path: '/skills' },
      { name: 'Contact', path: '/contact' }
    ];

    const handleScroll = () => {
      hasScrolled.value = window.scrollY > 50;
    };

    const updateIndicator = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const navRect = navLinks.value?.getBoundingClientRect();

      if (navRect) {
        indicatorStyle.value = {
          width: `${rect.width}px`,
          left: `${rect.left - navRect.left}px`
        };
      }
    };

    const resetIndicator = () => {
      const activeLink = navLinks.value?.querySelector('.router-link-active');
      if (activeLink) {
        updateIndicator({ currentTarget: activeLink } as MouseEvent);
      } else {
        indicatorStyle.value = {
          width: '0px',
          left: '0px'
        };
      }
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
      document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
      document.body.style.overflow = '';
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      resetIndicator();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      hasScrolled,
      isMenuOpen,
      navLinks,
      links,
      indicatorStyle,
      toggleMenu,
      closeMenu,
      updateIndicator,
      resetIndicator
    };
  }
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  background: transparent;
}

.navbar.scrolled {
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  padding: 0.8rem 2rem;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 2rem;
  position: relative;
}

.nav-indicator {
  position: absolute;
  bottom: -5px;
  height: 2px;
  background: var(--primary-color);
  transition: all 0.3s ease;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--primary-color);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  position: relative;
  width: 24px;
  height: 2px;
  background: var(--text-color);
  transition: all 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: var(--text-color);
  transition: all 0.3s ease;
}

.menu-icon::before {
  transform: translateY(-8px);
}

.menu-icon::after {
  transform: translateY(8px);
}

.menu-icon.active {
  background: transparent;
}

.menu-icon.active::before {
  transform: rotate(45deg);
}

.menu-icon.active::after {
  transform: rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem;
  display: none;
}

.mobile-link {
  display: block;
  color: var(--text-color);
  text-decoration: none;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
}

.mobile-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--primary-color);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .mobile-menu {
    display: block;
  }
}
</style>