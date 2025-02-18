"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/utils/icons";

// Placeholder data - will be replaced with Supabase data
const toolsData = [
  {
    id: 1,
    title: "GROW Model Framework",
    category: "Framework",
    description: "Goal, Reality, Options, Way Forward - A structured approach to goal setting and problem solving.",
    icon: <Icons.TrendingUp />,
    content: {
      steps: [
        { title: "Goal", description: "What do you want to achieve?" },
        { title: "Reality", description: "Where are you now? What's working/not working?" },
        { title: "Options", description: "What could you do? What are your possibilities?" },
        { title: "Way Forward", description: "What will you do? When will you do it?" }
      ]
    }
  },
  {
    id: 2,
    title: "Values Assessment Exercise",
    category: "Exercise",
    description: "Help clients identify and prioritize their core values for better decision making.",
    icon: <Icons.BookOpen />,
    content: {
      steps: [
        "Present the list of common values",
        "Ask client to select top 10 values",
        "Narrow down to top 5 through comparison",
        "Explore what each value means personally"
      ]
    }
  },
  {
    id: 3,
    title: "Wheel of Life Template",
    category: "Template",
    description: "Visual tool for assessing satisfaction across different life areas.",
    icon: <Icons.Users />,
    content: {
      areas: [
        "Career", "Finance", "Health", "Family", 
        "Relationships", "Personal Growth", 
        "Fun & Recreation", "Physical Environment"
      ]
    }
  },
  {
    id: 4,
    title: "Powerful Questions Bank",
    category: "Resource",
    description: "Collection of thought-provoking questions for different coaching scenarios.",
    icon: <Icons.MessageCircle />,
    content: {
      categories: [
        { name: "Goal Setting", questions: ["What would success look like?", "What's stopping you?"] },
        { name: "Exploration", questions: ["What else?", "What's beneath the surface?"] },
        { name: "Action", questions: ["What's your first step?", "When will you start?"] }
      ]
    }
  },
  {
    id: 5,
    title: "SMART Goals Worksheet",
    category: "Template",
    description: "Template for creating Specific, Measurable, Achievable, Relevant, and Time-bound goals.",
    icon: <Icons.FileText />,
    content: {
      sections: [
        { title: "Specific", prompt: "What exactly do you want to accomplish?" },
        { title: "Measurable", prompt: "How will you know when you've reached it?" },
        { title: "Achievable", prompt: "Is this realistic with your current resources?" },
        { title: "Relevant", prompt: "Why is this goal important to you?" },
        { title: "Time-bound", prompt: "When do you want to achieve this by?" }
      ]
    }
  }
];

export default function Tools() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">CoachVerse</span>
            <nav className="hidden md:flex gap-6 ml-8">
              <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
              <a href="/modules" className="text-sm font-medium hover:text-primary transition-colors">Modules</a>
              <a href="/tools" className="text-sm font-medium text-primary border-b-2 border-primary">Tools</a>
              <a href="/lessons" className="text-sm font-medium hover:text-primary transition-colors">Lessons</a>
              <a href="/assessments" className="text-sm font-medium hover:text-primary transition-colors">Progress</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
            Coaching Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock your potential with our curated collection of professional coaching tools
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="max-w-xl mx-auto relative">
            <Input
              type="search"
              placeholder="Search tools by name or description..."
              className="pl-10 py-2 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          
          <div className="flex justify-center gap-3 flex-wrap">
            {["all", "framework", "template", "exercise", "resource"].map((category) => (
              <Button 
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card 
              key={tool.id} 
              className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {tool.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold">{tool.title}</CardTitle>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {tool.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 min-h-[3rem]">
                  {tool.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Icons.AlertCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-xl text-muted-foreground">
              No tools found matching your search
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
