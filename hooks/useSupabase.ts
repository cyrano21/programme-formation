import { useState, useEffect } from 'react'
import { createClient, PostgrestError } from '@supabase/supabase-js'
import { BaseModel } from '@/types/global'

// Type générique pour les erreurs
export interface GenericStringError {
  message: string;
  code?: string;
}

// Initialisation du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type pour les événements en temps réel
type RealtimeEvent<T> = {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: T
  old: T
}

// Type générique pour les options de requête
type QueryOptions<T> = {
  filter?: Record<string, any>
  select?: string
  order?: { column: keyof T; ascending?: boolean }
}

// Type de retour du hook
type UseSupabaseDataResult<T> = {
  data: T[];
  loading: boolean;
  error: GenericStringError | null;
}

export function useSupabaseData<T extends BaseModel>(
  table: string, 
  options: QueryOptions<T> = {}
): UseSupabaseDataResult<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<GenericStringError | null>(null)

  useEffect(() => {
    let isMounted = true
    let subscription: any = null

    async function fetchData() {
      try {
        // Construction de la requête
        let query = supabase.from(table).select(options.select || '*')

        // Ajout des filtres si spécifiés
        if (options.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        // Ajout du tri si spécifié
        if (options.order) {
          query = query.order(options.order.column as string, { 
            ascending: options.order.ascending ?? true 
          })
        }

        // Exécution de la requête
        const { data: fetchedData, error: fetchError } = await query

        // Gestion explicite des erreurs
        if (fetchError) {
          throw {
            message: fetchError.message,
            code: fetchError.code
          } as GenericStringError
        }
        
        if (isMounted) {
          // Vérification et conversion sécurisée des données
          const safeData = (fetchedData || []) as unknown as T[]
          setData(safeData)
          setLoading(false)
        }

        // Configuration du listener en temps réel
        subscription = supabase
          .channel(`${table}-changes`)
          .on('postgres_changes', 
            { event: '*', schema: 'public', table }, 
            (payload: any) => {
              if (!isMounted) return

              switch (payload.eventType) {
                case 'INSERT':
                  setData(prev => [...prev, payload.new as T])
                  break
                case 'UPDATE':
                  setData(prev => prev.map(item => 
                    item.id === payload.new.id ? payload.new as T : item
                  ))
                  break
                case 'DELETE':
                  setData(prev => prev.filter(item => 
                    item.id !== payload.old.id
                  ))
                  break
              }
            }
          )
          .subscribe()
      } catch (err) {
        if (isMounted) {
          const errorObj: GenericStringError = 
            err instanceof Error 
              ? { message: err.message } 
              : { message: 'Unknown error' }
          
          setError(errorObj)
          setLoading(false)
        }
      }
    }

    fetchData()

    // Nettoyage du listener
    return () => {
      isMounted = false
      if (subscription) {
        supabase.removeChannel(subscription)
      }
    }
  }, [table, JSON.stringify(options)])

  return { data, loading, error }
}

// Fonctions utilitaires génériques pour CRUD
export async function insertData<T extends BaseModel>(
  table: string, 
  record: Omit<T, 'id' | 'created_at'>
) {
  const { data, error } = await supabase
    .from(table)
    .insert(record)
    .select()

  if (error) throw error
  return data
}

export async function updateData<T extends BaseModel>(
  table: string, 
  id: number, 
  record: Partial<Omit<T, 'id' | 'created_at'>>
) {
  const { data, error } = await supabase
    .from(table)
    .update(record)
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

export async function deleteData<T extends BaseModel>(
  table: string, 
  id: number
) {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

// Fonction de recherche avancée
export async function searchData<T extends BaseModel>(
  table: string, 
  options: QueryOptions<T> = {}
) {
  // Construction de la requête
  let query = supabase.from(table).select(options.select || '*')

  // Ajout des filtres si spécifiés
  if (options.filter) {
    Object.entries(options.filter).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
  }

  // Ajout du tri si spécifié
  if (options.order) {
    query = query.order(options.order.column as string, { 
      ascending: options.order.ascending ?? true 
    })
  }

  // Exécution de la requête
  const { data, error } = await query

  if (error) throw error
  return data
}
