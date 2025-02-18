import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';

import { Module, ModuleFormData, defaultModuleFormData } from '@/types/global';
import { insertData, updateData } from '@/hooks/useSupabase';
import { toast } from 'sonner';

// Schéma de validation Zod
const moduleSchema = z.object({
  title: z.string().min(3, "Le titre doit avoir au moins 3 caractères"),
  description: z.string().min(10, "La description doit avoir au moins 10 caractères"),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  duration: z.number().min(0, "La durée doit être positive"),
  image_url: z.string().url("URL invalide").optional(),
  tags: z.array(z.string()).optional(),
  is_active: z.boolean().default(true)
});

interface ModuleFormProps {
  initialData?: Module
  onSubmit?: (module: Module) => void
  onCancel?: () => void
}

export function ModuleForm({ 
  initialData, 
  onSubmit, 
  onCancel 
}: ModuleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: initialData || defaultModuleFormData
  })

  const handleSubmit = async (data: ModuleFormData) => {
    setIsSubmitting(true)
    try {
      let result: Module[]
      
      if (initialData) {
        // Mise à jour d'un module existant
        result = await updateData<Module>('modules', initialData.id, data)
        toast.success('Module mis à jour avec succès')
      } else {
        // Création d'un nouveau module
        result = await insertData<Module>('modules', data)
        toast.success('Nouveau module créé')
      }

      // Appel du callback de soumission si fourni
      if (onSubmit && result[0]) {
        onSubmit(result[0])
      }

      // Réinitialisation du formulaire
      form.reset()
    } catch (error) {
      console.error('Erreur lors de la soumission du module', error)
      toast.error('Impossible de soumettre le module')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="space-y-6 p-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du module</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Titre du module" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Description du module" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau de difficulté</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un niveau" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Débutant</SelectItem>
                  <SelectItem value="intermediate">Intermédiaire</SelectItem>
                  <SelectItem value="advanced">Avancé</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée (en heures)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Durée du module" 
                  {...field} 
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de l'image</FormLabel>
              <FormControl>
                <Input 
                  placeholder="URL de l'image du module" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Annuler
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {initialData ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
