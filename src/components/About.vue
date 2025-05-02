<template>
  <section class="about" ref="aboutSection">
    <div class="about-container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="about-image-container" ref="imageContainer">
          <div class="image-frame">
            <img src="@/assets/images/Profile pic.jpeg" alt="Profile Picture" class="profile-image" />
            <div class="frame-border"></div>
          </div>
          <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
          </div>
        </div>

        <div class="about-text">
          <div class="text-content" ref="textContent">
            <h3>Hello! I'm <span class="highlight">Aditya Tatipaka</span></h3>
            <p class="bio">
              Full Stack Software Engineer with over 5 years of experience developing scalable, high-performance web
              applications using Node.js, Angular, TypeScript, JavaScript, and SQL. Proven expertise in designing and
              implementing RESTful APIs, integrating NoSQL databases like MongoDB, and deploying applications to cloud
              platforms including AWS and Azure. Adept at optimizing system performance through efficient backend logic,
              query tuning, and CI/CD automation.
            </p>

            <div class="experience-grid">
              <div class="experience-card" v-for="(exp, index) in experience" :key="index"
                @mousemove="handleMouseMove($event)" @mouseleave="handleMouseLeave" ref="expCards">
                <i :class="exp.icon"></i>
                <h4>{{ exp.title }}</h4>
                <p>{{ exp.description }}</p>
              </div>
            </div>

            <div class="cta-container">
              <a href="/Aditya_Tatipaka_Full_Stack.pdf" class="download-btn" download>
                <i class="fas fa-download"></i>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: 'About',
  setup() {
    const aboutSection = ref(null);
    const imageContainer = ref(null);
    const textContent = ref(null);
    const expCards = ref<HTMLElement[]>([]);

    const experience = [
      {
        title: 'Full Stack Development',
        description: 'Building scalable web applications with Node.js, Angular, and modern cloud technologies',
        icon: 'fas fa-layer-group'
      },
      {
        title: 'Cloud & DevOps',
        description: 'Implementing CI/CD pipelines and cloud infrastructure using AWS, Azure, and Docker',
        icon: 'fas fa-cloud'
      },
      {
        title: 'Healthcare Tech',
        description: 'Developing HIPAA-compliant healthcare solutions and clinical trial management systems',
        icon: 'fas fa-heartbeat'
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

    onMounted(() => {
      // Animate floating shapes
      gsap.to('.shape-1', {
        y: -20,
        rotation: 360,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      gsap.to('.shape-2', {
        y: 20,
        rotation: -360,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      gsap.to('.shape-3', {
        y: -15,
        rotation: 180,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Animate content on scroll
      gsap.from(imageContainer.value, {
        scrollTrigger: {
          trigger: aboutSection.value,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(textContent.value, {
        scrollTrigger: {
          trigger: aboutSection.value,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Animate experience cards
      gsap.from('.experience-card', {
        scrollTrigger: {
          trigger: '.experience-grid',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    });

    return {
      aboutSection,
      imageContainer,
      textContent,
      expCards,
      experience,
      handleMouseMove,
      handleMouseLeave
    };
  }
});
</script>

<style scoped>
.about {
  padding: 6rem 2rem;
  background-color: var(--background-color);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  margin-top: 3rem;
}

.about-image-container {
  position: relative;
  perspective: 1000px;
}

.image-frame {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.profile-image {
  width: 100%;
  height: auto;
  border-radius: 15px;
  transform: translateZ(50px);
}

.frame-border {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  transform: translateZ(25px);
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  width: 30px;
  height: 30px;
  background: var(--primary-color);
  opacity: 0.2;
}

.shape-1 {
  top: 20%;
  left: -15px;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.shape-2 {
  top: 50%;
  right: -15px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.shape-3 {
  bottom: 20%;
  left: 50%;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

.about-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.highlight {
  color: var(--primary-color);
  font-weight: 700;
}

.bio {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  opacity: 0.9;
  margin: 1.5rem 0;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.experience-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  transform-style: preserve-3d;
  perspective: 1000px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.experience-card i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  transform: translateZ(20px);
}

.experience-card h4 {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  transform: translateZ(20px);
}

.experience-card p {
  color: var(--text-color);
  opacity: 0.8;
  transform: translateZ(20px);
}

.cta-container {
  margin-top: 2rem;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
}

.download-btn i {
  transition: transform 0.3s ease;
}

.download-btn:hover i {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-image-container {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>