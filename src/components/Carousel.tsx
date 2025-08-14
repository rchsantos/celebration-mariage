'use client';

import React from 'react';
import Image from 'next/image';

export default function Carousel() {
  const media = React.useMemo(
    () => [
      "/couple1.jpg",
      "/couple2.jpg",
      "/couple3.jpg",
      "/couple4.jpg",
      "/couple5.jpg",
      "/couple6.jpg",
      "/couple7.jpg",
      "/couple8.jpg",
      "/couple9.jpg",
      "/couple10.jpg",
      "/couple11.jpg",
      "/couple12.jpg",
      "/couple13.jpg",
      "/couple14.jpg",
      "/reel1.mp4",
      "/couple15.jpg",
    ],
    []
  );

  const [index, setIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const STORY_DURATION = 3000; // 3 secondes par story

  // Timer pour la progression en temps réel
  React.useEffect(() => {
    if (isPaused) return;

    // Pour les vidéos, on ne gère pas la progression automatique
    if (media[index].endsWith('.mp4')) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / STORY_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setIndex((i) => (i + 1) % media.length);
        setProgress(0);
      }
    }, 50); // Mise à jour toutes les 50ms pour une animation fluide

    return () => clearInterval(interval);
  }, [index, isPaused, media]);

  // Reset progress quand l'index change
  React.useEffect(() => {
    setProgress(0);
  }, [index]);

  const prev = () => {
    setIndex((i) => (i === 0 ? media.length - 1 : i - 1));
    setProgress(0);
  };

  const next = () => {
    setIndex((i) => (i + 1) % media.length);
    setProgress(0);
  };

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  const handleTap = (side: 'left' | 'right') => {
    if (side === 'left') prev();
    else next();
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Barres de progression */}
      <div className="flex gap-2 w-full max-w-md mx-auto mb-4">
        {media.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full bg-gray-300/60 overflow-hidden border border-gray-400/40 shadow-sm"
          >
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={i === index ? progress : i < index ? 100 : 0}
              className={`h-full transition-all duration-300 ease-out rounded-full ${
                i < index
                  ? 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-md progress-completed'
                  : i === index
                    ? media[i].endsWith('.mp4')
                      ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-md animate-pulse'
                      : 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-md'
                    : 'bg-gray-400/30'
              }`}
              style={
                i === index
                  ? { width: media[i].endsWith('.mp4') ? '100%' : `${progress}%` }
                  : { width: i < index ? '100%' : '0%' }
              }
            />
          </div>
        ))}
      </div>

      {/* Container stories vertical iPhone */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
        <div
          className="relative w-full aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          {media[index].endsWith('.mp4') ? (
            <video
              src={media[index]}
              controls
              autoPlay
              muted
              className="object-cover w-full h-full"
              onEnded={() => {
                setIndex((i) => (i + 1) % media.length);
                setProgress(0);
              }}
              onError={() => {
                // En cas d'erreur vidéo, passer à la suivante après 2 secondes
                setTimeout(() => {
                  setIndex((i) => (i + 1) % media.length);
                  setProgress(0);
                }, 2000);
              }}
            />
          ) : (
            <Image src={media[index]} alt={`Souvenir ${index+1}`} fill className="object-cover transition-all duration-500" />
          )}

          {/* Zones de tap pour navigation */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
            onClick={() => handleTap('left')}
          />
          <div
            className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
            onClick={() => handleTap('right')}
          />

          {/* Indicateur de pause */}
          {isPaused && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              ⏸️ Pause
            </div>
          )}

          {/* Boutons de navigation (optionnels) */}
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow text-gray-700 opacity-0 hover:opacity-100 transition-opacity">
            &#8592;
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow text-gray-700 opacity-0 hover:opacity-100 transition-opacity">
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

