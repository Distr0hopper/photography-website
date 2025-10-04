import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/components/routes";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const heroImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2942&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop",
  ];

  const [activeImage, setActiveImage] = useState(0);

  function getNewIndex(currentIndex: number) {
    return currentIndex >= heroImages.length ? 0 : currentIndex;
  }

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(getNewIndex(activeImage + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [activeImage]); // If activeImage changes, re-run the effect!

  return (
    <div className="relative overflow-hidden h-screen">
      {/* Background Images with AnimatePresence */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeImage}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={heroImages[activeImage]}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay - covers entire viewport */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Capturing the World
          <br />
          One Journey at a Time
        </h1>
        <p className="flex items-center justify-center text-center py-4 pl-20 text-neutral-200 text-lg md:text-xl max-w-2xl">
          See the advantures through my lens!
        </p>
        <div className="flex justify-center items-center">
          <Button className="py-5 px-5 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white text-center rounded-full hover:bg-emerald-300/20">
            <Link to={AppRoutes.BackgroundsPage}>Explore Pictures → </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
