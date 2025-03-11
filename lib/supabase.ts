import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Assurez-vous de définir ces variables d'environnement dans .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Mock implementation of PostgrestFilterBuilder
type MockPostgrestResponse<T = unknown> = {
  data: T[] | null;
  error: null | { message: string; code: string };
}

type MockPostgrestBuilder<T = unknown> = {
  select: (_columns?: string) => Promise<MockPostgrestResponse<T>>;
  insert: (_data: unknown) => Promise<MockPostgrestResponse<T>>;
  update: (_data: unknown) => MockPostgrestBuilder<T>;
  delete: () => MockPostgrestBuilder<T>;
  eq: (_column: string, _value: unknown) => Promise<MockPostgrestResponse<T>>;
  order: (_column: string, _options: { ascending: boolean }) => MockPostgrestBuilder<T>;
}

// Données de démonstration pour les différentes tables

// Données de démonstration pour les outils
const mockToolsData = [
  {
    id: 1,
    title: "Cadre GROW",
    category: "Cadre",
    description: "Un modèle structuré pour les sessions de coaching efficaces",
    iconName: "Target",
    content: {
      steps: [
        { title: "Goal", description: "Définir l'objectif de la session" },
        { title: "Reality", description: "Explorer la situation actuelle" },
        { title: "Options", description: "Identifier les possibilités d'action" },
        { title: "Will", description: "Déterminer les prochaines étapes" }
      ]
    },
    tags: ["coaching", "structure", "objectifs"],
    relatedLessons: ["lesson-1", "lesson-3"],
    difficulty: "débutant"
  },
  {
    id: 2,
    title: "Roue de la vie",
    category: "Exercice",
    description: "Évaluer l'équilibre dans différents domaines de la vie",
    iconName: "PieChart",
    content: {
      areas: ["Carrière", "Finances", "Santé", "Famille", "Relations", "Développement personnel", "Loisirs", "Environnement"]
    },
    tags: ["équilibre", "évaluation", "vie"],
    relatedLessons: ["lesson-2"],
    difficulty: "débutant"
  },
  {
    id: 3,
    title: "Questions puissantes",
    category: "Ressource",
    description: "Collection de questions transformatives pour le coaching",
    iconName: "HelpCircle",
    content: {
      categories: [
        { name: "Clarification", questions: ["Que voulez-vous vraiment ?", "Comment saurez-vous que vous avez réussi ?"] },
        { name: "Perspective", questions: ["Comment verriez-vous cela dans 5 ans ?", "Que dirait votre mentor ?"] }
      ]
    },
    tags: ["questions", "réflexion", "perspective"],
    relatedLessons: ["lesson-1", "lesson-4"],
    difficulty: "intermédiaire"
  },
  {
    id: 4,
    title: "Plan d'action SMART",
    category: "Modèle",
    description: "Créer des objectifs spécifiques, mesurables, atteignables, pertinents et temporels",
    iconName: "CheckSquare",
    content: {
      sections: [
        { title: "Spécifique", prompt: "Décrivez précisément ce que vous voulez accomplir" },
        { title: "Mesurable", prompt: "Comment mesurerez-vous votre progrès et succès ?" },
        { title: "Atteignable", prompt: "Est-ce réaliste avec vos ressources actuelles ?" },
        { title: "Pertinent", prompt: "Pourquoi cet objectif est-il important pour vous ?" },
        { title: "Temporel", prompt: "Quelle est votre échéance pour atteindre cet objectif ?" }
      ]
    },
    tags: ["planification", "objectifs", "action"],
    relatedLessons: ["lesson-2", "lesson-3"],
    difficulty: "débutant"
  },
  {
    id: 5,
    title: "Analyse SWOT",
    category: "Cadre",
    description: "Évaluer les forces, faiblesses, opportunités et menaces",
    iconName: "Grid",
    content: {
      sections: [
        { title: "Forces", prompt: "Quelles sont vos capacités et ressources internes positives ?" },
        { title: "Faiblesses", prompt: "Quels sont vos défis et limitations internes ?" },
        { title: "Opportunités", prompt: "Quelles sont les conditions externes favorables ?" },
        { title: "Menaces", prompt: "Quels facteurs externes pourraient causer des problèmes ?" }
      ]
    },
    tags: ["analyse", "stratégie", "évaluation"],
    relatedLessons: ["lesson-4"],
    difficulty: "intermédiaire"
  }
];

