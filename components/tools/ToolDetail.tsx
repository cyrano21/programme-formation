'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tool } from '@/features/tools/hooks/useTools';
import { Icons } from '@/utils/icons';
import RecommendedContent from '@/components/shared/RecommendedContent';

interface ToolDetailProps {
  tool: Tool;
  onClose?: () => void;
}

/**
 * ToolDetail - Composant pour afficher les détails d'un outil de coaching
 * avec les leçons recommandées associées.
 */
export default function ToolDetail({ tool, onClose }: ToolDetailProps) {
  if (!tool) return null;

  // Déterminer le contenu à afficher en fonction du type d'outil
  const renderToolContent = () => {
    if (tool.content.steps) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Étapes d&apos;utilisation</h3>
          <ol className="space-y-3">
            {tool.content.steps.map((step, index) => {
              if (typeof step === 'string') {
                return (
                  <li
                    key={index}
                    className="pl-4 border-l-2 border-primary/30 py-2"
                  >
                    <p>{step}</p>
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    className="pl-4 border-l-2 border-primary/30 py-2"
                  >
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </li>
                );
              }
            })}
          </ol>
        </div>
      );
    }

    if (tool.content.areas) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Domaines à explorer</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {tool.content.areas.map((area, index) => (
              <div
                key={index}
                className="p-3 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (tool.content.categories) {
      return (
        <div className="space-y-6">
          {tool.content.categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium">{category.name}</h3>
              <ul className="space-y-2">
                {category.questions.map((question, qIndex) => (
                  <li
                    key={qIndex}
                    className="p-3 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    if (tool.content.sections) {
      return (
        <div className="space-y-4">
          {tool.content.sections.map((section, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
            >
              <h3 className="text-lg font-medium mb-2">{section.title}</h3>
              <p className="text-muted-foreground italic">
                « {section.prompt} »
              </p>
              <div className="mt-3 pt-3 border-t border-border/50">
                <textarea
                  className="w-full p-2 border border-border rounded-md focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-colors"
                  rows={2}
                  placeholder="Votre réponse..."
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="p-4 bg-muted/30 rounded-md text-center">
        <p>Contenu en cours de développement</p>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tool Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary/10 p-4 rounded-full">
          {React.isValidElement(tool.icon) ? tool.icon : null}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{tool.title}</h1>
          <p className="text-muted-foreground">{tool.description}</p>
        </div>
      </div>

      {/* Tool Metadata */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="px-3 py-1 bg-muted rounded-full text-xs">
          {tool.category}
        </div>

        {tool.difficulty && (
          <div className="px-3 py-1 bg-muted rounded-full text-xs">
            {tool.difficulty}
          </div>
        )}

        {tool.tags &&
          tool.tags.map((tag) => (
            <div
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
            >
              {tag}
            </div>
          ))}
      </div>

      {/* Tool Content */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Comment utiliser cet outil</CardTitle>
        </CardHeader>
        <CardContent>{renderToolContent()}</CardContent>
      </Card>

      {/* Related Lessons using our new RecommendedContent component */}
      <RecommendedContent
        contentType="tool"
        contentId={tool.id.toString()}
        maxItems={3}
      />

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onClose}
          className="hover:bg-muted transition-colors"
        >
          <Icons.ArrowStart className="mr-2 h-4 w-4" />
          Retour aux outils
        </Button>

        <Button className="bg-primary hover:bg-primary/90 transition-colors">
          <Icons.Download className="mr-2 h-4 w-4" />
          Télécharger cet outil
        </Button>
      </div>
    </div>
  );
}
