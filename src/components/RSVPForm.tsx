'use client';

import React, { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addRSVP, isDateLimiteDepassee } from '@/lib/firebase';
import { RSVP_DEADLINE } from '@/lib/firebase/config';

const rsvpSchema = z.object({
  nom: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  nombrePersonnes: z.coerce.number().int().min(1).max(6),
  message: z.string().optional()
});

export type RSVPFormData = z.infer<typeof rsvpSchema>;

export default function RSVPForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      nom: '',
      email: '',
      nombrePersonnes: 1,
      message: ''
    }
  });

  const dateLimiteDepassee = isDateLimiteDepassee();

  const onSubmit = (data: RSVPFormData) => {
    if (dateLimiteDepassee) {
      setErrorMessage(`La date limite pour les RSVP est dépassée (${new Date(RSVP_DEADLINE).toLocaleDateString('fr-FR')})`);
      return;
    }

    setErrorMessage('');
    startTransition(() => {
      addRSVP(data)
        .then(() => {
          setSubmitStatus('success');
          reset();
        })
        .catch(() => {
          setSubmitStatus('error');
          setErrorMessage("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        });
    });
  };

  if (dateLimiteDepassee) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-lg mx-auto text-center">
        <div className="text-yellow-800 text-lg font-semibold mb-2">
          ⏰ Date limite dépassée
        </div>
        <p className="text-yellow-700">
          La date limite pour confirmer votre présence était le {new Date(RSVP_DEADLINE).toLocaleDateString('fr-FR')}.
          Merci de nous contacter directement pour toute question.
        </p>
      </div>
    );
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 max-w-lg mx-auto text-center">
        <div className="text-green-800 text-lg font-semibold mb-2">
          ✅ Merci pour votre confirmation !
        </div>
        <p className="text-green-700 mb-4">
          Nous avons bien reçu votre RSVP et nous réjouissons de vous accueillir !
        </p>
        <Button onClick={() => setSubmitStatus('idle')}>
          Envoyer un autre RSVP
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow p-8 max-w-lg mx-auto">
      {/* Compteur de jours restants */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
        <div className="text-blue-800 font-semibold">
          ⏰ Jours restants pour confirmer votre présence
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {Math.max(0, Math.ceil((new Date(RSVP_DEADLINE).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
        </div>
        <div className="text-blue-700 text-sm">jours</div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Nom */}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet *
          </label>
          <Controller
            name="nom"
            control={control}
            render={({ field }) => (
              <Input id="nom" placeholder="Votre nom complet" aria-invalid={!!errors.nom} {...field} />
            )}
          />
          {errors.nom && (
            <p className="text-red-600 text-sm mt-1">{errors.nom.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input type="email" id="email" placeholder="votre.email@exemple.com" aria-invalid={!!errors.email} {...field} />
            )}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Nombre de personnes */}
        <div>
          <label htmlFor="nombrePersonnes" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de personnes *
          </label>
          <Controller
            name="nombrePersonnes"
            control={control}
            render={({ field }) => (
              <select
                id="nombrePersonnes"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'personne' : 'personnes'}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.nombrePersonnes && (
            <p className="text-red-600 text-sm mt-1">{errors.nombrePersonnes.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (optionnel)
          </label>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea id="message" rows={3} placeholder="Un petit mot, une question ou une demande spéciale ?" {...field} />
            )}
          />
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Message d'erreur */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Bouton d'envoi */}
        <Button type="submit" disabled={isPending} className="w-full py-3 px-4 font-semibold">
          {isPending ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </span>
          ) : (
            'Confirmer ma présence'
          )}
        </Button>
      </div>

      {/* Note importante */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>* Champs obligatoires</p>
        <p className="mt-1">
          <strong>Date limite : {new Date(RSVP_DEADLINE).toLocaleDateString('fr-FR')}</strong>
        </p>
      </div>
    </form>
  );
}

