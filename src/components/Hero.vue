<template>
  <section class="hero">
    <ThreeBackground />
    <div class="hero-content" ref="content">
      <h1 class="glitch-text" :data-text="title">{{ title }}</h1>
      <p class="subtitle" v-if="subtitle" ref="subtitle">{{ subtitle }}</p>
      <div class="cta-container">
        <router-link to="/projects" class="cta-button">
          View My Work
          <span class="arrow">→</span>
        </router-link>
        <a :href="resumeUrl" download class="cta-button download-button">
          Download Resume
          <span class="arrow">↓</span>
        </a>
      </div>
    </div>
    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="arrow-scroll"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import ThreeBackground from './ThreeBackground.vue';

export default defineComponent({
  name: 'Hero',
  components: {
    ThreeBackground
  },
  setup() {
    const content = ref(null);
    const subtitle = ref(null);
    const title = "Hello, I'm Aditya Tatipaka";
    const subtitleText = "Full Stack Software Engineer";
    const baseUrl = import.meta.env.BASE_URL;
    const resumeUrl = `${baseUrl}Aditya_Tatipaka_Full_Stack.pdf`;

    onMounted(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(content.value, {
        y: 100,
        duration: 1,
        opacity: 0
      })
        .from(subtitle.value, {
          y: 20,
          duration: 0.8,
          opacity: 0
        }, '-=0.5');
    });

    return {
      content,
      subtitle,
      title,
      subtitleText,
      resumeUrl
    };
  }
});
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 1;
  padding: 2rem;
  max-width: 800px;
}

.glitch-text {
  font-size: 4rem;
  font-weight: 800;
  color: var(--text-color);
  text-shadow: 0 0 10px rgba(33, 150, 243, 0.5);
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  animation: glitch-effect 3s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  transform: translate(-0.04em, -0.03em);
  opacity: 0.75;
}

.glitch-text::after {
  animation: glitch-effect 2s infinite;
  clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
  transform: translate(0.04em, 0.03em);
  opacity: 0.75;
}

@keyframes glitch-effect {
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }

  14% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }

  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }

  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }

  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }

  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }

  100% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
}

.subtitle {
  font-size: 1.5rem;
  margin-top: 1rem;
  color: var(--text-color);
  opacity: 0.8;
}

.cta-container {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.download-button {
  background: var(--primary-color);
}

.download-button:hover {
  background: transparent;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: var(--text-color);
  background: transparent;
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cta-button:hover {
  background: var(--primary-color);
}

.arrow {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow {
  transform: translateX(5px);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid var(--text-color);
  border-radius: 13px;
  position: relative;
}

.wheel {
  width: 2px;
  height: 6px;
  background: var(--text-color);
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 1.5s infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateX(-50%) translateY(15px);
    opacity: 0;
  }
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}
</style>