<!-- ScrollToTop.vue -->
<template>
    <button class="scroll-to-top" :class="{ 'visible': isVisible }" @click="scrollToTop" aria-label="Scroll to top">
        <i class="fas fa-chevron-up"></i>
    </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

export default defineComponent({
    name: 'ScrollToTop',
    setup() {
        const isVisible = ref(false);

        const checkScroll = () => {
            isVisible.value = window.scrollY > 500;
        };

        const scrollToTop = () => {
            gsap.to(window, {
                duration: 1,
                scrollTo: 0,
                ease: 'power3.inOut'
            });
        };

        onMounted(() => {
            window.addEventListener('scroll', checkScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', checkScroll);
        });

        return {
            isVisible,
            scrollToTop
        };
    }
});
</script>

<style scoped>
.scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--primary-color);
    color: white;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 1000;
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.scroll-to-top:hover {
    background: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
}

.scroll-to-top i {
    transition: transform 0.3s ease;
}

.scroll-to-top:hover i {
    transform: translateY(-2px);
}
</style>