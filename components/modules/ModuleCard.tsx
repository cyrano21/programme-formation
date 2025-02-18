import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Module } from '@/types/global'
import { Button } from '@/components/ui/button'
import { Icons } from '@/utils/icons'

interface ModuleCardProps {
  module: Module
  onEdit?: (module: Module) => void
  onDelete?: (moduleId: number) => void
}

export function ModuleCard({ 
  module, 
  onEdit, 
  onDelete 
}: ModuleCardProps) {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="relative w-full h-48">
          <Image 
            src={module.image_url || '/default-module.jpg'} 
            alt={module.title} 
            fill 
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardTitle className="mt-2">{module.title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {module.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <Badge 
            variant="outline" 
            className={`${difficultyColors[module.difficulty]} flex items-center`}
          >
            <Icons.Star className="w-4 h-4 mr-2" />
            {module.difficulty}
          </Badge>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.Clock className="w-4 h-4 mr-2" />
            {module.duration} min
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {onEdit && (
          <Button 
            variant="outline" 
            onClick={() => onEdit(module)}
          >
            Modifier
          </Button>
        )}
        
        {onDelete && (
          <Button 
            variant="destructive" 
            onClick={() => onDelete(module.id)}
          >
            Supprimer
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
