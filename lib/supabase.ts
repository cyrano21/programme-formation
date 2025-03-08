import { createClient } from '@supabase/supabase-js'

// Assurez-vous de définir ces variables d'environnement dans .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fonctions utilitaires pour les opérations CRUD
export const fetchData = async (table: string) => {
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw error
  return data
}

export const insertData = async <T>(table: string, record: Partial<T>) => {
  const { data, error } = await supabase.from(table).insert(record)
  if (error) throw error
  return (data || []) as T[]
}

export const updateData = async <T>(table: string, id: number | string, record: Partial<T>) => {
  const { data, error } = await supabase.from(table).update(record).eq('id', id)
  if (error) throw error
  return (data || []) as T[]
}

export const deleteData = async (table: string, id: number) => {
  const { data, error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
  return data
}


