"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";
import Carousel from "@/components/Carousel";
import RSVPForm from "@/components/RSVPForm";

function Section({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`relative w-full max-w-5xl mx-auto py-12 px-4 ${className}`}>
      {/* Décorations florales animées */}
      <Image
        src="/flower.svg"
        alt=""
        width={80}
        height={80}
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 -left-6 opacity-70 animate-float-slow"
      />
      <Image
        src="/flower.svg"
        alt=""
        width={80}
        height={80}
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-6 -right-6 opacity-70 animate-float-slow"
      />
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
  const [isPaused, setIsPaused] = useState(false);

  const handleCarouselKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      setIsPaused((prev) => !prev);
    }
  };

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
        <div
          tabIndex={0}
          onKeyDown={handleCarouselKeyDown}
          className="flex flex-col items-center"
        >
          <Carousel isPaused={isPaused} setIsPaused={setIsPaused} />
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            aria-pressed={isPaused}
            aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
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

