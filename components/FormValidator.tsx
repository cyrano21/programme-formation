import { useState } from 'react';
import { z } from 'zod';

// Schémas de validation Zod
const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(/[!@#$%^&*()]/, 'Le mot de passe doit contenir au moins un caractère spécial')
});

const RegistrationSchema = LoginSchema.extend({
  confirmPassword: z.string(),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
});

export default function FormValidator() {
  const [formType, setFormType] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    try {
      if (formType === 'login') {
        LoginSchema.parse(formData);
      } else {
        RegistrationSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as {[key: string]: string});
        setErrors(errorMessages);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Logique de soumission du formulaire
      console.log('Formulaire valide', formData);
    }
  };

  return (
    <div className="form-validator-container">
      <form onSubmit={handleSubmit} className="form-validator">
        <h2>{formType === 'login' ? 'Connexion' : 'Inscription'}</h2>
        
        {formType === 'register' && (
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        {formType === 'register' && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
        )}
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {formType === 'login' ? 'Se connecter' : 'S\'inscrire'}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}
          >
            {formType === 'login' ? 'Créer un compte' : 'Déjà un compte ?'}
          </button>
        </div>
      </form>
    </div>
  );
}


