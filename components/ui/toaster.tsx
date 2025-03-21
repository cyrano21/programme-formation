"use client"

import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner 
      position="top-right" 
      richColors 
      closeButton 
      duration={3000}
    />
  )
}
