import React from 'react'
import { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '@/components/ui/badge'

declare module '@/components/ui/badge' {
  export interface BadgeProps 
    extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof badgeVariants> {
    children?: React.ReactNode
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }

  export function Badge(props: BadgeProps): React.ReactElement
}


