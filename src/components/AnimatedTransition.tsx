
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedTransitionProps {
  children: React.ReactNode;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children }) => {
  const location = useLocation();
  const prevPathRef = useRef<string>(location.pathname);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const prevPath = prevPathRef.current;
    
    if (prevPath !== location.pathname && elementRef.current) {
      // Reset the animation
      elementRef.current.style.opacity = '0';
      elementRef.current.style.transform = 'translateY(10px)';
      
      // Trigger animation after a small delay
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.style.transition = 'opacity 400ms ease, transform 400ms ease';
          elementRef.current.style.opacity = '1';
          elementRef.current.style.transform = 'translateY(0)';
        }
      }, 50);
    }
    
    prevPathRef.current = location.pathname;
  }, [location.pathname]);
  
  return (
    <div ref={elementRef} className="transition-all duration-300">
      {children}
    </div>
  );
};

export default AnimatedTransition;
