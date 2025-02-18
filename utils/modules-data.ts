export interface Competency {
  icon: string;
  name: string;
}

export interface Theme {
  icon: string;
  title: string;
  description: string;
}

export interface LessonSection {
  title: string;
  description: string;
}

export interface LessonExercise {
  title: string;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress?: number;
  content?: LessonSection[];
  exercises?: LessonExercise[];
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
  themes: Theme[];
  competencies: Competency[];
  progress?: number;
  lessons?: Lesson[];
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: Module[];
}

export const programData: Phase[] = [
  // PHASE 1 : Origines Cosmiques et Émergence de la Vie
  {
    id: "cosmic-origins",
    title: "Origines Cosmiques et Émergence de la Vie",
    description: "Voyage depuis la naissance de l'univers jusqu'à l'émergence de la conscience",
    duration: "3 mois",
    modules: [
      {
        id: "universe-birth",
        title: "Naissance de l'Univers",
        duration: "4-6 semaines",
        description: "Explorer les mystères de la création cosmique, des particules primordiales à la formation des galaxies",
        themes: [
          {
            icon: "🌌",
            title: "Big Bang et Cosmogenèse",
            description: "Comprendre les origines de l'univers et ses lois fondamentales"
          },
          {
            icon: "⚛️",
            title: "Physique Quantique et Réalité",
            description: "Les mystères de la matière et de l'énergie"
          }
        ],
        competencies: [
          { icon: "🔬", name: "Compréhension cosmologique" },
          { icon: "🌠", name: "Pensée systémique" },
          { icon: "🧠", name: "Intégration scientifique" }
        ],
        progress: 30
      },
      {
        id: "life-emergence",
        title: "Émergence et Complexité du Vivant",
        duration: "4-6 semaines",
        description: "Exploration des mécanismes de l'émergence de la vie, de la cellule aux organismes complexes",
        themes: [
          {
            icon: "🦠",
            title: "Origine de la Vie",
            description: "Des premières molécules aux organismes complexes"
          },
          {
            icon: "🌿",
            title: "Évolution et Adaptation",
            description: "Mécanismes de transformation et de survie"
          }
        ],
        competencies: [
          { icon: "🔬", name: "Compréhension biologique" },
          { icon: "🌈", name: "Pensée évolutive" },
          { icon: "🧬", name: "Intégration génétique" }
        ],
        progress: 20
      },
      {
        id: "understanding-self",
        title: "Comprendre Son Être",
        duration: "4-6 semaines",
        description: "Explorer les fondements biologiques et psychologiques de l'être en intégrant les approches de la psychologie positive, la théorie de l'attachement et les neurosciences affectives",
        themes: [
          {
            icon: "🧬",
            title: "Biologie de l'Évolution",
            description: "Comprendre l'origine et l'évolution de la vie"
          },
          {
            icon: "🧠",
            title: "Psychologie Personnelle",
            description: "Explorer les mécanismes psychologiques internes"
          }
        ],
        competencies: [
          { icon: "🌱", name: "Origine de la vie" },
          { icon: "🔍", name: "Schémas mentaux" },
          { icon: "✨", name: "Conscience de soi" }
        ],
        progress: 45
      }
    ]
  },

  // PHASE 2 : Conscience et Interactions
  {
    id: "consciousness-and-interaction",
    title: "Conscience et Interactions",
    description: "Développer une compréhension profonde de soi et des relations",
    duration: "3 mois",
    modules: [
      {
        id: "neuroscience-development",
        title: "Neurosciences et Développement",
        duration: "4-6 semaines",
        description: "Comprendre et optimiser le fonctionnement cérébral en utilisant les dernières découvertes en neurosciences cognitives",
        themes: [
          {
            icon: "🧠",
            title: "Fonctionnement cérébral",
            description: "Comprendre les mécanismes neurologiques"
          },
          {
            icon: "🌈",
            title: "Techniques d'évolution personnelle",
            description: "Méthodes de transformation personnelle"
          }
        ],
        competencies: [
          { icon: "🔬", name: "Neuroplasticité" },
          { icon: "🧘", name: "Méditation" },
          { icon: "🔄", name: "Reprogrammation mentale" }
        ],
        progress: 20
      },
      {
        id: "deep-communication",
        title: "Communication Profonde et Influence Positive",
        duration: "4-6 semaines",
        description: "Maîtriser l'art de la communication authentique, de l'influence éthique et de la résolution de conflits",
        themes: [
          {
            icon: "🗣️",
            title: "Dynamiques Relationnelles",
            description: "Comprendre et transformer les interactions humaines"
          },
          {
            icon: "🌐",
            title: "Influence et Persuasion Éthique",
            description: "Techniques de communication inspirante et respectueuse"
          }
        ],
        competencies: [
          { icon: "💬", name: "Communication authentique" },
          { icon: "🤝", name: "Résolution de conflits" },
          { icon: "✨", name: "Magnétisme personnel" },
          { icon: "🔍", name: "Lecture des dynamiques subtiles" }
        ],
        progress: 15
      }
    ]
  },

  // PHASE 3 : Développement Émotionnel et Personnel
  {
    id: "emotional-development",
    title: "Développement Émotionnel et Personnel",
    description: "Renforcer son intelligence émotionnelle et son alignement personnel",
    duration: "3 mois",
    modules: [
      {
        id: "self-knowledge",
        title: "Connaissance de Soi",
        duration: "4-6 semaines",
        description: "Approfondir la compréhension de soi et de ses émotions à travers l'Ennéagramme, l'intelligence émotionnelle et les techniques de régulation émotionnelle",
        themes: [
          {
            icon: "🔢",
            title: "Ennéagramme",
            description: "Découvrir sa structure de personnalité"
          },
          {
            icon: "😌",
            title: "Gestion Émotionnelle",
            description: "Maîtriser ses émotions et développer l'intelligence émotionnelle"
          }
        ],
        competencies: [
          { icon: "🧩", name: "Types de personnalité" },
          { icon: "🌈", name: "EFT" },
          { icon: "🧘", name: "Gestion du stress" },
          { icon: "💡", name: "Intelligence émotionnelle" }
        ],
        progress: 20
      },
      {
        id: "personal-expansion",
        title: "Expansion Personnelle",
        duration: "4-6 semaines",
        description: "Développer un leadership authentique et une spiritualité intégrée",
        themes: [
          {
            icon: "🌀",
            title: "Spiritualité et Sens",
            description: "Exploration existentielle et quête de sens"
          },
          {
            icon: "🚀",
            title: "Développement des Compétences",
            description: "Développement du leadership personnel"
          }
        ],
        competencies: [
          { icon: "🌟", name: "Exploration existentielle" },
          { icon: "🧘‍♀️", name: "Méditation avancée" },
          { icon: "👑", name: "Leadership personnel" },
          { icon: "🗣️", name: "Communication inspirante" }
        ],
        progress: 15
      }
    ]
  },

  // PHASE 4 : Rayonnement et Impact
  {
    id: "impact",
    title: "Rayonnement et Impact",
    description: "Structurer sa vision et transmettre son impact",
    duration: "3 mois",
    modules: [
      {
        id: "life-strategies",
        title: "Stratégies de Vie",
        duration: "4-6 semaines",
        description: "Développer des stratégies efficaces pour atteindre ses objectifs",
        themes: [
          {
            icon: "📌",
            title: "Planification Stratégique",
            description: "Définir et atteindre ses objectifs"
          },
          {
            icon: "🔄",
            title: "Techniques de Résilience",
            description: "Développer sa capacité d'adaptation"
          }
        ],
        competencies: [
          { icon: "⏰", name: "Gestion du temps" },
          { icon: "📋", name: "Organisation optimale" },
          { icon: "🌊", name: "Adaptabilité" },
          { icon: "💪", name: "Persévérance" },
          { icon: "🧘", name: "Régulation émotionnelle" }
        ],
        progress: 10
      },
      {
        id: "leadership-influence",
        title: "Leadership et Influence",
        duration: "4-6 semaines",
        description: "Développer son impact et sa capacité d'influence",
        themes: [
          {
            icon: "✨",
            title: "Charisme et Impact",
            description: "Développer son influence positive"
          },
          {
            icon: "🗣️",
            title: "Communication Transformatrice",
            description: "Techniques de transmission et de partage"
          }
        ],
        competencies: [
          { icon: "✨", name: "Développement de l'influence positive" },
          { icon: "🤝", name: "Coaching" },
          { icon: "📣", name: "Transmission et partage" }
        ],
        progress: 5
      }
    ]
  },

  // PHASE 5 : Énergies et Conscience Subtile
  {
    id: "energy-and-consciousness",
    title: "Énergies et Conscience Subtile",
    description: "Explorer les dimensions énergétiques de l'être et développer une conscience élargie",
    duration: "3 mois",
    modules: [
      {
        id: "chakra-and-energy-system",
        title: "Système Énergétique et Chakras",
        duration: "4-6 semaines",
        description: "Comprendre et harmoniser les systèmes énergétiques du corps et de l'esprit",
        themes: [
          {
            icon: "🌈",
            title: "Anatomie Énergétique",
            description: "Exploration des champs énergétiques et des centres subtils"
          },
          {
            icon: "✨",
            title: "Guérison Vibrationnelle",
            description: "Techniques de régulation et d'équilibrage énergétique"
          }
        ],
        competencies: [
          { icon: "🔮", name: "Perception énergétique" },
          { icon: "🌟", name: "Harmonisation des chakras" },
          { icon: "💆", name: "Auto-guérison énergétique" }
        ],
        progress: 30
      },
      {
        id: "radiesthesie-and-intuition",
        title: "Radiesthésie et Développement Intuitif",
        duration: "4-6 semaines",
        description: "Développer et affiner ses capacités intuitives et de perception subtile",
        themes: [
          {
            icon: "🔍",
            title: "Techniques de Perception",
            description: "Méthodes de détection et de lecture énergétique"
          },
          {
            icon: "🌐",
            title: "Conscience Élargie",
            description: "Exploration des dimensions perceptives au-delà du physique"
          }
        ],
        competencies: [
          { icon: "👁️", name: "Perception extrasensorielle" },
          { icon: "🧭", name: "Guidance intuitive" },
          { icon: "🌈", name: "Lecture énergétique" }
        ],
        progress: 25
      }
    ]
  },

  // PHASE 6 : Transformation et Puissance Mentale
  {
    id: "mind-transformation",
    title: "Transformation et Puissance Mentale",
    description: "Maîtriser les techniques avancées de programmation mentale et de communication",
    duration: "3 mois",
    modules: [
      {
        id: "pnl-and-mental-reprogramming",
        title: "PNL et Reprogrammation Mentale",
        duration: "4-6 semaines",
        description: "Techniques avancées de Programmation Neuro-Linguistique pour transformer ses schémas mentaux",
        themes: [
          {
            icon: "🧠",
            title: "Communication Transformatrice",
            description: "Techniques de communication pour le changement personnel"
          },
          {
            icon: "🔄",
            title: "Reconfiguration Mentale",
            description: "Stratégies de modification des schémas de pensée"
          }
        ],
        competencies: [
          { icon: "💬", name: "Communication persuasive" },
          { icon: "🔍", name: "Analyse des croyances limitantes" },
          { icon: "🚀", name: "Reprogrammation cognitive" }
        ],
        progress: 35
      },
      {
        id: "hypnosis-and-subconscious",
        title: "Hypnose et Pouvoir du Subconscient",
        duration: "4-6 semaines",
        description: "Explorer et utiliser les ressources du subconscient pour la transformation personnelle",
        themes: [
          {
            icon: "💭",
            title: "Communication Inconsciente",
            description: "Techniques d'accès et de dialogue avec le subconscient"
          },
          {
            icon: "🌀",
            title: "Auto-Hypnose",
            description: "Méthodes de transformation par l'état modifié de conscience"
          }
        ],
        competencies: [
          { icon: "🧘", name: "Méditation profonde" },
          { icon: "🔮", name: "Reprogrammation subconsciente" },
          { icon: "✨", name: "Transformation intérieure" }
        ],
        progress: 30
      }
    ]
  }
]; 