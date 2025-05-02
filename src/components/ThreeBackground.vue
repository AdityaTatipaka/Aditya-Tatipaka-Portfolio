<!-- ThreeBackground.vue -->
<template>
    <div ref="container" class="three-background"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default defineComponent({
    name: 'ThreeBackground',
    setup() {
        const container = ref<HTMLElement | null>(null);
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let renderer: THREE.WebGLRenderer;
        let particles: THREE.Points;
        let animationFrameId: number;

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

            if (container.value) {
                renderer.setSize(window.innerWidth, window.innerHeight);
                container.value.appendChild(renderer.domElement);
            }

            // Create particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 5000;
            const posArray = new Float32Array(particlesCount * 3);

            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 5;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.005,
                color: '#2196f3',
            });

            particles = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particles);

            camera.position.z = 2;

            // Animate on scroll
            window.addEventListener('scroll', onScroll);
        };

        const onScroll = () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            if (particles) {
                gsap.to(particles.rotation, {
                    y: scrollPercent * Math.PI * 2,
                    duration: 0.5
                });
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (particles) {
                particles.rotation.x += 0.0001;
                particles.rotation.y += 0.0002;
            }
            renderer.render(scene, camera);
        };

        const handleResize = () => {
            if (container.value) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        onMounted(() => {
            init();
            animate();
            window.addEventListener('resize', handleResize);
        });

        onBeforeUnmount(() => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', onScroll);
            if (container.value) {
                container.value.removeChild(renderer.domElement);
            }
        });

        return {
            container
        };
    }
});
</script>

<style scoped>
.three-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
}
</style>