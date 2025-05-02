import { ref } from "vue";
import gsap from "gsap";

export function usePageTransition() {
  const isTransitioning = ref(false);

  const transitionIn = (el: Element) => {
    isTransitioning.value = true;
    return new Promise<void>((resolve) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            isTransitioning.value = false;
            resolve();
          },
        }
      );
    });
  };

  const transitionOut = (el: Element) => {
    isTransitioning.value = true;
    return new Promise<void>((resolve) => {
      gsap.to(el, {
        opacity: 0,
        y: -50,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          resolve();
        },
      });
    });
  };

  return {
    isTransitioning,
    transitionIn,
    transitionOut,
  };
}
