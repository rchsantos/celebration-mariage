'use client';

import React, { useState } from 'react';
import { addRSVP, isDateLimiteDepassee } from '@/lib/firebase/db';

interface RSVPFormData {
  nom: string;
  email: string;
  nombrePersonnes: number;
  message: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPFormData>({
    nom: '',
    email: '',
    nombrePersonnes: 1,
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Vérifier si la date limite est dépassée
  const dateLimiteDepassee = isDateLimiteDepassee();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'nombrePersonnes' ? parseInt(value) || 1 : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (dateLimiteDepassee) {
      setErrorMessage('La date limite pour les RSVP est dépassée (1er octobre 2025)');
      return;
    }
    
    if (!formData.nom.trim() || !formData.email.trim()) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      await addRSVP(formData);
      setSubmitStatus('success');
      setFormData({
        nom: '',
        email: '',
        nombrePersonnes: 1,
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
      setErrorMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (dateLimiteDepassee) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-lg mx-auto text-center">
        <div className="text-yellow-800 text-lg font-semibold mb-2">
          ⏰ Date limite dépassée
        </div>
        <p className="text-yellow-700">
          La date limite pour confirmer votre présence était le 1er octobre 2025. 
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
        <button
          onClick={() => setSubmitStatus('idle')}
          className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition-colors"
        >
          Envoyer un autre RSVP
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 max-w-lg mx-auto">
      {/* Compteur de jours restants */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
        <div className="text-blue-800 font-semibold">
          ⏰ Jours restants pour confirmer votre présence
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {Math.max(0, Math.ceil((new Date('2025-10-01').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
        </div>
        <div className="text-blue-700 text-sm">jours</div>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* Nom */}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet *
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Votre nom complet"
          />
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="votre.email@exemple.com"
          />
        </div>
        
        {/* Nombre de personnes */}
        <div>
          <label htmlFor="nombrePersonnes" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de personnes *
          </label>
          <select
            id="nombrePersonnes"
            name="nombrePersonnes"
            value={formData.nombrePersonnes}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'personne' : 'personnes'}
              </option>
            ))}
          </select>
        </div>
        
        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (optionnel)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Un petit mot, une question ou une demande spéciale ?"
          />
        </div>
        
        {/* Message d'erreur */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}
        
        {/* Bouton d'envoi */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
