declare module 'class-variance-authority' {
  import { ClassValue } from 'class-variance-authority/types'

  export function cva<T = any>(base?: string, config?: any): (props?: T) => string;

  export function cva<T extends Record<string, Record<string, ClassValue>>>(
    base?: ClassValue,
    config?: {
      variants?: T
      defaultVariants?: {
        [K in keyof T]?: keyof T[K]
      }
      compoundVariants?: Array<
        {
          [K in keyof T]?: keyof T[K]
        } & {
          class: ClassValue
        }
      >
    }
  ): (props?: {
    [K in keyof T]?: keyof T[K]
  }) => string

  export type VariantProps<T extends (...args: any) => string> = Parameters<T>[0]
}
