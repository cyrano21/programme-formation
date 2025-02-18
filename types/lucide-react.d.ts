declare module 'lucide-react' {
  import React from 'react'
  
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number
    strokeWidth?: number
    absoluteStrokeWidth?: boolean
  }

  export const PlusCircle: React.ComponentType<IconProps>
}


