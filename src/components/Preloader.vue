<template>
    <div class="preloader" :class="{ 'fade-out': isLoaded }">
        <div class="loader">
            <svg viewBox="0 0 100 100">
                <g class="points">
                    <circle class="circ1" cx="50" cy="50" r="40" />
                    <circle class="circ2" cx="50" cy="50" r="40" />
                </g>
            </svg>
            <div class="loading-text">Loading</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { gsap } from 'gsap';

export default defineComponent({
    name: 'Preloader',
    setup(_, { emit }) {
        const isLoaded = ref(false);

        onMounted(() => {
            // Animate the loader
            const tl = gsap.timeline();

            tl.to('.circ1', {
                duration: 1.5,
                rotation: 360,
                transformOrigin: '50% 50%',
                repeat: -1,
                ease: 'none'
            })
                .to('.circ2', {
                    duration: 2,
                    rotation: -360,
                    transformOrigin: '50% 50%',
                    repeat: -1,
                    ease: 'none'
                }, 0);

            // Simulate loading time (you can adjust this based on actual content loading)
            setTimeout(() => {
                isLoaded.value = true;
                emit('loaded');
            }, 2000);
        });

        return {
            isLoaded
        };
    }
});
</script>

<style scoped>
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: var(--background-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, visibility 0.5s ease;
}

.preloader.fade-out {
    opacity: 0;
    visibility: hidden;
}

.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.loader svg {
    width: 100px;
    height: 100px;
}

.points circle {
    fill: none;
    stroke: var(--primary-color);
    stroke-width: 2;
    stroke-dasharray: 1, 80;
    stroke-dashoffset: 0;
    stroke-linecap: round;
}

.circ2 {
    stroke: var(--secondary-color);
    stroke-dasharray: 1, 30;
}

.loading-text {
    color: var(--text-color);
    font-size: 1.2rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }

    100% {
        opacity: 1;
    }
}
</style>