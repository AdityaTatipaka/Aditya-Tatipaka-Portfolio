<template>
  <section class="skills" ref="skillsSection">
    <h2 class="section-title">Skills & Expertise</h2>
    <div class="skills-container">
      <div class="skills-category" v-for="category in skillCategories" :key="category.name">
        <h3 class="category-title">{{ category.name }}</h3>
        <div class="skills-grid">
          <div v-for="skill in category.skills" :key="skill.name" class="skill-card"
            @mousemove="handleMouseMove($event)" @mouseleave="handleMouseLeave" ref="skillCards">
            <div class="skill-icon">
              <i :class="skill.icon"></i>
            </div>
            <h4>{{ skill.name }}</h4>
            <div class="skill-bar-container">
              <div class="skill-bar" :style="{ width: `${skill.level}%` }">
                <span class="skill-percentage">{{ skill.level }}%</span>
              </div>
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
  name: 'Skills',
  setup() {
    const skillsSection = ref<HTMLElement | null>(null);
    const skillCards = ref<HTMLElement[]>([]);

    const skillCategories = ref([
      {
        name: 'Programming Languages & Frameworks',
        skills: [
          { name: 'JavaScript/ES6+', level: 95, icon: 'fab fa-js' },
          { name: 'TypeScript', level: 90, icon: 'fas fa-code' },
          { name: 'Node.js', level: 92, icon: 'fab fa-node-js' },
          { name: 'Angular', level: 90, icon: 'fab fa-angular' },
          { name: 'Vue.js', level: 85, icon: 'fab fa-vuejs' },
          { name: 'React.js', level: 85, icon: 'fab fa-react' }
        ]
      },
      {
        name: 'Cloud & DevOps',
        skills: [
          { name: 'AWS', level: 88, icon: 'fab fa-aws' },
          { name: 'Azure', level: 85, icon: 'fab fa-microsoft' },
          { name: 'Docker', level: 85, icon: 'fab fa-docker' },
          { name: 'CI/CD', level: 90, icon: 'fas fa-code-branch' }
        ]
      },
      {
        name: 'Databases & Tools',
        skills: [
          { name: 'MySQL', level: 90, icon: 'fas fa-database' },
          { name: 'MongoDB', level: 88, icon: 'fas fa-leaf' },
          { name: 'Redis', level: 85, icon: 'fas fa-server' },
          { name: 'Git', level: 92, icon: 'fab fa-git-alt' }
        ]
      }
    ]);

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
      // Animate skill bars on scroll
      skillCards.value.forEach((card) => {
        const bar = card.querySelector('.skill-bar');
        if (bar) {
          gsap.from(bar, {
            width: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top center+=100',
              toggleActions: 'play none none reverse'
            }
          });
        }
      });

      // Animate cards on scroll
      gsap.from('.skill-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-container',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return {
      skillCategories,
      skillsSection,
      skillCards,
      handleMouseMove,
      handleMouseLeave
    };
  }
});
</script>

<style scoped>
.skills {
  padding: 6rem 2rem;
  background-color: var(--background-color);
}

.skills-container {
  max-width: 1200px;
  margin: 0 auto;
}

.skills-category {
  margin-bottom: 4rem;
}

.category-title {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 50%;
  height: 3px;
  background: var(--primary-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  transform-style: preserve-3d;
  perspective: 1000px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.skill-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  transform: translateZ(20px);
}

.skill-card h4 {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  transform: translateZ(20px);
}

.skill-bar-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 10px;
  overflow: hidden;
  transform: translateZ(20px);
}

.skill-bar {
  height: 100%;
  background: var(--primary-color);
  border-radius: 10px;
  position: relative;
}

.skill-percentage {
  position: absolute;
  right: 5px;
  top: -20px;
  color: var(--text-color);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>