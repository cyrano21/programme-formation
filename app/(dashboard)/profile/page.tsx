"use client";

import React from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

export default function ProfilePage() {
  const [{ user, loading }, { logout }] = useFirebaseAuth();

  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Veuillez vous connecter</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      <div className="space-y-2">
        <p><strong>Nom :</strong> {user.displayName || 'Non renseigné'}</p>
        <p><strong>Email :</strong> {user.email}</p>
      </div>
      <button 
        onClick={logout} 
        className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Déconnexion
      </button>
    </div>
  );
}
