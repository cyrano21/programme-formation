import React, { useState } from 'react';
import { Icons } from '@/utils/icons';
import { Button } from '@/components/ui/button';
import { getOwnerInfo } from '@/types/global';

type SupportContactProps = {
  onClose: () => void;
}

export default function SupportContact({ onClose }: SupportContactProps) {
  const { email } = getOwnerInfo();
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulation d'envoi de message
      // Dans un vrai projet, utiliseriez une API réelle
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSent(true);
      setMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message', error);
    }
  };

  return (
    <div className="support-contact-container">
      <div className="contact-header">
        <h2>Support et Contact</h2>
        <button 
          type="button" 
          onClick={onClose} 
          className="close-modal-btn"
          aria-label="Fermer"
        >
          <Icons.X />
        </button>
      </div>

      <div className="contact-info">
        <p>
          <Icons.Mail className="icon" />
          <strong>Email :</strong> 
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <h3>Envoyez-nous un message</h3>
        
        {isSent && (
          <div className="success-message">
            Votre message a été envoyé avec succès !
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="support-message">Votre message</label>
          <textarea 
            id="support-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décrivez votre problème ou votre question"
            required
            rows={4}
          />
        </div>

        <div className="form-actions">
          <Button 
            type="submit" 
            disabled={isSent}
            variant="coachverse"
          >
            {isSent ? 'Message envoyé' : 'Envoyer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
