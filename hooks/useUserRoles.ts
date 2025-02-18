import { useState, useEffect } from 'react';
import { FirebaseUser } from '@/types/firebase';
import { UserRole } from '@/types/global';

// Interface pour la gestion des rôles
interface UserRoleManagement {
  user: FirebaseUser | null;
  roles: UserRole[];
  isLoading: boolean;
  error: Error | null;
  assignRole: (role: UserRole) => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

export function useUserRoles(firebaseUser: FirebaseUser | null): UserRoleManagement {
  const [roles, setRoles] = useState<UserRole[]>(['guest']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUserRoles() {
      if (!firebaseUser) {
        setRoles(['guest']);
        setIsLoading(false);
        return;
      }

      try {
        // Vérifier que Firebase est chargé côté client
        if (typeof window !== 'undefined' && window.firebase) {
          const firestore = window.firebase.firestore();
          
          // Récupérer les rôles depuis Firestore
          const userDoc = await firestore
            .collection('users')
            .doc(firebaseUser.uid)
            .get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            const userRoles = userData?.roles || ['guest'];
            
            // Filtrer et valider les rôles
            const validRoles = userRoles.filter((role: string): role is UserRole => 
              ['admin', 'coach', 'student', 'manager', 'guest'].includes(role)
            );

            setRoles(validRoles);
          } else {
            // Créer un document utilisateur par défaut
            await firestore
              .collection('users')
              .doc(firebaseUser.uid)
              .set({
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                roles: ['guest']
              });

            setRoles(['guest']);
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des rôles', err);
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
        setIsLoading(false);
        setRoles(['guest']);
      }
    }

    fetchUserRoles();
  }, [firebaseUser]);

  const assignRole = async (role: UserRole) => {
    if (!firebaseUser) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      if (typeof window !== 'undefined' && window.firebase) {
        const firestore = window.firebase.firestore();
        const userRef = firestore.collection('users').doc(firebaseUser.uid);

        // Récupérer les rôles actuels
        const userDoc = await userRef.get();
        const currentRoles = userDoc.exists 
          ? (userDoc.data()?.roles || []) 
          : [];

        // Ajouter le nouveau rôle s'il n'existe pas déjà
        const updatedRoles = currentRoles.includes(role) 
          ? currentRoles 
          : [...currentRoles, role];

        // Mettre à jour le document utilisateur
        await userRef.update({ roles: updatedRoles });

        // Mettre à jour l'état local des rôles
        setRoles(updatedRoles);
      }
    } catch (err) {
      console.error('Erreur lors de l\'assignation de rôle', err);
      throw err;
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return roles.includes(role);
  };

  return {
    user: firebaseUser,
    roles,
    isLoading,
    error,
    assignRole,
    hasRole
  };
}
