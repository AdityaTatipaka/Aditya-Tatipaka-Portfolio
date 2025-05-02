<template>
  <div class="home">
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Contact />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Hero from '@/components/Hero.vue';
import About from '@/components/About.vue';
import Skills from '@/components/Skills.vue';
import Projects from '@/components/Projects.vue';
import Contact from '@/components/Contact.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Hero,
    About,
    Skills,
    Projects,
    Contact
  }
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>