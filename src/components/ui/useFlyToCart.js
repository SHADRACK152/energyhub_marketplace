import React, { useRef, useCallback } from 'react';

export function useFlyToCart() {
  const flyRef = useRef();

  // Call this with the image src, start position, and end position
  const fly = useCallback((imgSrc, startRect, endRect, onEnd) => {
    if (!flyRef.current) return;
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.position = 'fixed';
    img.style.zIndex = 9999;
    img.style.width = startRect.width + 'px';
    img.style.height = startRect.height + 'px';
    img.style.left = startRect.left + 'px';
    img.style.top = startRect.top + 'px';
    img.style.borderRadius = '12px';
    img.style.transition = 'all 0.8s cubic-bezier(.4,2,.6,1)';
    document.body.appendChild(img);

    requestAnimationFrame(() => {
      img.style.left = endRect.left + 'px';
      img.style.top = endRect.top + 'px';
      img.style.width = endRect.width + 'px';
      img.style.height = endRect.height + 'px';
      img.style.opacity = 0.5;
    });

    img.addEventListener('transitionend', () => {
      img.remove();
      if (onEnd) onEnd();
    }, { once: true });
  }, []);

  return { flyRef, fly };
}
