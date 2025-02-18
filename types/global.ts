import React from 'react'

export interface BaseModel {
  id: number
  created_at?: string
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

// Définition des rôles utilisateur
export type UserRole = 
  | 'admin' 
  | 'coach' 
  | 'student' 
  | 'manager' 
  | 'guest';

export interface Module extends BaseModel {
  title: string
  description: string
  difficulty: Difficulty
  duration: number
  image_url?: string
  tags?: string[]
  is_active: boolean
}

export interface ModuleFormData extends Omit<Module, 'id' | 'created_at'> {}

export const defaultModuleFormData: ModuleFormData = {
  title: '',
  description: '',
  difficulty: 'beginner',
  duration: 0,
  image_url: '',
  tags: [],
  is_active: true
}

// Types génériques pour les composants React
export type ReactFC<P = {}> = React.FC<React.PropsWithChildren<P>>
export type ReactFCWithChildren<P = {}> = React.FC<React.PropsWithChildren<P>>

// Types globaux pour l'application

// Interface pour les informations du propriétaire
export interface OwnerInfo {
  email: string;
  name: string;
}

// Fonction utilitaire pour récupérer les informations du propriétaire
export function getOwnerInfo(): OwnerInfo {
  return {
    email: process.env.NEXT_PUBLIC_OWNER_EMAIL || 'contact@example.com',
    name: process.env.NEXT_PUBLIC_OWNER_NAME || 'Administrateur'
  };
}

// Exporter pour permettre l'importation
export {};
