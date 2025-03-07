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
        progress: 30,
        lessons: [
          {
            id: "universe-birth-1",
            title: "Introduction à la Cosmologie",
            description: "Fondements de la cosmologie moderne et théorie du Big Bang",
            duration: "2h30",
            progress: 0,
            content: [
              {
                title: "Introduction au Big Bang",
                description: "Le Big Bang est la théorie cosmologique dominante sur le développement initial de l'univers. Selon cette théorie, l'univers était initialement dans un état extrêmement chaud et dense il y a environ 13,8 milliards d'années, et s'est depuis étendu. L'expansion de l'univers est l'une des preuves les plus convaincantes du Big Bang, observée par le décalage vers le rouge des galaxies lointaines."
              },
              {
                title: "Histoire de la Cosmologie",
                description: "Évolution des théories cosmologiques à travers l'histoire, des modèles géocentriques aux découvertes modernes qui ont mené à la théorie du Big Bang. Contributions d'Einstein, Hubble, Lemaître et autres pionniers."
              },
              {
                title: "Preuves Observationnelles",
                description: "Exploration des preuves scientifiques soutenant la théorie du Big Bang, incluant le rayonnement cosmique de fond, l'abondance des éléments légers, et l'expansion de l'univers."
              }
            ],
            exercises: [
              {
                title: "Analyse des Preuves",
                description: "Analysez les différentes preuves du Big Bang et évaluez leur importance relative dans la validation de la théorie."
              },
              {
                title: "Débat Cosmologique",
                description: "Organisez un débat sur les théories alternatives au Big Bang et leurs limites face aux observations actuelles."
              }
            ]
          },
          {
            id: "universe-birth-2",
            title: "Les Premiers Instants de l'Univers",
            description: "Exploration des événements qui se sont produits dans les premiers instants après le Big Bang",
            duration: "3h",
            progress: 0,
            content: [
              {
                title: "Les Premières Fractions de Seconde",
                description: "Dans les premiers instants après le Big Bang, l'univers a connu une expansion exponentielle appelée inflation cosmique. Cette période a duré de 10^-36 à 10^-32 seconde après le Big Bang. Pendant cette phase, l'univers s'est étendu d'un facteur d'au moins 10^26, créant l'homogénéité et l'isotropie observées aujourd'hui."
              },
              {
                title: "Théorie de l'Inflation",
                description: "Approfondissement de la théorie de l'inflation cosmique proposée par Alan Guth, ses implications pour la structure de l'univers et comment elle résout certains problèmes du modèle standard du Big Bang."
              },
              {
                title: "Formation des Particules Élémentaires",
                description: "Après l'inflation, l'univers était rempli d'un plasma de quarks et de gluons. À mesure que l'univers se refroidissait, ces particules se sont combinées pour former des protons et des neutrons. Environ trois minutes après le Big Bang, la nucléosynthèse primordiale a commencé, formant les premiers noyaux légers comme l'hydrogène, l'hélium et le lithium."
              }
            ],
            exercises: [
              {
                title: "Échelles de Temps",
                description: "Créez une représentation visuelle des différentes échelles de temps dans les premiers instants de l'univers, en utilisant des analogies pour rendre ces concepts plus accessibles."
              },
              {
                title: "Simulation de l'Inflation",
                description: "Utilisez un modèle mathématique simplifié pour simuler l'expansion exponentielle pendant la période d'inflation et visualisez ses effets."
              }
            ]
          },
          {
            id: "universe-birth-3",
            title: "De l'Obscurité à la Lumière",
            description: "L'âge sombre de l'univers et la formation des premières structures",
            duration: "2h45",
            progress: 0,
            content: [
              {
                title: "L'Âge Sombre et la Réionisation",
                description: "Environ 380 000 ans après le Big Bang, l'univers s'est suffisamment refroidi pour permettre aux électrons de se combiner avec les noyaux, formant les premiers atomes neutres. Cette période, connue sous le nom de recombinaison, a permis à la lumière de voyager librement, créant le rayonnement cosmique de fond que nous observons aujourd'hui. S'en est suivi l'âge sombre, avant que les premières étoiles ne commencent à se former."
              },
              {
                title: "Le Rayonnement Cosmique de Fond",
                description: "Étude détaillée du CMB (Cosmic Microwave Background), sa découverte accidentelle par Penzias et Wilson, et comment son analyse nous renseigne sur les conditions de l'univers primitif."
              },
              {
                title: "Les Premières Étoiles",
                description: "Formation des étoiles de population III, leurs caractéristiques uniques et leur rôle dans l'enrichissement chimique de l'univers primitif."
              }
            ],
            exercises: [
              {
                title: "Analyse du CMB",
                description: "Interprétez des données simplifiées du rayonnement cosmique de fond pour en extraire des informations sur la composition et la géométrie de l'univers primitif."
              },
              {
                title: "Visualisation des Échelles",
                description: "Essayez de visualiser les différentes échelles de temps et d'espace impliquées dans l'évolution cosmique. Comment pouvons-nous conceptualiser des périodes aussi courtes que les premières fractions de seconde après le Big Bang, ou des distances aussi vastes que celles entre les galaxies?"
              }
            ]
          },
          {
            id: "universe-birth-4",
            title: "Formation des Structures Cosmiques",
            description: "Comment les galaxies et les structures à grande échelle se sont formées",
            duration: "3h15",
            progress: 0,
            content: [
              {
                title: "Formation des Galaxies",
                description: "Les fluctuations quantiques pendant l'inflation ont créé de légères variations de densité dans l'univers primitif. Ces variations se sont amplifiées par gravité, conduisant à la formation des premières étoiles et galaxies environ 100 à 200 millions d'années après le Big Bang. Les galaxies se sont ensuite regroupées en amas et superamas, formant la structure à grande échelle de l'univers que nous observons aujourd'hui."
              },
              {
                title: "Matière Noire et Structure",
                description: "Rôle de la matière noire dans la formation et l'évolution des galaxies, preuves de son existence et théories sur sa nature."
              },
              {
                title: "La Toile Cosmique",
                description: "Structure à grande échelle de l'univers, formant un réseau complexe de filaments, de vides et d'amas de galaxies, et comment les simulations numériques nous aident à comprendre sa formation."
              }
            ],
            exercises: [
              {
                title: "Ligne du Temps Cosmique",
                description: "Créez une ligne du temps illustrant les principales étapes de l'évolution de l'univers, du Big Bang à la formation des galaxies. Identifiez les événements clés et leur chronologie relative."
              },
              {
                title: "Modélisation Galactique",
                description: "Utilisez un logiciel de simulation simplifié pour explorer comment les paramètres initiaux influencent la formation et l'évolution des galaxies."
              }
            ]
          },
          {
            id: "universe-birth-5",
            title: "Physique Quantique et Cosmologie",
            description: "L'intersection entre la physique des particules et notre compréhension de l'univers",
            duration: "3h30",
            progress: 0,
            content: [
              {
                title: "Principes de Physique Quantique",
                description: "Introduction aux concepts fondamentaux de la physique quantique pertinents pour la cosmologie: superposition, intrication, principe d'incertitude et dualité onde-particule."
              },
              {
                title: "Particules Fondamentales",
                description: "Le Modèle Standard de la physique des particules, les particules élémentaires et leurs interactions, et comment elles ont émergé dans l'univers primitif."
              },
              {
                title: "Vers une Théorie du Tout",
                description: "Exploration des tentatives d'unification des forces fondamentales, y compris la théorie des cordes, la gravité quantique à boucles et leurs implications pour notre compréhension de l'univers."
              }
            ],
            exercises: [
              {
                title: "Réflexion sur l'Expansion",
                description: "Réfléchissez aux implications de l'expansion continue de l'univers. Quelles sont les théories actuelles sur le destin ultime de l'univers? Comment les concepts d'énergie noire et de matière noire influencent-ils notre compréhension?"
              },
              {
                title: "Paradoxes Quantiques",
                description: "Analysez comment certains paradoxes de la physique quantique (comme le chat de Schrödinger ou l'expérience de la double fente) nous aident à comprendre la nature fondamentale de la réalité."
              }
            ]
          },
          {
            id: "universe-birth-6",
            title: "Synthèse et Perspectives Futures",
            description: "Intégration des connaissances et frontières actuelles de la cosmologie",
            duration: "3h",
            progress: 0,
            content: [
              {
                title: "Synthèse des Connaissances Cosmologiques",
                description: "Récapitulation des concepts clés abordés dans le module, établissant les liens entre les différentes échelles de l'univers, du quantique au cosmologique."
              },
              {
                title: "Frontières de la Recherche Actuelle",
                description: "Exploration des questions non résolues en cosmologie moderne: nature de l'énergie noire, existence potentielle du multivers, et autres hypothèses à la frontière de la science."
              },
              {
                title: "Implications Philosophiques",
                description: "Discussion sur les implications philosophiques de notre compréhension de l'univers, y compris les questions d'origine, de finalité et de place de l'humanité dans le cosmos."
              }
            ],
            exercises: [
              {
                title: "Projet de Synthèse",
                description: "Créez une présentation ou un essai qui intègre les concepts clés du module en expliquant comment ils s'articulent pour former une vision cohérente de l'univers."
              },
              {
                title: "Débat Éthique et Philosophique",
                description: "Organisez une discussion sur les implications éthiques et philosophiques des découvertes cosmologiques modernes et leur impact sur notre vision du monde."
              }
            ]
          }
        ]
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