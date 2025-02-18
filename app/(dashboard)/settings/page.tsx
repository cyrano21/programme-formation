"use client";

import React from "react";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTheme } from '@/contexts/ThemeContext'
import { toast } from "sonner";
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

// Types
type NotificationPreferences = {
  email: boolean;
  platform: boolean;
  marketing: boolean;
};

type FormData = {
  name: string;
  email: string;
  bio: string;
  language: string;
  notifications: NotificationPreferences;
};

export default function SettingsPage() {
  const { 
    user, 
    updateProfile: updateUserProfile, 
    updateEmail: updateUserEmail 
  } = useFirebaseAuth();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = React.useState<FormData>({
    name: user?.displayName || '',
    email: user?.email || '',
    bio: '',
    language: 'fr',
    notifications: {
      email: true,
      platform: true,
      marketing: false
    }
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (user) {
        // Mise à jour du profil
        await updateUserProfile(formData.name);

        // Mise à jour de l'email si différent
        if (formData.email !== user.email) {
          await updateUserEmail(formData.email);
        }

        toast.success('Profil mis à jour avec succès');
        setIsEditing(false);
      }
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du profil', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Réinitialiser les données du formulaire
    setFormData({
      name: user?.displayName || '',
      email: user?.email || '',
      bio: '',
      language: 'fr',
      notifications: {
        email: true,
        platform: true,
        marketing: false
      }
    });
    setIsEditing(false);
  };

  const handleNotificationChange = (
    category: keyof NotificationPreferences, 
    checked: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      notifications: { 
        ...prev.notifications, 
        [category]: checked 
      }
    }));
  };

  const handleLanguageChange = (value: string) => {
    setFormData({ ...formData, language: value });
  };

  const handleThemeChange = (value: string) => {
    if (value === 'light' && theme !== 'light') {
      toggleTheme();
    } else if (value === 'dark' && theme !== 'dark') {
      toggleTheme();
    }
  };

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground">
          Gérez vos préférences et informations de profil
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Mettez à jour vos informations personnelles et votre profil de coach</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSave}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio professionnelle</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Modifier le profil</Button>
              ) : (
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Annuler
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>Personnalisez l'apparence de votre interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Préférence de thème</Label>
                <RadioGroup
                  value={theme}
                  onValueChange={handleThemeChange}
                  className="grid gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Clair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Sombre</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">Système</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Langue</CardTitle>
              <CardDescription>Sélectionnez votre langue préférée</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Langue d'affichage</Label>
                <Select
                  value={formData.language}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Gérez vos préférences de notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Notifications par email</Label>
                  <Switch
                    id="email-notifications"
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="platform-notifications">Notifications de la plateforme</Label>
                  <Switch
                    id="platform-notifications"
                    checked={formData.notifications.platform}
                    onCheckedChange={(checked) => handleNotificationChange('platform', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing-notifications">Communications marketing</Label>
                  <Switch
                    id="marketing-notifications"
                    checked={formData.notifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
