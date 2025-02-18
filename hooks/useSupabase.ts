import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
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
        let query = supabase.from(table).select('*') as any

        // Filtres
        if (options.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        // Sélection personnalisée
        if (options.select) {
          query = query.select(options.select)
        }

        // Tri
        if (options.order) {
          query = query.order(options.order.column as string, { 
            ascending: options.order.ascending ?? true 
          })
        }

        const { data: fetchedData, error: fetchError } = await query

        if (fetchError) {
          setError({
            message: fetchError.message,
            code: fetchError.code
          })
        } else if (isMounted) {
          setData(fetchedData || [])
        }
      } catch (err: any) {
        if (isMounted) {
          setError({
            message: err.message || 'Une erreur est survenue',
          })
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
      if (subscription) {
        subscription.unsubscribe()
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
  try {
    const { data, error } = await supabase
      .from(table)
      .insert(record)
      .select()

    if (error) throw error
    return data as T[]
  } catch (err: any) {
    console.error(`Erreur lors de l'insertion dans ${table}:`, err)
    throw err
  }
}

export async function updateData<T extends BaseModel>(
  table: string, 
  id: number, 
  record: Partial<Omit<T, 'id' | 'created_at'>>
) {
  try {
    const { data, error } = await supabase
      .from(table)
      .update(record)
      .eq('id', id)
      .select()

    if (error) throw error
    return data as T[]
  } catch (err: any) {
    console.error(`Erreur lors de la mise à jour dans ${table}:`, err)
    throw err
  }
}

export async function deleteData<T extends BaseModel>(
  table: string, 
  id: number
) {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  } catch (err: any) {
    console.error(`Erreur lors de la suppression dans ${table}:`, err)
    throw err
  }
}

export async function searchData<T extends BaseModel>(
  table: string, 
  options: QueryOptions<T> = {}
) {
  try {
    let query = supabase.from(table).select('*') as any

    // Filtres
    if (options.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }

    // Sélection personnalisée
    if (options.select) {
      query = query.select(options.select)
    }

    // Tri
    if (options.order) {
      query = query.order(options.order.column as string, { 
        ascending: options.order.ascending ?? true 
      })
    }

    const { data, error } = await query

    if (error) throw error
    return data as T[]
  } catch (err: any) {
    console.error(`Erreur lors de la recherche dans ${table}:`, err)
    throw err
  }
}
