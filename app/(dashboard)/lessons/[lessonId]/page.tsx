import { Metadata } from 'next'
import { PageProps, GenerateMetadataProps } from '@/types/next-types'

type LessonContent = {
  id: string
  title: string
  description: string
  videoUrl?: string
  resources: Array<{
    id: string
    title: string
    type: 'pdf' | 'video' | 'article'
    url: string
  }>
}

export async function generateMetadata({ 
  params 
}: GenerateMetadataProps): Promise<Metadata> {
  return {
    title: `Leçon ${params.lessonId} - Communication Non-Violente`,
    description: 'Apprenez à communiquer de manière empathique et constructive'
  }
}

export default async function LessonView({ 
  params 
}: PageProps) {
  // Simuler une récupération asynchrone des données
  const lesson: LessonContent = await Promise.resolve({
    id: params.lessonId,
    title: 'Communication Non-Violente',
    description: 'Apprenez à communiquer de manière empathique et constructive',
    videoUrl: 'https://exemple.com/video-cnv',
    resources: [
      {
        id: '1',
        title: 'Guide de Communication Non-Violente',
        type: 'pdf',
        url: '/resources/cnv-guide.pdf'
      },
      {
        id: '2',
        title: 'Vidéo Explicative',
        type: 'video',
        url: 'https://exemple.com/cnv-video'
      }
    ]
  })

  return (
    <div className="lesson-container">
      <header className="lesson-header">
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
      </header>

      {lesson.videoUrl && (
        <section className="lesson-video">
          <video controls>
            <source src={lesson.videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </section>
      )}

      <section className="lesson-resources">
        <h2>Ressources</h2>
        <ul>
          {lesson.resources.map((resource) => (
            <li key={resource.id}>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                {resource.title} ({resource.type})
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
