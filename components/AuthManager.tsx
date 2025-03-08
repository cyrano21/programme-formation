import { useState } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import Image from 'next/image';

export default function AuthManager() {
  const {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail: signInWithEmailPassword,
    logout: signOut,
    createAccount: createUserWithEmailPassword,
  } = useFirebaseAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      await createUserWithEmailPassword(email, password);
    } else {
      await signInWithEmailPassword(email, password);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  if (user) {
    return (
      <div className="auth-container">
        <div className="user-info">
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={40}
              height={40}
              className="profile-image"
            />
          )}
          <div>
            <p>Connecté en tant que : {user.displayName || user.email}</p>
            <p>Email : {user.email}</p>
            <p>Vérifié : {user.emailVerified ? 'Oui' : 'Non'}</p>
          </div>
        </div>
        <div className="auth-actions">
          <button type="button" onClick={signOut} className="btn btn-danger">
            Déconnexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isSignUp ? 'Inscription' : 'Connexion'}</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isSignUp ? "S'inscrire" : 'Se connecter'}
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="btn btn-secondary"
          >
            {isSignUp
              ? 'Déjà un compte ? Se connecter'
              : "Pas de compte ? S'inscrire"}
          </button>

          <button
            type="button"
            onClick={signInWithGoogle}
            className="btn btn-google"
          >
            Continuer avec Google
          </button>
        </div>
      </form>
    </div>
  );
}
