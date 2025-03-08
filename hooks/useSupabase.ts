import { useState, useEffect } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { BaseModel } from '@/types/global'

// Type générique pour les erreurs
export interface GenericStringError {
  message: string;
  code?: string;
}

// Initialisation du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Mock implementation of PostgrestFilterBuilder
type MockPostgrestResponse<T = unknown> = {
  data: T[] | null;
  error: null | { message: string; code: string };
}

type MockPostgrestBuilder<T = unknown> = {
  select: (_columns?: string) => Promise<MockPostgrestResponse<T>>;
  insert: (_data: unknown) => Promise<MockPostgrestResponse<T>>;
  update: (_data: unknown) => MockPostgrestBuilder<T>;
  delete: () => MockPostgrestBuilder<T>;
  eq: (_column: string, _value: unknown) => Promise<MockPostgrestResponse<T>>;
  order: (_column: string, _options: { ascending: boolean }) => MockPostgrestBuilder<T>;
}

// Vérification des valeurs avant création du client
let supabase: SupabaseClient
try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anonymous Key is missing. Using a mock client that will not make actual API calls.')
    // Créer un mock client qui ne fera pas d'appels réels
    const mockBuilder: MockPostgrestBuilder<unknown> = {
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: [], error: null }),
      update: () => mockBuilder,
      delete: () => mockBuilder,
      eq: () => Promise.resolve({ data: [], error: null }),
      order: () => mockBuilder
    }

    const mockClient = {
      supabaseUrl: '',
      supabaseKey: '',
      auth: {
        onAuthStateChange: () => ({ data: null, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signOut: () => Promise.resolve({ error: null })
      },
      from: () => mockBuilder,
      realtime: { connect: () => {}, disconnect: () => {} },
      storage: { from: () => ({}) },
      functions: { invoke: () => Promise.resolve({}) },
      rest: { from: () => mockBuilder }
    } as unknown as SupabaseClient

    supabase = mockClient
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error)
  // Fallback to mock client with same structure as above
  const mockBuilder: MockPostgrestBuilder<unknown> = {
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => mockBuilder,
    delete: () => mockBuilder,
    eq: () => Promise.resolve({ data: [], error: null }),
    order: () => mockBuilder
  }

  supabase = {
    supabaseUrl: '',
    supabaseKey: '',
    auth: {
      onAuthStateChange: () => ({ data: null, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => mockBuilder,
    realtime: { connect: () => {}, disconnect: () => {} },
    storage: { from: () => ({}) },
    functions: { invoke: () => Promise.resolve({}) },
    rest: { from: () => mockBuilder }
  } as unknown as SupabaseClient
}

export { supabase }

// Type générique pour les options de requête
type QueryOptions<T> = {
  filter?: Record<string, unknown>
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

  // Extract options to individual variables for dependency array
  const { select, filter, order } = options
  // Create a stable reference for the dependency check
  const optionsString = JSON.stringify(options)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        let query = supabase.from(table).select(select || '*')

        if (filter) {
          Object.entries(filter).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        if (order) {
          query = query.order(order.column as string, { 
            ascending: order.ascending ?? true 
          })
        }

        const { data: fetchedData, error: fetchError } = await query

        if (fetchError) {
          setError({
            message: fetchError.message,
            code: fetchError.code
          })
        } else if (isMounted) {
          setData((fetchedData as unknown) as T[] || [])
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError({
            message: err instanceof Error ? err.message : 'Une erreur est survenue',
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
    }
  }, [table, select, filter, order, optionsString])

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
    return (data as unknown) as T[]
  } catch (err: unknown) {
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
    return (data as unknown) as T[]
  } catch (err: unknown) {
    console.error(`Erreur lors de la mise à jour dans ${table}:`, err)
    throw err
  }
}

export async function deleteData(
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
  } catch (err: unknown) {
    console.error(`Erreur lors de la suppression dans ${table}:`, err)
    throw err
  }
}

export async function searchData<T extends BaseModel>(
  table: string, 
  options: QueryOptions<T> = {}
) {
  try {
    let query = supabase.from(table).select(options.select || '*')

    if (options.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }

    if (options.order) {
      query = query.order(options.order.column as string, { 
        ascending: options.order.ascending ?? true 
      })
    }

    const { data, error } = await query

    if (error) throw error
    return (data as unknown) as T[]
  } catch (err: unknown) {
    console.error(`Erreur lors de la recherche dans ${table}:`, err)
    throw err
  }
}