// Données de démonstration pour les leçons
const mockLessonsData = [
  {
    id: "lesson-1",
    title: "Introduction au coaching",
    description: "Les fondamentaux du coaching professionnel",
    module: "module-1",
    duration: "45 min",
    icon: "BookOpen",
    category: "Fondamentaux",
    recommended: true,
    difficulty: "débutant",
    tags: ["coaching", "fondamentaux", "introduction"],
    content: [
      { title: "Qu'est-ce que le coaching?", description: "Définition et principes" },
      { title: "Les compétences clés", description: "Écoute active, questionnement et feedback" }
    ]
  },
  {
    id: "lesson-2",
    title: "Établir des objectifs efficaces",
    description: "Comment définir et atteindre des objectifs significatifs",
    module: "module-1",
    duration: "60 min",
    icon: "Target",
    category: "Méthodologie",
    recommended: true,
    difficulty: "débutant",
    tags: ["objectifs", "planification", "SMART"],
    content: [
      { title: "Objectifs SMART", description: "Créer des objectifs spécifiques et mesurables" },
      { title: "Suivi des progrès", description: "Techniques pour suivre et ajuster les objectifs" }
    ]
  },
  {
    id: "lesson-3",
    title: "L'art du questionnement",
    description: "Utiliser des questions puissantes pour faciliter le changement",
    module: "module-2",
    duration: "50 min",
    icon: "HelpCircle",
    category: "Communication",
    recommended: false,
    difficulty: "intermédiaire",
    tags: ["questions", "communication", "coaching"],
    content: [
      { title: "Types de questions", description: "Questions ouvertes, fermées, et réflexives" },
      { title: "Séquence de questionnement", description: "Structurer vos questions pour plus d'impact" }
    ]
  },
  {
    id: "lesson-4",
    title: "Coaching pour le développement personnel",
    description: "Aider les clients à développer leur potentiel",
    module: "module-3",
    duration: "75 min",
    icon: "User",
    category: "Développement",
    recommended: true,
    difficulty: "avancé",
    tags: ["développement", "potentiel", "croissance"],
    content: [
      { title: "Identifier les forces", description: "Techniques pour découvrir les talents cachés" },
      { title: "Surmonter les obstacles", description: "Stratégies pour dépasser les limitations" }
    ]
  }
];

// Données de démonstration pour les modules
const mockModulesData = [
  {
    id: "module-1",
    title: "Fondamentaux du coaching",
    description: "Les bases essentielles pour devenir un coach efficace",
    duration: "3 heures",
    lessons: ["lesson-1", "lesson-2"],
    progress: 75
  },
  {
    id: "module-2",
    title: "Techniques avancées",
    description: "Méthodes sophistiquées pour approfondir votre pratique",
    duration: "4 heures",
    lessons: ["lesson-3"],
    progress: 30
  },
  {
    id: "module-3",
    title: "Spécialisations",
    description: "Domaines spécifiques d'application du coaching",
    duration: "5 heures",
    lessons: ["lesson-4"],
    progress: 10
  }
];

