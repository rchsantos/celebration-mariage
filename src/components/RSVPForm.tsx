'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { addRSVP, isDateLimiteDepassee } from '@/lib/firebase/db';

interface RSVPFormData {
  nom: string;
  email: string;
  nombrePersonnes: number;
  message: string;
}

export default function RSVPForm() {
  const {
    register,
    handleSubmit,
    formState,
    setError,
    reset,
  } = useForm<RSVPFormData>({
    defaultValues: {
      nom: '',
      email: '',
      nombrePersonnes: 1,
      message: '',
    },
  });

  // Vérifier si la date limite est dépassée
  const dateLimiteDepassee = isDateLimiteDepassee();

  const onSubmit = async (data: RSVPFormData) => {
    if (dateLimiteDepassee) {
      setError('root', {
        type: 'manual',
        message: 'La date limite pour les RSVP est dépassée (1er octobre 2025)',
      });
      return;
    }

    try {
      await addRSVP(data);
      reset(
        { nom: '', email: '', nombrePersonnes: 1, message: '' },
        { keepIsSubmitted: true },
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setError('root', {
        type: 'server',
        message:
          "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
      });
    }
  };

  if (dateLimiteDepassee) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-lg mx-auto text-center">
        <div className="text-yellow-800 text-lg font-semibold mb-2">
          ⏰ Date limite dépassée
        </div>
        <p className="text-yellow-700">
          La date limite pour confirmer votre présence était le 1er octobre
          2025. Merci de nous contacter directement pour toute question.
        </p>
      </div>
    );
  }

  if (formState.isSubmitSuccessful) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 max-w-lg mx-auto text-center">
        <div className="text-green-800 text-lg font-semibold mb-2">
          ✅ Merci pour votre confirmation !
        </div>
        <p className="text-green-700 mb-4">
          Nous avons bien reçu votre RSVP et nous réjouissons de vous accueillir !
        </p>
        <button
          onClick={() => reset()}
          className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition-colors"
        >
          Envoyer un autre RSVP
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow p-8 max-w-lg mx-auto"
    >
      {/* Compteur de jours restants */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
        <div className="text-blue-800 font-semibold">
          ⏰ Jours restants pour confirmer votre présence
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {Math.max(
            0,
            Math.ceil(
              (new Date('2025-10-01').getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24),
            ),
          )}
        </div>
        <div className="text-blue-700 text-sm">jours</div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Nom */}
        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom complet *
          </label>
          <input
            type="text"
            id="nom"
            {...register('nom', { required: true })}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Votre nom complet"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="votre.email@exemple.com"
          />
        </div>

        {/* Nombre de personnes */}
        <div>
          <label
            htmlFor="nombrePersonnes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre de personnes *
          </label>
          <select
            id="nombrePersonnes"
            {...register('nombrePersonnes', { valueAsNumber: true, required: true })}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'personne' : 'personnes'}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message (optionnel)
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Un petit mot, une question ou une demande spéciale ?"
          />
        </div>

        {/* Message d'erreur */}
        {formState.errors.root && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {formState.errors.root.message}
          </div>
        )}

        {/* Bouton d'envoi */}
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
            formState.isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800'
          }`}
        >
          {formState.isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Envoi en cours...
            </span>
          ) : (
            'Confirmer ma présence'
          )}
        </button>
      </div>

      {/* Note importante */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>* Champs obligatoires</p>
        <p className="mt-1">
          <strong>Date limite : 1er octobre 2025</strong>
        </p>
      </div>
    </form>
  );
}

