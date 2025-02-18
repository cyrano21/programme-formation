"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import Loading from "@/components/ui/loading"; // Mise à jour du chemin d'import

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function ProtectedRoute({
  children,
  requiredRoles = [],
}: ProtectedRouteProps) {
  const { user, loading, getUserRoles } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        if (!user) {
          router.push("/auth/login");
        } else if (requiredRoles.length > 0) {
          const userRoles = await getUserRoles();
          const hasRequiredRole = requiredRoles.some((role) =>
            userRoles.includes(role)
          );
          if (!hasRequiredRole) {
            router.push("/unauthorized");
          }
        }
      }
    };

    checkAuth();
  }, [user, loading, router, requiredRoles, getUserRoles]);

  if (loading) {
    return <Loading />;
  }

  return user ? <>{children}</> : null;
}
