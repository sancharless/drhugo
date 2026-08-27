import { useEffect, useRef, useState } from 'react';

/**
 * Hook que anima um número de 0 até o valor alvo quando o elemento entra no viewport.
 * Usa easing quadrático para uma animação suave e elegante.
 */
export const useCountUp = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutQuart para desacelerar elegantemente no final
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * (target - startValue) + startValue));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return { count, ref };
};
