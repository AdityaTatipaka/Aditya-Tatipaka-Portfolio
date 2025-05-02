<template>
    <div class="cursor-wrapper">
        <div class="cursor" ref="cursor"></div>
        <div class="cursor-follower" ref="follower"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

export default defineComponent({
    name: 'CustomCursor',
    setup() {
        const cursor = ref<HTMLElement | null>(null);
        const follower = ref<HTMLElement | null>(null);
        let mouseX = 0;
        let mouseY = 0;
        let posX = 0;
        let posY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Move main cursor immediately
            if (cursor.value) {
                gsap.to(cursor.value, {
                    x: mouseX,
                    y: mouseY,
                    duration: 0,
                });
            }
        };

        const loop = () => {
            // Smooth follow effect for follower
            if (follower.value) {
                posX += (mouseX - posX) * 0.1;
                posY += (mouseY - posY) * 0.1;

                gsap.to(follower.value, {
                    x: posX,
                    y: posY,
                    duration: 0,
                });
            }
            requestAnimationFrame(loop);
        };

        const addCursorModifiers = () => {
            const elements = document.querySelectorAll('a, button, .project-card, .skill-card, .nav-link');

            elements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    if (cursor.value && follower.value) {
                        cursor.value.classList.add('active');
                        follower.value.classList.add('active');
                    }
                });

                el.addEventListener('mouseleave', () => {
                    if (cursor.value && follower.value) {
                        cursor.value.classList.remove('active');
                        follower.value.classList.remove('active');
                    }
                });
            });
        };

        onMounted(() => {
            document.addEventListener('mousemove', onMouseMove);
            loop();
            addCursorModifiers();
        });

        onUnmounted(() => {
            document.removeEventListener('mousemove', onMouseMove);
        });

        return {
            cursor,
            follower
        };
    }
});
</script>

<style scoped>
.cursor-wrapper {
    pointer-events: none;
}

.cursor,
.cursor-follower {
    position: fixed;
    top: -8px;
    left: -8px;
    z-index: 10000;
    pointer-events: none;
    border-radius: 50%;
    opacity: 1;
    transition: opacity 0.3s ease;
}

.cursor {
    width: 8px;
    height: 8px;
    background-color: var(--primary-color);
}

.cursor-follower {
    width: 40px;
    height: 40px;
    background-color: rgba(33, 150, 243, 0.1);
    border: 1px solid var(--primary-color);
    transition: transform 0.2s ease;
}

.cursor.active {
    transform: scale(1.5);
}

.cursor-follower.active {
    transform: scale(1.8);
    background-color: rgba(33, 150, 243, 0.05);
}

@media (max-width: 768px) {

    .cursor,
    .cursor-follower {
        display: none;
    }
}
</style>