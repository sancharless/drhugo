import { useEffect } from 'react';

/**
 * Hook premium de Scroll Reveal.
 * Observa todos os elementos com as classes .reveal, .reveal-left ou .reveal-right
 * e adiciona a classe .visible quando eles entram no viewport.
 * Usa IntersectionObserver para máxima performance (sem scroll listener).
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right';
    const elements = document.querySelectorAll<HTMLElement>(selectors);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Uma vez visível, para de observar (animação acontece uma vez)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Começa a animar quando 10% do elemento é visível
        threshold: 0.1,
        // Margem negativa: começa um pouco antes do elemento chegar ao viewport
        rootMargin: '0px 0px -60px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};
