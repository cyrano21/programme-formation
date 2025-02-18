import { useState } from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { UserRole } from "@/types/global";
import { useUserRoles } from "@/hooks/useUserRoles";

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: "Administrateur système",
  coach: "Coach professionnel",
  student: "Étudiant",
  manager: "Gestionnaire",
  guest: "Invité",
};

const ASSIGNABLE_ROLES: UserRole[] = ["student", "coach", "admin", "manager"];

export default function RoleManager() {
  const { user } = useFirebaseAuth();
  const { roles, isLoading, error, assignRole, hasRole } = useUserRoles(user);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  if (isLoading) {
    return <div>Chargement des rôles...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  if (!user) {
    return <div>Veuillez vous connecter</div>;
  }

  const availableRoles = ASSIGNABLE_ROLES.filter(
    (role) => !hasRole(role as UserRole)
  ) as UserRole[];

  const handleRoleAssignment = async () => {
    if (selectedRole) {
      try {
        await assignRole(selectedRole);
        setSelectedRole(null);
      } catch (err) {
        console.error("Échec de l'assignation de rôle", err);
      }
    }
  };

  return (
    <div className="role-manager">
      <h2>Gestion des Rôles</h2>

      <div className="current-roles">
        <h3>Vos rôles actuels :</h3>
        <ul>
          {roles.map((role) => (
            <li key={role} className="role-badge">
              {ROLE_DESCRIPTIONS[role]}
            </li>
          ))}
        </ul>
      </div>

      <div className="role-assignment">
        <h3>Assigner un nouveau rôle</h3>

        {availableRoles.length > 0 ? (
          <div>
            <select
              aria-label="Sélection de rôle"
              value={selectedRole || ""}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            >
              <option value="">Sélectionnez un rôle</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {ROLE_DESCRIPTIONS[role]}
                </option>
              ))}
            </select>

            <button onClick={handleRoleAssignment} disabled={!selectedRole}>
              Assigner le rôle
            </button>
          </div>
        ) : (
          <p>Vous avez déjà tous les rôles disponibles.</p>
        )}
      </div>
    </div>
  );
}
