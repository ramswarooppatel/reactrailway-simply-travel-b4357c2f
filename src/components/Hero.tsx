
import { useState, useEffect } from 'react';
import SearchWidget from './SearchWidget';

const backgroundImages = [
  'https://images.unsplash.com/photo-1565942444420-b0b54b5abec3?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584122388444-c425e52aabd5?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517861227033-13d6c9fb2bf5?q=80&w=2000&auto=format&fit=crop'
];

const taglines = [
  { heading: "Journey Across India", subheading: "Book your train tickets with ease" },
  { heading: "Travel Smart", subheading: "Discover the most convenient routes" },
  { heading: "Explore New Destinations", subheading: "Your adventure begins with a train journey" }
];

const Hero = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextImageLoaded, setNextImageLoaded] = useState(false);
  const [nextImage, setNextImage] = useState(1);

  useEffect(() => {
    // Pre-load initial image
    const img = new Image();
    img.src = backgroundImages[0];
    img.onload = () => setIsLoaded(true);

    // Pre-load next image
    const nextImg = new Image();
    nextImg.src = backgroundImages[1];
    nextImg.onload = () => setNextImageLoaded(true);

    const interval = setInterval(() => {
      setCurrentBackground((prev) => {
        const next = (prev + 1) % backgroundImages.length;
        
        // Preload the next image after this one
        const nextNextIndex = (next + 1) % backgroundImages.length;
        setNextImage(nextNextIndex);
        
        const preloadNext = new Image();
        preloadNext.src = backgroundImages[nextNextIndex];
        preloadNext.onload = () => setNextImageLoaded(true);
        
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with transition */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentBackground === index && isLoaded ? 1 : 0,
            }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto mt-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="bg-white/10 inline-block px-4 py-1 rounded-full backdrop-blur-sm mb-4">
            <span className="text-white/90 text-sm font-medium">The Smart Way to Book Train Tickets</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            {taglines[currentBackground].heading}
          </h1>
          <p className="text-xl text-white/80">
            {taglines[currentBackground].subheading}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <SearchWidget />
        </div>
      </div>
    </section>
  );
};

export default Hero;
