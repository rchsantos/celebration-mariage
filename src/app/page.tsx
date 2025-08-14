"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";
import RSVPForm from "@/components/RSVPForm";

function Section({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`w-full max-w-5xl mx-auto py-12 px-4 ${className}`}>
      {children}
    </section>
  );
}

function getCountdown() {
  const weddingDate = new Date("2025-10-11T10:00:00+02:00").getTime();
  const now = new Date().getTime();
  const diff = weddingDate - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Home() {
  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-[#f8f6f2]">
      {/* HERO avec image de fond, titre, compte à rebours */}
      <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('/couple.jpg')"}}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center text-white text-center">
          <h2 className="text-lg tracking-widest mb-2">SAVE THE DATE</h2>
          <h1 className="text-8xl sm:text-8xl font-bold font-serif mb-2">Camila & Richardson</h1>
          <div className="text-5xl mb-2">11 octobre 2025</div>
          {countdown ? (
            <div className="flex gap-4 text-2xl font-mono justify-center">
              <span>{countdown.days} jours</span>
            </div>
          ) : (
            <div className="text-2xl font-semibold mt-4">C&apos;est le grand jour !</div>
          )}
        </div>
        {/* Icône souris animé pour scroller */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-7 h-12 border-2 border-white rounded-full flex items-start justify-center relative">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
          </div>
          <span className="text-xs text-white mt-2 opacity-80">Scroll</span>
        </div>
      </div>

      {/* SECTION PROGRAMME (cartes) */}
      <Section>
        {/* À compléter : 3 cartes pour le programme */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Programme</h2>
          <p className="text-lg text-gray-600">Découvrez le déroulement de la journée</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center place-items-center">
          {/* Cartes à remplir */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-xl font-bold mb-2">Pré-soirée</div>
            <div className="text-gray-500">Vendredi 10 octobre 2025</div>
            <div className="mt-2 text-gray-700 text-sm">Soirée conviviale pour lancer le week-end !</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-xl font-bold mb-2">Cérémonie</div>
            <div className="text-gray-500">Samedi 11 octobre 2025</div>
            <div className="mt-2 text-gray-700 text-sm">La cérémonie officielle et l&apos;échange des vœux.</div>
          </div>
        </div>
      </Section>

      {/* SECTION PRÉSENTATION DU COUPLE */}
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Bien sûr, vous nous connaissez déjà...</h2>
            <p className="text-lg text-gray-600">Mais voici comment nous nous voyons l&apos;un l&apos;autre !</p>
        </div>
        <div className="flex flex-col gap-8">
          {/* Camila */}
          <div className="flex flex-col md:flex-row items-stretch gap-8 h-64">
            <div className="relative w-full md:w-1/3 h-64">
              <Image src="/couple.jpg" alt="La mariée" fill className="rounded-xl object-cover" />
            </div>
            <div className="flex-1 flex items-center justify-center text-center md:text-left">
              <div>
                <div className="font-bold text-xl mb-2">Camila</div>
                <div className="text-gray-600 text-base max-w-xl">Toujours souriante, passionnée de voyages et de cuisine. Elle adore organiser des surprises et partager des moments avec ses proches.</div>
              </div>
            </div>
          </div>
          {/* Richardson */}
          <div className="flex flex-col md:flex-row-reverse items-stretch gap-8 h-64">
            <div className="relative w-full md:w-1/3 h-64">
              <Image src="/couple.jpg" alt="Le marié" fill className="rounded-xl object-cover" />
            </div>
            <div className="flex-1 flex items-center justify-center text-center md:text-right">
              <div>
                <div className="font-bold text-xl mb-2">Richardson</div>
                <div className="text-gray-600 text-base max-w-xl">Épicurien, amateur de musique et de sport. Toujours prêt à faire rire et à vivre de nouvelles aventures.</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION CARROUSEL */}
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Galerie de souvenirs</h2>
          <p className="text-lg text-gray-600">Quelques moments précieux</p>
        </div>
        <Carousel />
      </Section>

      {/* SECTION RSVP (formulaire) */}
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">RSVP avant le 1er octobre 2025</h2>
          <p className="text-lg text-gray-600">Merci de confirmer ta présence !</p>
        </div>
        <RSVPForm />
      </Section>

      {/* SECTION FAQ */}
      <Section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Questions fréquentes</h2>
          <p className="text-lg text-gray-600">Vous ne voulez pas manquer ces infos !</p>
        </div>
        {/* FAQ à compléter plus tard */}
        <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
          <details className="mb-2">
            <summary className="font-bold cursor-pointer">Où a lieu la cérémonie ?</summary>
              <div className="text-gray-600 text-sm mt-1">La cérémonie aura lieu à l&apos;état civil de la ville de Genève, Rue de la Mairie 37, 1207 Genève. Le bâtiment est facilement accessible par les transports publics et des parkings publics sont disponibles tout autour du bâtiment.</div>
          </details>
          <details className="mb-2">
            <summary className="font-bold cursor-pointer">Puis-je vous faire un cadeau ou une contribution ?</summary>
            <div className="text-gray-600 text-sm mt-1">Ta présence est le plus beau des cadeaux ! Mais si vous souhaitez nous faire un geste, Tu peux nous contacter pour les détails.</div>
          </details>
          <details className="mb-2">
            <summary className="font-bold cursor-pointer">Puis-je prendre des photos&nbsp;?</summary>
              <div className="text-gray-600 text-sm mt-1">Bien sûr, n&apos;hésitez pas à prendre des photos pour immortaliser cette journée ! Nous vous serions reconnaissants de partager vos plus beaux clichés avec nous après l&apos;événement.</div>
          </details>
          {/* Ajouter d'autres questions ici */}
        </div>
      </Section>
    </main>
  );
}

// Carrousel type Stories Instagram (à placer en bas du fichier)
  function Carousel() {
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
          <div key={i} className="flex-1 h-1 rounded-full bg-gray-300/60 overflow-hidden border border-gray-400/40 shadow-sm">
            <div
              className={`h-full transition-all duration-300 ease-out rounded-full ${
                i < index 
                  ? 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-md progress-completed' 
                  : i === index 
                    ? media[i].endsWith('.mp4') 
                      ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-md animate-pulse' 
                      : 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-md'
                    : 'bg-gray-400/30'
              }`}
              style={i === index ? { width: media[i].endsWith('.mp4') ? '100%' : `${progress}%` } : { width: i < index ? '100%' : '0%' }}
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