// Vérification des valeurs avant création du client
let supabase: SupabaseClient
try {
  // Check if URL is valid and credentials are present
  const isValidUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Check for placeholder values or missing credentials
  const isPlaceholder = (value: string | undefined): boolean => {
    if (!value) return true;
    return value.includes('example') || value.includes('your_') || value === '' || value.trim() === '';
  }
  
  // Check if the value is a valid configuration value
  const isValidConfig = (value: string | undefined): boolean => {
    return value !== undefined && value !== null && value.trim() !== '' && !isPlaceholder(value);
  }
  
  if (!isValidUrl(supabaseUrl) || !isValidConfig(supabaseUrl) || !isValidConfig(supabaseAnonKey)) {
    console.warn('Supabase URL or Anonymous Key is missing, empty, or using placeholder values. Using a mock client with demo data. Please check your environment variables in .env.local file.')
    // Créer un mock client qui ne fera pas d'appels réels mais retournera des données de démo
    const mockBuilder: MockPostgrestBuilder<unknown> = {
      select: (table) => {
        // Retourner des données de démo pour la table 'tools'
        if (table === 'tools') {
          return Promise.resolve({ data: mockToolsData, error: null })
        }
        return Promise.resolve({ data: [], error: null })
      },
      insert: () => Promise.resolve({ data: [], error: null }),
      update: () => mockBuilder,
      delete: () => mockBuilder,
      eq: () => Promise.resolve({ data: [], error: null }),
      order: () => mockBuilder
    }

    const mockClient = {
      supabaseUrl: '',
      supabaseKey: '',
      auth: {
        onAuthStateChange: () => ({ data: null, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signOut: () => Promise.resolve({ error: null })
      },
      from: (table: string) => {
        // Return appropriate mock data based on the requested table
        if (table === 'tools') {
          return {
            select: () => Promise.resolve({ data: mockToolsData, error: null }),
            insert: mockBuilder.insert,
            update: mockBuilder.update,
            delete: mockBuilder.delete,
            eq: (_column: string, _value: unknown) => Promise.resolve({ data: mockToolsData.filter(tool => {
              // @ts-expect-error - Dynamic property access
              return tool[_column] === _value;
            }), error: null }),
            order: mockBuilder.order
          }
        } else if (table === 'lessons') {
          return {
            select: () => Promise.resolve({ data: mockLessonsData, error: null }),
            insert: mockBuilder.insert,
            update: mockBuilder.update,
            delete: mockBuilder.delete,
            eq: (_column: string, _value: unknown) => Promise.resolve({ data: mockLessonsData.filter(lesson => {
              // @ts-expect-error - Dynamic property access
              return lesson[_column] === _value;
            }), error: null }),
            order: mockBuilder.order
          }
        } else if (table === 'modules') {
          return {
            select: () => Promise.resolve({ data: mockModulesData, error: null }),
            insert: mockBuilder.insert,
            update: mockBuilder.update,
            delete: mockBuilder.delete,
            eq: (_column: string, _value: unknown) => Promise.resolve({ data: mockModulesData.filter(module => {
              // @ts-expect-error - Dynamic property access
              return module[_column] === _value;
            }), error: null }),
            order: mockBuilder.order
          }
        } else if (table === 'user_progress') {
          // Mock user progress data
          const mockUserProgress = [
            { lesson_id: 'lesson-1', progress: 100, user_id: 'mock-user-id', last_accessed: new Date().toISOString() },
            { lesson_id: 'lesson-2', progress: 75, user_id: 'mock-user-id', last_accessed: new Date().toISOString() },
            { lesson_id: 'lesson-3', progress: 30, user_id: 'mock-user-id', last_accessed: new Date().toISOString() }
          ];
          return {
            select: () => Promise.resolve({ data: mockUserProgress, error: null }),
            insert: mockBuilder.insert,
            update: mockBuilder.update,
            delete: mockBuilder.delete,
            eq: (_column: string, _value: unknown) => Promise.resolve({ data: mockUserProgress.filter(progress => {
              // @ts-expect-error - Dynamic property access
              return progress[_column] === _value;
            }), error: null }),
            order: mockBuilder.order
          }
        }
        // Default empty response for other tables
        return mockBuilder
      },
      realtime: { connect: () => {}, disconnect: () => {} },
      storage: { from: () => ({}) },
      functions: { invoke: () => Promise.resolve({}) },
      rest: { from: () => mockBuilder }
    } as unknown as SupabaseClient

    supabase = mockClient
  } else {
    // Fix TypeScript error by ensuring supabaseUrl and supabaseAnonKey are treated as strings
    // since we've already validated they are valid values at this point
    supabase = createClient(supabaseUrl as string, supabaseAnonKey as string)
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error)
  // Fallback to mock client with same structure as above but with demo data
  const mockBuilder: MockPostgrestBuilder<unknown> = {
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => mockBuilder,
    delete: () => mockBuilder,
    eq: () => Promise.resolve({ data: [], error: null }),
    order: () => mockBuilder
  }

  console.warn('Failed to initialize Supabase client. Using a mock client with demo data. Please check your environment variables in .env.local file.')
  
  supabase = {
    supabaseUrl: '',
    supabaseKey: '',
    auth: {
      onAuthStateChange: () => ({ data: null, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: (table: string) => {
      // Return appropriate mock data based on the requested table
      if (table === 'tools') {
        return {
          select: () => Promise.resolve({ data: mockToolsData, error: null }),
          insert: mockBuilder.insert,
          update: mockBuilder.update,
          delete: mockBuilder.delete,
          eq: (_column: string, _value: unknown) => Promise.resolve({ data: mockToolsData.filter(tool => {
            // @ts-expect-error - Dynamic property access
            return tool[_column] === _value;
          }), error: null }),
          order: mockBuilder.order
        }
      } else if (table === 'lessons') {
        return {
          select: () => Promise.resolve({ data: mockLessonsData, error: null }),
          insert: mockBuilder.insert,
          update: mockBuilder.update,
          delete: mockBuilder.delete,
          eq: (_column: string, _value: unknown) => Promise.resolve({ data: mockLessonsData.filter(lesson => {
            // @ts-expect-error - Dynamic property access
            return lesson[_column] === _value;
          }), error: null }),
          order: mockBuilder.order
        }
      } else if (table === 'modules') {
        return {
          select: () => Promise.resolve({ data: mockModulesData, error: null }),
          insert: mockBuilder.insert,
          update: mockBuilder.update,
          delete: mockBuilder.delete,
          eq: (_column: string, _value: unknown) => Promise.resolve({ data: mockModulesData.filter(module => {
            // @ts-expect-error - Dynamic property access
            return module[_column] === _value;
          }), error: null }),
          order: mockBuilder.order
        }
      } else if (table === 'user_progress') {
        // Mock user progress data
        const mockUserProgress = [
          { lesson_id: 'lesson-1', progress: 100, user_id: 'mock-user-id', last_accessed: new Date().toISOString() },
          { lesson_id: 'lesson-2', progress: 75, user_id: 'mock-user-id', last_accessed: new Date().toISOString() },
          { lesson_id: 'lesson-3', progress: 30, user_id: 'mock-user-id', last_accessed: new Date().toISOString() }
        ];
        return {
          select: () => Promise.resolve({ data: mockUserProgress, error: null }),
          insert: mockBuilder.insert,
          update: mockBuilder.update,
          delete: mockBuilder.delete,
          eq: (_column: string, _value: unknown) => Promise.resolve({ data: mockUserProgress.filter(progress => {
            // @ts-expect-error - Dynamic property access
            return progress[_column] === _value;
          }), error: null }),
          order: mockBuilder.order
        }
      }
      // Default empty response for other tables
      return mockBuilder
    },
    realtime: { connect: () => {}, disconnect: () => {} },
    storage: { from: () => ({}) },
    functions: { invoke: () => Promise.resolve({}) },
    rest: { from: () => mockBuilder }
  } as unknown as SupabaseClient
}

export { supabase }

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

export const deleteData = async (table: string, id: number | string) => {
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
  return true
}


