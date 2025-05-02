<template>
  <section class="contact" ref="contactSection">
    <div class="contact-container">
      <h2 class="section-title">Get In Touch</h2>
      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card" v-for="info in contactInfo" :key="info.title" @mousemove="handleMouseMove($event)"
            @mouseleave="handleMouseLeave" ref="infoCards">
            <i :class="info.icon"></i>
            <h3>{{ info.title }}</h3>
            <p v-if="info.title === 'LinkedIn'">
              <a :href="'https://www.' + info.value" target="_blank" rel="noopener noreferrer">{{ info.value }}</a>
            </p>
            <p v-else>{{ info.value }}</p>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="submitForm" ref="form">
          <div class="form-group">
            <div class="input-container" :class="{ 'focused': focused === 'name' }">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="formData.name" @focus="focused = 'name'" @blur="focused = null"
                required />
            </div>
          </div>

          <div class="form-group">
            <div class="input-container" :class="{ 'focused': focused === 'email' }">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="formData.email" @focus="focused = 'email'" @blur="focused = null"
                required />
            </div>
          </div>

          <div class="form-group">
            <div class="input-container" :class="{ 'focused': focused === 'message' }">
              <label for="message">Message</label>
              <textarea id="message" v-model="formData.message" @focus="focused = 'message'" @blur="focused = null"
                required></textarea>
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span class="btn-text">{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { gsap } from 'gsap';

export default defineComponent({
  name: 'Contact',
  setup() {
    const contactSection = ref(null);
    const form = ref(null);
    const infoCards = ref<HTMLElement[]>([]);
    const focused = ref<string | null>(null);
    const isSubmitting = ref(false);

    const formData = reactive({
      name: '',
      email: '',
      message: ''
    });

    const contactInfo = [
      {
        title: 'Email',
        value: 'adityatatipaka@gmail.com',
        icon: 'fas fa-envelope'
      },
      {
        title: 'Location',
        value: 'Greenville, SC (Willing to Relocate)',
        icon: 'fas fa-map-marker-alt'
      },
      {
        title: 'LinkedIn',
        value: 'linkedin.com/in/aditya-tatipaka',
        icon: 'fab fa-linkedin'
      }
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((centerX - x) / centerX) * 10;

      gsap.to(card, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.05,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      gsap.to(card, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: 'power2.out'
      });
    };

    const submitForm = async () => {
      isSubmitting.value = true;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Reset form
      formData.name = '';
      formData.email = '';
      formData.message = '';
      isSubmitting.value = false;

      // Show success animation
      const btn = form.value?.querySelector('.submit-btn');
      if (btn) {
        gsap.to(btn, {
          backgroundColor: '#4CAF50',
          duration: 0.3,
          onComplete: () => {
            setTimeout(() => {
              gsap.to(btn, {
                backgroundColor: 'var(--primary-color)',
                duration: 0.3
              });
            }, 1000);
          }
        });
      }
    };

    return {
      contactSection,
      form,
      infoCards,
      contactInfo,
      formData,
      focused,
      isSubmitting,
      handleMouseMove,
      handleMouseLeave,
      submitForm
    };
  }
});
</script>

<style scoped>
.contact {
  padding: 6rem 2rem;
  background-color: var(--background-color);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  margin-top: 3rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  transform-style: preserve-3d;
  perspective: 1000px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-card i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  transform: translateZ(20px);
}

.info-card h3 {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  transform: translateZ(20px);
}

.info-card p {
  color: var(--text-color);
  opacity: 0.8;
  transform: translateZ(20px);
}

.info-card a {
  color: var(--primary-color);
  text-decoration: none;
}

.info-card a:hover {
  text-decoration: underline;
}

.contact-form {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.input-container {
  position: relative;
  transition: all 0.3s ease;
}

.input-container label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: var(--text-color);
  opacity: 0.7;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-container.focused label,
.input-container input:not(:placeholder-shown)+label,
.input-container textarea:not(:placeholder-shown)+label {
  transform: translateY(-1.5rem) scale(0.8);
  color: var(--primary-color);
}

input,
textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn i {
  transition: transform 0.3s ease;
}

.submit-btn:hover:not(:disabled) i {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>