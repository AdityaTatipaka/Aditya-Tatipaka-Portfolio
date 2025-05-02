<template>
  <section class="projects" ref="projectsSection">
    <h2 class="section-title">Featured Projects</h2>
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card" @mousemove="handleMouseMove($event)"
        @mouseleave="handleMouseLeave" ref="projectCards">
        <div class="project-content">
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay"></div>
          </div>
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
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
  name: 'Projects',
  setup() {
    const projectsSection = ref(null);
    const projectCards = ref<HTMLElement[]>([]);

    const projects = [
      {
        id: 1,
        title: 'Healthcare Platform Transformation',
        description: 'Led the transformation from monolithic to microservices architecture, reducing data processing time by 95% and increasing system scalability by 50%. Implemented features for automated test orders and sample processing.',
        image: '/projects/healthcare-platform.webp',
        demo: '#',
        github: '#',
        technologies: ['Node.js', 'Angular', 'MySQL', 'AWS', 'Azure']
      },
      {
        id: 2,
        title: 'COVID-19 Detection System',
        description: 'Led development of an AI-powered web application for analyzing chest X-rays, achieving 95% COVID-19 detection accuracy. Built with Node.js, Express.js, MongoDB, and Python.',
        image: '/projects/covid-detection.webp',
        demo: '#',
        github: '#',
        technologies: ['Node.js', 'Python', 'MongoDB', 'Machine Learning']
      },
      {
        id: 3,
        title: 'Insurance Data Processing Suite',
        description: 'Architected core components of healthcare insurance suite using Node.js and Express.js. Implemented NoSQL database solution with ArangoDB for complex insurance data structures.',
        image: '/projects/insurance-suite.webp',
        demo: '#',
        github: '#',
        technologies: ['Node.js', 'Express.js', 'ArangoDB', 'D3.js']
      }
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 15;
      const rotateY = ((centerX - x) / centerX) * 15;

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
      // Animate projects on scroll
      gsap.from(projectCards.value, {
        scrollTrigger: {
          trigger: projectsSection.value,
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
      projects,
      projectsSection,
      projectCards,
      handleMouseMove,
      handleMouseLeave
    };
  }
});
</script>

<style scoped>
.projects {
  padding: 6rem 2rem;
  background-color: var(--background-color);
  min-height: 100vh;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.project-content {
  transform-style: preserve-3d;
}

.project-image {
  position: relative;
  overflow: hidden;
  height: 200px;
  transform: translateZ(20px);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.project-card:hover .project-links {
  transform: translateY(0);
}

.project-link {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.project-info {
  padding: 1.5rem;
  transform: translateZ(30px);
}

.project-info h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.project-info p {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  border-radius: 15px;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>