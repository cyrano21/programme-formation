'use client'

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { programData } from "@/utils/modules-data";
import { Icons } from "@/utils/icons";

export default function Modules() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">CoachVerse</span>
            <nav className="hidden md:flex gap-6 ml-8">
              <button onClick={() => router.push("/dashboard")} className="text-sm font-medium hover:text-primary transition-colors">Dashboard</button>
              <button onClick={() => router.push("/modules")} className="text-sm font-medium text-primary border-b-2 border-primary">Modules</button>
              <button onClick={() => router.push("/tools")} className="text-sm font-medium hover:text-primary transition-colors">Tools</button>
              <button onClick={() => router.push("/assessments")} className="text-sm font-medium hover:text-primary transition-colors">Progress</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-purple-600">
            Programme Holistique de Transformation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un parcours de 12 mois pour votre transformation personnelle et professionnelle
          </p>
        </div>

        {/* Program Overview */}
        <div className="space-y-16">
          {programData.map((phase) => (
            <div key={phase.id} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 text-emerald-600">{phase.title}</h2>
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>
                <Badge variant="secondary" className="shadow-sm">{phase.duration}</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {phase.modules.map((module) => (
                  <Card 
                    key={module.id} 
                    className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-emerald-600/30 group"
                  >
                    {/* Progress indicator */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                      <div
                        className="h-full bg-emerald-600 transition-all duration-300 group-hover:bg-emerald-700"
                        style={{ width: `${module.progress || (Math.random() * 100)}%` }}
                      />
                    </div>

                    <CardHeader className="text-center relative z-10 bg-gradient-to-r from-emerald-50 to-purple-50 py-6">
                      <div className="absolute top-0 left-0 w-full h-full opacity-50 group-hover:opacity-70 transition-opacity bg-white/50 blur-sm"></div>
                      <div className="relative z-20">
                        <CardTitle className="text-primary text-center mb-2">{module.title}</CardTitle>
                        <CardDescription className="text-center">{module.description}</CardDescription>
                        <div className="flex justify-center mt-2">
                          <Badge variant="outline" className="group-hover:bg-emerald-100 transition-colors">{module.duration}</Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 p-6 bg-white">
                      {/* Themes */}
                      <div className="space-y-4 border-b pb-4 border-slate-100">
                        <h4 className="font-semibold text-emerald-600 text-center">Thèmes</h4>
                        <div className="space-y-3">
                          {module.themes.map((theme, index) => (
                            <div 
                              key={index} 
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                            >
                              <span className="text-xl text-emerald-600/70">{theme.icon}</span>
                              <div>
                                <h5 className="font-medium text-emerald-600">{theme.title}</h5>
                                <p className="text-sm text-muted-foreground">{theme.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Competencies */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-purple-600 text-center">Compétences</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {module.competencies.map((competency, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="text-sm hover:bg-purple-100 transition-colors"
                            >
                              <span className="mr-1 text-purple-600/70">{competency.icon}</span> 
                              {competency.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        variant="coachverse"
                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 transition-colors" 
                        onClick={() => router.push(`/module-detail?id=${module.id}`)}
                      >
                        Commencer le module
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
