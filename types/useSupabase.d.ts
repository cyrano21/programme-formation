import { BaseModel } from './global'

declare module '@/hooks/useSupabase' {
  export function useSupabaseData<T extends BaseModel>(
    table: string, 
    options?: {
      filter?: Record<string, any>
      select?: string
      order?: { column: keyof T; ascending?: boolean }
    }
  ): {
    data: T[]
    loading: boolean
    error: Error | null
    setData: React.Dispatch<React.SetStateAction<T[]>>
  }

  export async function insertData<T extends BaseModel>(
    table: string, 
    record: Omit<T, 'id' | 'created_at'>
  ): Promise<T[]>

  export async function updateData<T extends BaseModel>(
    table: string, 
    id: number, 
    record: Partial<Omit<T, 'id' | 'created_at'>>
  ): Promise<T[]>

  export async function deleteData<T extends BaseModel>(
    table: string, 
    id: number
  ): Promise<T[]>
}


